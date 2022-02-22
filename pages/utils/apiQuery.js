
import React from 'react';

export const imgUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
const ingredientSearch = "";
const apiKey = "apiKey=916e4c93a5854139b950d4708c25bd80";
const apiRoot = "https://api.spoonacular.com/";
const apiIngr = "food/ingredients/";
//TODO move Debug flag here!!!


//eg : https://api.spoonacular.com/food/ingredients/{id}/information
export const getIngredientDetails = (id)=>{
    let query = apiRoot + apiIngr + id +"/information?" +apiKey +"&amount=100&unit=grams";;
    console.log("QUERY: " + query);
    return getJson(query);
}

//eg : https://api.spoonacular.com/food/ingredients/search
export const getIngredentList = (userInput) =>{
    let query = apiRoot + apiIngr + "search?query=" + userInput + "&number=4&" + apiKey
    console.log("QUERY: " + query);
    return getJson(query);
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

    if(json.code = 402) console.log("FINISHED DAILY API CALL");
    else console.log(json);
    //Return
    return json;
}