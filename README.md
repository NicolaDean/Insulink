# DIMA-insuline-calculator

//MARCO
--. Controlla che ti calcoli bene quanta insulina fare
--. X not closing popup
//ipad
--. Heatmap-Grafico glicemia piccola

//NICO

--. tasto modify in realta fa un add in food details quando entri da mealdiary
--. Modify del cibo non carica le corrette cal e macro
--. qualcosa che non va nel cibo. non sono corretti i valori e se provi a modificarli vanno in negativo i macro e l'insulina
--. centrare nomi pagine sulla top bar
--. Google login va su telefono ma non da emulatore (Solved?)

//GLOBAL

--. Nella schermata di log in il log in con google va troppo sotto (Android) forse va rimossa la top bar di default 
--. da tlefono non fa accedere in fast login (android)
--. nella registrazione se metti email e password poi passi allo tep 2 e torni indietro si cancella tutto ma non ti fa più il controllo
--. Complete registration da mettere un bottone 
--. Redux elimination sport from mealdiary


----
FIREBASE

//TESTING:

-REDUX:
    -insert food
    -edit food
    -remove food
    -insert sport
    -remove sport
    (ANCHE IN RENDER)

-UTILS:
    -Insuline calculator -> test formulas
    -Input Checker -> test error messages
    -
-RENDER:
    -Registration -> check "next" button behaviour

//DOCUMENTATION:

    Latex o Word?
    -Screens description (foto + descrizione )
    -Navigation
    -Functionalities
    -API used
    -Architecture explanation
    -Redux States
    -Insuline calculator formulas explanation
    -Testing explanation

//SLIDE:
    -Screen & Functionalities
    -Slide summary on navigation
    -Architecture (redux etc..)
    -Slide on Insuline Calculator
    -Testing strategy
    -Future of app (ML,Datamining...)
----------------------
Emulators commands:

npx react-native start
npx react-native run-android
cd ios && pod install
npx react-native run-ios --device "Marco’s iPad"


    //LINK TO GENERATE UPC 
    //https://docs.google.com/document/d/1hZ69q8BhEgEVHbFzQnPlGNPjyJycKWBDhY1jsT13np8/mobilebasic