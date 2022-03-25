
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
    carbo;
    proteins;
    fats;
    CHORatio;
    insulineSensitivity;
    limit = 180;
    totalInsulineDaily;
    weight;
    basal; //backgound insuline daily TODO

    constructor(CHORatio,insulineSensitivity) {
        if(insulineSensitivity==null || insulineSensitivity==0){
            totalInsulineDaily();
            correctionFactorCalculate();
        }else {
                    this.insulineSensitivity=insulineSensitivity;

        }

        if(CHORatio==null || CHORatio==0){
            totalInsulineDaily()
            CHORatioCalculate()
        }else{
            this.CHORatio=CHORatio;
        }

    }

    

    calc(userInfo) {
        //Set all user parameters or load from file info
    };
    
    pippo () {
        console.log("banana");
        return "Ciao";
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
    totalInsulineDaily() {
        this.totalInsulineDaily = 0, 55 * this.weight;
    };

    basal(){
        this.basal = this.totalInsulineDaily / 2;
    };

    CHORatioCalculate() {
        this.CHORatio = 500 / this.totalInsulineDaily;
    };

    correctionFactorCalculate() {
        this.insulineSensitivity = 1800 / this.totalInsulineDaily;
    };
    
   
} 

export default InsulineCalculator;