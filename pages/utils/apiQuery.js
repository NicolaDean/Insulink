
import React from 'react';
import * as testingJson from "./testingJsons"

const debug = true;

export const imgUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
const ingredientSearch = "";
const apiKey = "apiKey=916e4c93a5854139b950d4708c25bd80";
const apiRoot = "https://api.spoonacular.com/";
const apiIngr = "food/ingredients/";


/**
 * eg : https://api.spoonacular.com/food/ingredients/{id}/information
 * retrive details of ingredient with id
 * @param {*} id id of the ingredients
 * @returns details of ingredients
 */
export const getIngredientDetails = (id)=>{

    if(debug) return testingJson.foodDetails;

    let query = apiRoot + apiIngr + id +"/information?" +apiKey +"&amount=100&unit=grams";;
    console.log("QUERY: " + query);
    return getJson(query);
}

/**
 * eg : https://api.spoonacular.com/food/ingredients/search
 * get all ingredients with similar name of userInput
 * @param {*} userInput user query atribute
 * @returns a list of ingredients
 */
export const getIngredentList = (userInput) =>{

    if(debug){
        return testingJson.ingredientList;
    }

    let query = apiRoot + apiIngr + "search?query=" + userInput + "&number=4&" + apiKey
    console.log("QUERY: " + query);
    return getJson(query);
}

/**
 * given a nutrientsJson map each nutritions name to its contents/values
 * @param {*} nutrientsJson 
 * @returns a dictionary of nutrients
 */
export const extractNutrients = (nutrientsJson) =>{

    let nutrients = {};

    nutrientsJson.forEach( nut =>{
        nutrients[nut.name] = nut; //Map each nutrient name to its content
    });

    return nutrients;
}

export const extractProperties = (propertiesJson) =>{
    let properties = {};

    propertiesJson.forEach( p =>{
        properties[p.name] = p; //Map each properties name to its content
    })

    return properties;
}
/**
 * Do a fetch operation on the query given in input and return the json response from API
 * @param {*} query API QUERY
 * @returns 
 */
const getJson = async (query) =>{
    
    //Prepare request
    const response = fetch(query);
    //WAITING response from API
    const json = await(await response).json();

    if(json.code = 402){
        console.log(json)
        console.log("FINISHED DAILY API CALL");
    } 
    else console.log(json);
    //Return
    return json;
}