# DIMA-insuline-calculator

//MARCO
--. maxCarb,Prot,.. deve essere un valore scelto dall'utente
--. CHO ratio e insuline sensitivity come parametri dei costruttori di tutti gli insuline calculator
--. Logo
--. Fix IPAD dimensions (eg 4 columns in foodSearch)
--. Controlla che ti calcoli bene quanta insulina fare
--. Aggiusta meglio la logica per fare il grafico della glicemia (gli orari)

//ipad
--. Heatmap-Grafico glicemia piccola

//NICO

--. tasto modify in realta fa un add in food details quando entri da mealdiary
--. qualcosa che non va nel cibo. non sono corretti i valori e se provi a modificarli vanno in negativo i macro e l'insulina
--. centrare nomi pagine sulla top bar
--. click su rotellinsa sopra --> PersonalDetail
--. aggiornare in modo corretto l'rario quando aggiungi una nuova glicemia
--. Google login va su telefono ma non da emulatore
--. calendar fix su disable buttons  

//GLOBAL

--. Nella schermata di log in il log in con google va troppo sotto (Android) forse va rimossa la top bar di default 
--. da tlefono non fa accedere in fast login (android)
--. nella registrazione se metti email e password poi passi allo tep 2 e torni indietro si cancella tutto ma non ti fa più il controllo
--. Birthday da mettere come date picker non string
--. Complete registration da mettere un bottone 
--. Redux elimination sport from mealdiary

----------------------
Emulators commands:

npx react-native start
npx react-native run-android
npx react-native run-ios --device "Marco’s iPad"