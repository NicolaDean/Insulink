import React from 'react';
import {Text, View } from 'react-native';

const Line =({structure,data}) =>{
    
    const line_name = name_offset + structure.line;
    console.log("->" + line_name);

    return (
        <View>
            <Text>{structure.line}: {data[line_name]}</Text>
            {
               structure.subline.map(subline =>{
                    return <SubLine data={data} structure={subline}></SubLine>
               })

            }
        </View>
    );
}

const SubLine = ({structure,data}) => {

    const line_name = name_offset + structure;
    return(
        <View>
            <Text>-------{structure}:{data[line_name]}</Text>
        </View>
    );
}

const tableStructure =  
    [
        
        {line:"total_fat",subline:["saturated_fat","trans_fat","polyunsaturated","monounsaturated"]},
        {line:"cholesterol",subline:[]},
        {line:"sodium",subline:[]},
        {line:"potassium",subline:[]},
        {line:"total_carbohydrate",subline:["dietary_fiber","sugars"]},
        {line:"protein",subline:[]},
    ]

const name_offset = "nf_";

export const MacroTable = ({data}) =>{

    return (
        <View>
            {
                tableStructure.map(line => {
                    
                    return (<Line structure={line} data={data}></Line>);
                })
            }

        </View>
    );

}
export default MacroTable;