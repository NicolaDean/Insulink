# DIMA-insuline-calculator

//MARCO
--. Controlla che ti calcoli bene quanta insulina fare
--. 
//ipad
--. Heatmap-Grafico glicemia piccola

//NICO
--. centrare nomi pagine sulla top bar
--. Google login va su telefono ma non da emulatore (Solved?)
--. Popup Errori Login
--. Errore registrazione
--. editUserData -> to be completed (manca localstorage e firebase!!!)
--. check macroReducer -> resetDiary.... dosnt work

//GLOBAL
--. Quando ci si logga non sempre carica i dati vecchi da firebase/localstorage
--. Nella schermata di log in il log in con google va troppo sotto (Android) forse va rimossa la top bar di default 
--. Complete registration da mettere un bottone  e un messagio "Registration Completed!!"


----
FIREBASE

//TESTING:

    SUMMARY OF TESTING:
    -Render of Custom Components -> (mancano i grafici custom, il resto c'è)
    -Render of Custom Container -> (OK!!)
    -Render of Pages ->
        Done:Food
        Todo:FoodDetails,FoodSearch,Meal,MealDiary,Home,PersonalData,EditPersonalData,Popup,AddGlicemy,AddSport
    (Per food details si può usare "mock" di jest per evitare redux/firebase e poi testare redux e firebase a parte)

    -FirebaseQuery ->TODO
    -LocalStorage ->TODO
    -REDUX -> TODO

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