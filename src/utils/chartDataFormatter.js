

export const glicemyChartFormatter = (glicemyData) =>{


    let chart_data = {
        labels:[],
        datasets:
        [
            {
                data:[0,0]
            }
        ]
    }


    if(glicemyData === undefined || glicemyData===null){
        console.log("NO GLICEMY DATA");
        return chart_data;
    } 

    const d = [];
    const l = [];

    //The lenght is divided by a fixed variable that will be a counter of the index of time label to add (floor of the division)
    // and the when you reach that index it passes to the next in order to have alway a fixed number of labels

    const numberOfLabels=7;
<<<<<<< HEAD
    const numRecords =Object.keys(glicemyData).length;
    const lenght=numRecords-1;
    var len=Math.floor(numRecords/numberOfLabels);
    console.log('todays number of glycemias '+numRecords)
=======
    const lenght=Object.keys(glicemyData).length-1;
    var len=Math.floor(lenght/numberOfLabels);
    console.log('len '+len)
>>>>>>> d74dd5e5fc4a217cd4e9657dfdbf4671c5035c48

    var i=0;
    if (len>=1){
    glicemyData.forEach( elem =>{

        if(i== 0 || i==lenght || i%len == 0){
            chart_data.labels.push(elem.time.hours);
        }
        
<<<<<<< HEAD
        i++;
        d.push(elem.value);
    })

    chart_data.datasets = [{data: d}];


=======
        //chart_data.labels.push(elem.time.hours);
        d.push(elem.value);
    })
}
else
{
    glicemyData.forEach( elem =>{
        
        chart_data.labels.push(elem.time.hours);
        d.push(elem.value);
    })
}
    

    chart_data.datasets = [{data: d}];

>>>>>>> d74dd5e5fc4a217cd4e9657dfdbf4671c5035c48
    return chart_data;
}
