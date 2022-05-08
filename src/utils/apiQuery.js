import * as testingJson from "./testingJsons"
import axios from 'axios';
import { networkErrors } from "../constants/registrationSteps";
import { inputChecker } from "./inputChecker";

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

rootUrl = 'https://trackapi.nutritionix.com/v2';
nutrixAppId = 'e29d5b1a';
nutrixAppKey = '4bfbc69b7095239b9768d1f7b3f47e56';

methods = {
    get:"GET",
    post:"POST"
}

headers = {
    'x-app-id':nutrixAppId,
    'x-app-key':nutrixAppKey,
    'x-remote-user-id': 0
}

class Api{
    
    errorFunc = (error) => { console.log("NETWORK ERROR: " + JSON.stringify(error))};

    constructor(){}

    setErrorFunc = (func) =>{
        this.errorFunc = func;
    }
    
    /**
     * 
     * @param {*} userInput 
     * @param {*} userData 
     * @returns 
     */
    getSportCalories = async (userInput,userData) =>{

        //TODO ADD AGE AND GENDER TO PERSONAL DATA
        const param = {
            "query":userInput,
            "gender":"male",
            "weight_kg":userData.weight,
            "height_cm":userData.height,
            "age":30
           }
    
           return await this.doRequest(methods.post,'/natural/exercise',param);
    
    }

    /**
     * allow to search for foods on the API database, both common and branded foods
     * @param {*} userInput food to search
     * @returns a list of foods
     */
    getFoodListAlternative = async (userInput) =>{

        const param = {
            query: userInput
        }

        return await this.doRequest(methods.get,'/search/instant',param);
    }

    //LINK TO GENERATE UPC 
    //https://docs.google.com/document/d/1hZ69q8BhEgEVHbFzQnPlGNPjyJycKWBDhY1jsT13np8/mobilebasic
    getFoodListBarCode = async (userInput) =>{
     //console.log('upc  '+ typeof userInput+userInput)
        const param = {
            upc: 851045005013
        }

        return await this.doRequest(methods.get,'/search/item',param);
    }    

    /**
     * Allow to retrive details of specific foods
     * @param {*} userInput id/name of food
     * @returns details of food
     */
    getIngredientDetailsAlternative = async  (userInput) =>{
    
        const param = {
            query:userInput,
            num_servings:1
        }

        return await this.doRequest(methods.post,'/natural/nutrients',param);
    }
    /**
     * General purpose function to do API request with axios 
     * @param {*} method method to use (POST,GET)
     * @param {*} query relative path to the API request
     * @param {*} param parameters of request (eg query,foodAmount...)
     * @returns JSON with API response
     */
    doRequest = async(method,query,param) =>{
        console.log("QUERY : " + query + JSON.stringify(param));
        this.errorFunc("");
        const response = await axios({
                url:rootUrl + query,
                method:method,
                headers:headers,//TODO put data into params for GET and in data for POST
                params:(method == methods.get)? param : undefined, 
                data:(method == methods.post)? param : undefined,
                responseType: 'json'
                }).then( (response) => {
            return (response.data);
          })
          .catch( (error)=> {
    
            //this.errorFunc(networkErrors.APIerror);
            console.log(error);
            inputChecker.apiErrorHelper(error,this.errorFunc);

            console.log("BANANA" + JSON.stringify(error));
            //console.log(JSON.stringify(error));
            /*if(error.status == 401) {
                console.log("ENDED STUDENT LIMITS!!!!!!!!!!!!!!!!!!!!");
            }*/
            return (testingJson.foodDetails);
          });
    
          return response;
    }

}

export const Food_API = new Api();