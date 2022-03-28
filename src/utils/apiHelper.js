
class Helper{

    constructor(){}

    enrichDatails = (details) =>{
        //RETRIVE DIFFERENT SERVING UNITS AND BUILD DROPDOWN DATA STRUCTURE
        const tmp = [];
        const dictionary = {};
        details.alt_measures.forEach(measure=>{
            tmp.push({label:measure.measure,value:measure.measure});
            dictionary[measure.measure] = measure; 
        });   

        //FIX SOME VALUES IN MORE EASY WAY
        details.image = details.photo.highres;
        details.units = tmp;
        details.units_dic = dictionary;
        details.name = details.food_name;
        
        //CURRENT MACRO NUTRIENTS (needed for the custom amount)
        details.current_carb    = details.nf_total_carbohydrate;
        details.current_fat     = details.nf_total_fat;
        details.current_prot    = details.nf_protein;
        details.current_cal     = details.nf_calories;

        //BUILD CHART DATA STRUCT
        details.chartData = [
            {x:"Carb"  ,y:details.nf_total_carbohydrate },
            {x:"Fat"   ,y:details.nf_total_fat},
            {x:"Prot"  ,y:details.nf_protein }];
        
        //console.log("Graph Data: " + JSON.stringify(details.alt_measudetails));
        //console.log("Current Unit: " + JSON.stringify(id.serving_unit));
        //console.log("Unit: " + JSON.stringify(dictionary[id.serving_unit]));
        //console.log("grams: " + JSON.stringify(details.serving_weight_grams));

        return details;
    }
    /**
     * Allow To convert details of a food in others measure unit or quantity
     * @param {*} details 
     */
    makeProportion = (details,item,qty) => {

        const measure = details.units_dic[item];
        console.log(JSON.stringify(measure));

        const proportion = {...details};

        const ratio = (measure.serving_weight*qty)/details.serving_weight_grams;

        proportion.current_carb    = (ratio*proportion.nf_total_carbohydrate).toFixed(2);
        proportion.current_fat     = (ratio*proportion.nf_total_fat).toFixed(2);
        proportion.current_prot    = (ratio*proportion.nf_protein).toFixed(2);
        proportion.current_cal     = (ratio*proportion.nf_calories).toFixed(2);

        proportion.chartData = [
            {x:"Carb"  ,y:proportion.current_carb },
            {x:"Fat"   ,y:proportion.current_fat},
            {x:"Prot"  ,y:proportion.current_prot }];

        return proportion;
    };

    
}

export const ApiHelper = new Helper();