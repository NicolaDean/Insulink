import { networkErrors, registrationErrors, steps } from "../constants/registrationSteps";


class InputChecker{

    errors = [];
    
    reset = () =>{
        this.errors = [];
    }

    apiErrorHelper = (error,errorFunc) =>{

        this.reset();
        if(error.message == "Network Error") {
            this.addError(networkErrors.APIerror);
        }
        if(error.code == 402) {
           // ...
        }

        errorFunc(this.errors);
    }

    checkRegistrationInputs = (userData,step,errorFunc = null) =>{
        this.reset();
        switch(step){
            case steps.actual_reg: 
                this.checkValidLoginInfo(userData);
                break;
            case steps.personal_info:
                this.checkValidPersonalInfo(userData);
                break;
            case steps.phisical_info: 
                this.checkValidPhisicalInfo(userData);
                break;
            case steps.diet_info: 
                //Necessary?
                break;
            case steps.complete: 
                break;
            default: return null;
        }

        //NO ERROR
        if(this.errors.length == 0) {
            errorFunc(this.errors);
            return true;
        }

        //ERROR
        if(errorFunc==null){
            return this.errors;
        }
        else{
            errorFunc(this.errors);
            return false;
        }
        
    }
    
    returnError = (errorFunc = null) =>{
        //TODO
    }

    checkApiErrors = () =>{

    }

    checkValidLoginInfo = (userData) =>{

        if(userData.email == ""){
            this.addError(registrationErrors.noEmailInserted);
        }

        if(userData.password == ""){
            this.addError(registrationErrors.noPassword);
        }

        if(userData.password.length <=6){
            this.addError(registrationErrors.weakPassword);
        }
    }

    checkValidPersonalInfo = (userData) =>{
        if(userData.name == ""){
            this.addError(registrationErrors.noNameInserted);
        }
        if(userData.surname == ""){
            this.addError(registrationErrors.noSurnameInserted);
        }
        if(userData.gender == ""){
            this.addError(registrationErrors.noGenderInserted);
        }
        if(userData.birthday == ""){
            this.addError(registrationErrors.noBirthdayInserted);
        }
    }

    checkValidPhisicalInfo = (userData) =>{
        if(userData.weight <= 30){
            this.addError(registrationErrors.invalidWeight);
        }

        if(userData.height <= 100 || userData.height >=2500){
            this.addError(registrationErrors.invalidHeight);
        }
    }

    addError = (error) =>{
        this.errors.push(error);
    }
    /*addError = (fieldName,error) =>{
        this.errors.push({
            title:fieldName,
            error:error
        })
    }*/
}

export const inputChecker = new InputChecker();