
import firestore from '@react-native-firebase/firestore'

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

export const registerUser = async (userData) =>{
    await (users.doc().set(userData));
}
//------------------------------------------------------------------------------------
//GLICEMY QUERY:----------------------------------------------------------------------

/**
 * Get the glicemy data of a specific user
 * @param {*} email email that identify user
 * @returns an array containing the glicemy data
 */
export const getUserGlicemy = async (email) =>{

    const glicemy_records = [];

   await (users.doc(email).collection(glicemyTable).get())
    .then((item)=>{
        item.forEach((doc) => 
        {
            //console.log(doc.id, " => ", doc.data());
            glicemy_records.push(doc.data());
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
    await(users.doc(userId).collection(glicemyTable).doc().set(glicemyData));
}
