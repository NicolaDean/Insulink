

export class InsulineCalculator {
    actualGlycemia;
    targetGlycemia;
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
    //Dose calculator
    mealDose(carbo){
        return (carbo / Math.floor(this.CHORatio));
    };

    correctionDose(actualGlycemia, targetGlycemia, insulineSensitivity) {
        return (actualGlycemia - targetGlycemia) / insulineSensitivity;
    };

    totalDose(actualGlycemia, carbo, CHORatio, targetGlycemia, insulineSensitivity) {
        var mealDose = mealDose(actualGlycemia, carbo, CHORatio);
        var correctionDose = 0;
        if (actualGlycemia >= limit) {
            correctionDose = correctionDose(actualGlycemia, targetGlycemia, insulineSensitivity);
        }
        return mealDose + correctionDose;
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