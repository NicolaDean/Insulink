# DIMA-insuline-calculator

//NICO
--. Scrivere error Reducer nella doc


--.check logout redirect (eg use setInterval javascript)

//GLOBAL

--. il chart dei macro in food detail (esempio mela) si sovrappongno

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