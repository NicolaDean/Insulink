
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
export const getUserGlicemy = async (email) =>{

    const glicemy_records = {};

   await (users.doc(email).collection(glicemyTable).get())
    .then((item)=>{
        item.forEach((doc) => 
        {
            let day = doc.data().data;

            let id = doc.id;
            console.log("ID: " + id);
            glicemy_records[id] = [];

            day.forEach(glicemy_item =>{
                let time = new Date(glicemy_item.time.seconds*1000);

                let date = zeroPad(time.getDate(),2) +"/"+ zeroPad(time.getMonth(),2);
                let hours = zeroPad(time.getHours(),2) +":"+ zeroPad(time.getMinutes(),2);

                glicemy_item.time = {date:date,hours:hours};

                glicemy_records[id].push(glicemy_item);
                
            });
            
        })
    });

    
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

export const glicemyDateFormatter = () =>
{

    const today = new Date();
    let id = zeroPad(today.getDate(),2) +"-"+ zeroPad(today.getMonth(),2) +"-"+ today.getFullYear();

    return id;
}
