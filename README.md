
-All'interno della directory app c'è il frontend, è fatto in angular, la pagina index.html è la principale.

-all'interno della directory bower_components sono incluse le dipendenze del frontend. In teoria sarebbe da non committare, ma bluemix non permette la gestione delle dipendenze del front-end, di conseguenza come workaround lo abbiamo dovuto committare.

-all'interno della directory src/parser ci sono i parser dei vari file csv. I file in input possono essere di due tipi, c'è un parser per tipo e la classe padre permette di storare i file parsati dal csv sul db no sql di IBM.

-server.js è l'entry point che permette di avviare il progetto.

## Build & development ... per installare
git clone https://github.com/C0nst3/hackatonServer.git
bower install
npm install
node server.js
