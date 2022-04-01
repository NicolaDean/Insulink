
const apiMacros = 
[
    "calories",
    "total_fat",
    "saturated_fat",
    "cholesterol",
    "sodium",
    "total_carbohydrate",
    "dietary_fiber",
    "sugars",
    "protein",
    "potassium",
    "p",
    "polyunsaturated",
    "monounsaturated",
    "trans_fat",
]

const findNutrient = (nutrients,id) =>{
    let res = undefined;
    nutrients.forEach(nut => {
        if(nut.attr_id == id){
            res =  nut.value;
        } 
    })

    return res;
}

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
        
        //Some extra values
        details.nf_polyunsaturated = findNutrient(details.full_nutrients,646);
        details.nf_monounsaturated = findNutrient(details.full_nutrients,645);
        details.nf_trans_fat = findNutrient(details.full_nutrients,605);

        //CURRENT MACRO NUTRIENTS (needed for the custom amount)

        apiMacros.forEach(macro =>{
            details["current_" + macro] = details["nf_" + macro];
            console.log(macro + ": " + details["nf_" + macro]);
        });


        //BUILD CHART DATA STRUCT
        details.chartData = [
            {x:"Carb"  ,y:details.current_total_carbohydrate },
            {x:"Fat"   ,y:details.current_total_fat},
            {x:"Prot"  ,y:details.current_protein}];
        
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

        console.log("proportion:" + JSON.stringify(proportion));
        const ratio = (measure.serving_weight*qty)/details.serving_weight_grams;

        apiMacros.forEach(macro =>{
            proportion["current_" + macro] = parseFloat((ratio*details["nf_" + macro]).toFixed(2));
        });

        proportion.chartData = [
            {x:"Carb"  ,y:proportion.current_total_carbohydrate },
            {x:"Fat"   ,y:proportion.current_total_fat},
            {x:"Prot"  ,y:proportion.current_protein}];

        console.log("BBB" + JSON.stringify(proportion));
        return proportion;
    };

    
}

export const ApiHelper = new Helper();