
import firestore from '@react-native-firebase/firestore'
import { firebase } from "@react-native-firebase/firestore";
//TABLES

const userTable = "Users";
const glicemyTable = "Glicemy";
const diaryTable = "FoodDiary";

const users = firestore().collection(userTable);

//USER QUERY:-------------------------------------------------------------------

class firebaseQuery{
        /**
     * get the user actual data using email as id
     * @param {*} email email to query
     * @returns user data
     */
    getUserData = async (email) =>{
        const user = (await users.doc(email).get()).data();

    // console.log("GLIC: " + JSON.stringify(glicemy))
        return user;
    }

    registerUser = async (id,userData) =>{
        await (users.doc(id).set(userData));
    }

    udpateUser = async (userData) =>{
        //TODO UPDATE USER DATA
    }
    //------------------------------------------------------------------------------------
    //GLICEMY QUERY:----------------------------------------------------------------------

    zeroPad = (num, places) => String(num).padStart(places, '0');

    /**
     * Get the glicemy data of a specific user
     * @param {*} email email that identify user
     * @returns an array containing the glicemy data
     */
    getUserGlicemy = async (userId,date=new Date()) =>{

        let glicemy_records = {};
        date = this.glicemyDateFormatter(date);
        glicemy_records[date] = [];
        //const today = "27-02-2022";
        const res = (await (users.doc(userId).collection(glicemyTable).doc(date).get())).data();
        
        if(res == undefined) return [];

        res.data.forEach(g => {
            glicemy_records[date].push(this.changeGlicemyTimeFormat(g));
        });

        console.log("->>>>" + JSON.stringify(glicemy_records));

        return glicemy_records;
    }

    /**
     * Add a new value of glicemy to user with userId
     * @param {*} userId identifier of user
     * @param {*} glicemyData data to add
     */
    addGlicemyValue = async (userId,glicemyData) =>{

        const id = this.glicemyDateFormatter();
        const new_glicemy = await users.doc(userId).collection(glicemyTable).doc(id).get();
        
        if(new_glicemy && new_glicemy.exists)
        {
            await new_glicemy.ref.update({
                data:firebase.firestore.FieldValue.arrayUnion(glicemyData)
            })
        }else{
            await new_glicemy.ref.set({data:[glicemyData]});
        }
        

    }

    glicemyDateFormatter = (date = new Date()) =>
    {
        const today = date;
        let id = this.zeroPad(today.getDate(),2) +"-"+ this.zeroPad(today.getMonth()+1,2) +"-"+ today.getFullYear();

        return id;
    }

    getTodayGlicemy = (glicemy) =>
    {
        const today = this.glicemyDateFormatter();

        if(glicemy==null) return null;
        
        return glicemy[today];
    }

    getTodayLastGlicemy =(glicemy) =>
    {
        if(glicemy==null) {return null};
        const today = this.glicemyDateFormatter();

        const todayGlycemia= glicemy[today];
        
        if(todayGlycemia!=undefined){
            const len=Object.keys(todayGlycemia).length;
            return todayGlycemia[len-1].value;
        }
        else return 120;
    }


    changeGlicemyTimeFormat = (glicemy,realdate=false) => 
    {
        let time = {};
        if(realdate)
        {
            time = glicemy.time;
        }
        else{
            time = new Date(glicemy.time.seconds*1000);
        }
        

        let date = this.zeroPad(time.getDate(),2) +"/"+ this.zeroPad(time.getMonth(),2);
        let hours = this.zeroPad(time.getHours(),2) +":"+ this.zeroPad(time.getMinutes(),2);

        //TODO ERROR OF DATE FORMAT CHECK!
        glicemy.time = {date:date,hours:hours};
        return glicemy;
    }

    saveFoodDiary = async (userId,date,diary) =>{
        console.log("TRY FIREBASE")
        console.log("USER : " + userId + "->" + date);
        const userDiary = await users.doc(userId).collection(diaryTable).doc(date).get();
        firestore().settings({ ignoreUndefinedProperties: true }); //INGORE UNDEFINED FIELD
        const data = {
            totMacro:diary.totMacro,
            meals:diary.meals,
            activities:diary.activities
        }

        //await users.doc(userId).collection(diaryTable).doc(date).set({data:diary},{merge: true});
       if(userDiary && userDiary.exists)
        {
            console.log("exist");
            try{
                await userDiary.ref.update(data);
            }catch(e){
                console.log("ERRORE : " + e);
            }
            
        }else{
            
            await userDiary.ref.set(data)//TODO VEDERE CHE SUCCEDE QUI 
            console.log("Saved on " + userId + "-> " + date);
        }
    }

    getFoodDiary = async (userId,date) =>{
        const res = (await (users.doc(userId).collection(diaryTable).doc(date).get())).data();
        
        if(res == undefined) return [];

        return res;
    }
}

export const FirebaseQuery = new firebaseQuery(); 