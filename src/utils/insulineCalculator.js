
/*Params
var actualGlycemia;
var targetGlycemia;
var carbo;
var proteins;
var fats;
var CHORatio;
var insulineSensitivity;
var limit=180;
var totalInsulineDaily;
var weight
var basal  //backgound insuline daily
*/

export class InsulineCalculator {
    actualGlycemia;
    targetGlycemia=120;
    CHORatio;
    insulineSensitivity;
    limit = 180;
    totalInsulineDaily;
    weight;
    basal; //backgound insuline daily TODO


    constructor(CHORatio,insulineSensitivity,weight) {
        this.weight=weight;

        if(insulineSensitivity==null || insulineSensitivity==0){
            this.totalInsulineDaily = 0.55 * weight; //base formula to predict
            this.insulineSensitivity = 1800 / this.totalInsulineDaily; //the total insuline sensitivity from weight
        }else {
                this.insulineSensitivity=insulineSensitivity;
        } 
        if(CHORatio==null || CHORatio==0){
            this.totalInsulineDaily = 0.55 * weight; //base formula to predict
            this.CHORatio = 500 / this.totalInsulineDaily; //CHO Ratio from weight
        }else{
            if(CHORatio<1){
                this.CHORatio =1;
            }else{
                this.CHORatio=CHORatio;
            }
            
        }
    }

    

    calc(userInfo) {
        //Set all user parameters or load from file info
    };
    
    mealDose(carbo){
        return Math.floor(carbo / Math.floor(this.CHORatio));
    };

    totalDose(actualGlycemia, carbo) {
       
        var mealInsulineDose = Math.floor(carbo / Math.floor(this.CHORatio));
        var correctionInsulineDose = 0;
        if (actualGlycemia >= this.limit) {
            correctionInsulineDose = (actualGlycemia - this.targetGlycemia) / this.insulineSensitivity;
        }
        var totalInsulineDose= mealInsulineDose + correctionInsulineDose;
        //If the dose is enough close to its floor value, it returns just that value while if it's in the middle both floor and roof
        if(Math.floor(totalInsulineDose)==Math.floor(totalInsulineDose+0.5)){
            return new String(Math.floor(totalInsulineDose))
        }else {return new String(Math.floor(totalInsulineDose) +'-'+Math.floor(totalInsulineDose+0.5))}
    };

    //Standard prediction funcions (Preferred if inserted from user)

    basal(){
        this.basal = this.totalInsulineDaily / 2;
    };

   
    
   
} 

export default InsulineCalculator;