
import firestore from '@react-native-firebase/firestore'
import { firebase } from "@react-native-firebase/firestore";
//TABLES

const userTable = "Users";
const glicemyTable = "Glicemy";

const users = firestore().collection(userTable);
//USER QUERY:-------------------------------------------------------------------

/**
 * get the user actual data using email as id
 * @param {*} email email to query
 * @returns user data
 */
export const getUserData = async (email) =>{
    const user = (await users.doc(email).get()).data();

   // console.log("GLIC: " + JSON.stringify(glicemy))
    return user;
}

export const registerUser = async (id,userData) =>{
    await (users.doc(id).set(userData));
}

export const udpateUser = async (userData) =>{
    //TODO UPDATE USER DATA
}
//------------------------------------------------------------------------------------
//GLICEMY QUERY:----------------------------------------------------------------------

const zeroPad = (num, places) => String(num).padStart(places, '0');

/**
 * Get the glicemy data of a specific user
 * @param {*} email email that identify user
 * @returns an array containing the glicemy data
 */
export const getUserGlicemy = async (userId,date=new Date()) =>{

    let glicemy_records = {};
    date = glicemyDateFormatter(date);
    glicemy_records[date] = [];
    //const today = "27-02-2022";
    const res = (await (users.doc(userId).collection(glicemyTable).doc(date).get())).data();
    
    if(res == undefined) return [];

    res.data.forEach(g => {
        glicemy_records[date].push(changeGlicemyTimeFormat(g));
    });

    console.log("->>>>" + JSON.stringify(glicemy_records));

    return glicemy_records;
}

/**
 * Add a new value of glicemy to user with userId
 * @param {*} userId identifier of user
 * @param {*} glicemyData data to add
 */
export const addGlicemyValue = async (userId,glicemyData) =>{

    const id = glicemyDateFormatter();
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

export const glicemyDateFormatter = (date = new Date()) =>
{
    const today = date;
    let id = zeroPad(today.getDate(),2) +"-"+ zeroPad(today.getMonth(),2) +"-"+ today.getFullYear();

    return id;
}

export const getTodayGlicemy = (glicemy) =>
{
    const today = glicemyDateFormatter();

    if(glicemy==null) return null;
    return glicemy[today];
}

export const getTodayLastGlicemy =(glicemy) =>
{
    if(glicemy==null) {return null};
    const today = glicemyDateFormatter();

   const todayGlycemia= glicemy[today];
   
   if(todayGlycemia!=undefined){
      const len=Object.keys(todayGlycemia).length;
      return todayGlycemia[len-1].value;
   }
   else return 120;
}


export const changeGlicemyTimeFormat = (glicemy,realdate=false) => 
{
    let time = {};
    if(realdate)
    {
         time = glicemy.time;
    }
    else{
        time = new Date(glicemy.time.seconds*1000);
    }
    

    let date = zeroPad(time.getDate(),2) +"/"+ zeroPad(time.getMonth(),2);
    let hours = zeroPad(time.getHours(),2) +":"+ zeroPad(time.getMinutes(),2);

    glicemy.time = {date:date,hours:hours};
    return glicemy;
}

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
        date = glicemyDateFormatter(date);
        glicemy_records[date] = [];
        //const today = "27-02-2022";
        const res = (await (users.doc(userId).collection(glicemyTable).doc(date).get())).data();
        
        if(res == undefined) return [];

        res.data.forEach(g => {
            glicemy_records[date].push(changeGlicemyTimeFormat(g));
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

        const id = glicemyDateFormatter();
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
        let id = zeroPad(today.getDate(),2) +"-"+ zeroPad(today.getMonth(),2) +"-"+ today.getFullYear();

        return id;
    }

    getTodayGlicemy = (glicemy) =>
    {
        const today = glicemyDateFormatter();

        if(glicemy==null) return null;
        return glicemy[today];
    }

    getTodayLastGlicemy =(glicemy) =>
    {
        if(glicemy==null) {return null};
        const today = glicemyDateFormatter();

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
        

        let date = zeroPad(time.getDate(),2) +"/"+ zeroPad(time.getMonth(),2);
        let hours = zeroPad(time.getHours(),2) +":"+ zeroPad(time.getMinutes(),2);

        glicemy.time = {date:date,hours:hours};
        return glicemy;
    }
}

export const FirebaseQuery = new firebaseQuery(); 