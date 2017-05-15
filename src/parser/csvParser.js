var CsvParser = function(){};
var materialCsvParser = require('./materialCsvParser');
var proveCsvParser = require('./proveCsvParser');
var parse = require('csv-parse');
var fs = require('fs');
var cloudant = require('cloudant');
var hat=require('hat');
//Parte del db:
var dbCredentials = {
    dbName: 'indilium'
};
var db;

// funzione per leggere le credenziali di accesso del db
function getDBCredentialsUrl(jsonData) {
    var vcapServices = JSON.parse(jsonData);
    // Pattern match to find the first instance of a Cloudant service in
    // VCAP_SERVICES. If you know your service key, you can access the
    // service credentials directly by using the vcapServices object.
    for (var vcapService in vcapServices) {
        if (vcapService.match(/cloudant/i)) {
            return vcapServices[vcapService][0].credentials.url;
        }
    }
}

function initDBConnection() {
    //When running on Bluemix, this variable will be set to a json object
    //containing all the service credentials of all the bound services
    if (process.env.VCAP_SERVICES) {
        dbCredentials.url = getDBCredentialsUrl(process.env.VCAP_SERVICES);
    } else { //When running locally, the VCAP_SERVICES will not be set
        // When running this app locally you can get your Cloudant credentials
        // from Bluemix (VCAP_SERVICES in "cf env" output or the Environment
        // Variables section for an app in the Bluemix console dashboard).
        // Once you have the credentials, paste them into a file called vcap-local.json.
        // Alternately you could point to a local database here instead of a
        // Bluemix service.
        // url will be in this format: https://username:password@xxxxxxxxx-bluemix.cloudant.com
        dbCredentials.url = getDBCredentialsUrl(fs.readFileSync("vcap-local.json", "utf-8"));
    }

    cloudant = require('cloudant')(dbCredentials.url);

    // check if DB exists if not create
    /*cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });*/

    db = cloudant.use(dbCredentials.dbName);
}
initDBConnection();

// Per salvare un documento
var saveDocument = function(arrToSave,res) {
    var id = hat();
    db.insert({ListOfToSave:arrToSave}, id, function(err, doc) {
        if (err) {
            res.json("KO|"+err+": "+doc);
        }else{
            res.json("OK|"+id);
        }   
    });
}

CsvParser.prototype.parse = function(proveCsvPath,materialCsvPath,res){
    var arr_csvReaded=[], arr_jsonProveToStore=[], arr_jsonMaterialToStore=[];
    fs.readFile(proveCsvPath, 'utf-8',function(err,data){
        if (!err){
            parse(data, {delimiter: ';'}, 
                function(err, output){
                    if(output[0][0]=='Material'){
                        arr_jsonProveToStore=proveCsvParser.parse(output);
                    }
                    fs.readFile(materialCsvPath, 'utf-8',function(err,data){
                        if (!err){
                            parse(data, {delimiter: ','}, 
                                function(err, output){
                                    arr_jsonMaterialToStore=materialCsvParser.parse(output);
                                    arr_jsonProveToStore.forEach(function(proveToStore, iProve){
                                        arr_jsonProveToStore[iProve].List=arr_jsonMaterialToStore[proveToStore.IdMaterial];
                                        
                                    });
                                    saveDocument(arr_jsonProveToStore,res);
                                });
                        }
                    });
            });
        }
    });
    
    //return true;
};

// export the class 
module.exports = new CsvParser();




//var mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/hackatondb');
//
//// definition of the model
//var prove = mongoose.model('prove',
//  {
//          IdMaterial:Number,
//          Usura_mat_mm:Number,
//          Usura_mat_g:Number,
//          Usura_disco_g:Number,
//          Raggio:Number,
//          Durezza:Number,
//          List: [{
//              Materia_prima: Number,
//              Quantità: Number,
//              Gruppo: Number
//          }]
//  }
//);