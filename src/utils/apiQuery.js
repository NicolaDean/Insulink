import * as testingJson from "./testingJsons"
import axios from 'axios';
import { networkErrors } from "../constants/registrationSteps";
import { inputChecker } from "./inputChecker";

const debug = true;

//OTHER API TEST: NUTRITIONIX

rootUrl = 'https://trackapi.nutritionix.com/v2';
nutrixAppId = 'e29d5b1a';
nutrixAppKey = '4bfbc69b7095239b9768d1f7b3f47e56';

export const methods = {
    get:"GET",
    post:"POST"
}

export const headers = {
    'x-app-id':nutrixAppId,
    'x-app-key':nutrixAppKey,
    'x-remote-user-id': 0
}

export const apiPath ={
    sport       :"/natural/exercise",
    food        :"/search/instant",
    foodDetails :"/natural/nutrients",
    barcode     :"/search/item"
}

export const api_axios = axios;

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
            upc: userInput
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
        this.errorFunc(""); //RESET ERRORS
        const response = await axios({
                url:rootUrl + query,
                method:method,
                headers:headers,//TODO put data into params for GET and in data for POST
                params:(method == methods.get)? param : undefined, 
                data:(method == methods.post)? param : undefined,
                responseType: 'json'
                }).then( (response) => {
                    if(response == undefined) return null;//FOR TESTING
                    return (response.data);
          })
          .catch( (error)=> {
    
            //this.errorFunc(networkErrors.APIerror);
            console.log(error);
            inputChecker.apiErrorHelper(error,this.errorFunc);
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