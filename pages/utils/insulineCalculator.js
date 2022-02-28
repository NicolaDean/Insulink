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
    basal; //backgound insuline daily

    constructor() {
        //TODO
    }

    calc(userInfo) {
        //Set all user parameters or load from file info
    };
    
    pippo () {
        console.log("banana");
        return "Ciao";
    };
    //Dose calculator
    mealDose(actualGlycemia, carbo, CHORatio) {
        return carbo / Math.floor(CHORatio);
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
        totalInsulineDaily = 0, 55 * weight;
    };

    basal(){
        basal = totalInsulineDaily / 2;
    };

    CHORatioCalculate() {
        CHORatio = 500 / totalInsulineDaily;
    };

    correctionFactorCalculate() {
        insulineSensitivity = 1800 / totalInsulineDaily;
    };
    
   
} 

export default InsulineCalculator;