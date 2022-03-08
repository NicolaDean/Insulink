
import React from 'react';
import * as testingJson from "./testingJsons"
import axios from 'axios';

const debug = true;

export const imgUrl = "https://spoonacular.com/cdn/ingredients_100x100/";
const ingredientSearch = "";
const apiKey = "apiKey=916e4c93a5854139b950d4708c25bd80";
const apiRoot = "https://api.spoonacular.com/";
const apiIngr = "food/ingredients/";


const edamAppId = "21f2be32";
const edamAppKey = "d0e8b5d4eecb5c925ab79b75c85d0583";

/**
 * eg : https://api.spoonacular.com/food/ingredients/{id}/information
 * retrive details of ingredient with id
 * @param {*} id id of the ingredients
 * @returns details of ingredients
 */
export const getIngredientDetails = (id,amount,unit = "grams")=>{

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
 * eg: https://api.spoonacular.com/food/search?query=apple&number=2
 * 
 * @param {*} userInput 
 * @returns list of all foods/recipes/articles/menu item related to query
 */
export const getAllRelatedFood = (userInput) =>{

    if(debug){
        return testingJson.allFoodList;
    }
    
    let query = apiRoot + "food/search?query=" + userInput + "&number=4&" + apiKey;
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
        //console.log(json)
        //console.log("FINISHED DAILY API CALL");
    } 
    //else console.log(json);
    //Return
    return json;
}

//OTHER API TEST: NUTRITIONIX

const nutrixAppId = 'e29d5b1a';
const nutrixAppKey = '4bfbc69b7095239b9768d1f7b3f47e56';

export const getFoodListAlternative =async (userInput) =>{

    const response = await
     axios.get('https://trackapi.nutritionix.com/v2/search/instant',{
        headers:{
            'x-app-id':nutrixAppId,
            'x-app-key':nutrixAppKey
        },
        params: {
          query: userInput
        },
        responseType: 'json'
      })
      .then( (response) => {
        return (response.data);
      })
      .catch( (error)=> {
        console.log("Some Errors, 400");
        console.log(JSON.stringify(error));
      });


      return response;
}

export const getIngredientDetailsAlternative = async  (userInput) =>{
    console.log("QUERY : " + userInput);

    /*const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients',
    {
        method:'post',
            headers:{
                'x-app-id':nutrixAppId,
                'x-app-key':nutrixAppKey,
                'x-remote-user-id': 0
            },
            params:{
                query: "apple"
            }
    });*/
    
    //curl -X POST "https://trackapi.nutritionix.com/v2/natural/nutrients" -H "accept: application/json" -H "x-app-id: e29d5b1a" -H "x-app-key: 4bfbc69b7095239b9768d1f7b3f47e56" -H "x-remote-user-id: 0" -H "Content-Type: application/json" -d "{ \"query\": \"shrimp tempura\", \"num_servings\": 1}"
    // Used instead of Fetch
    const response = await axios({
            url:'https://trackapi.nutritionix.com/v2/natural/nutrients',
            method:'post',
            headers:{
                'x-app-id':nutrixAppId,
                'x-app-key':nutrixAppKey,
                'x-remote-user-id': 0
            },
            data:{
                query:userInput,
                num_servings:1
            },
            responseType: 'json'
        }).then( (response) => {
        return (response.data);
      })
      .catch( (error)=> {
        console.log("Some Errors, 400");
        console.log(JSON.stringify(error));
      });


      return response;
}