import React from 'react';
import {Text, View,StyleSheet } from 'react-native';

const name_offset = "current_";

const Line =({structure,data}) =>{
    
    const line_name = name_offset + structure.line;
    console.log("->" + line_name);

    return (
        <View style={styles.lineContainer}>
            <Text style={styles.lineName}>{structure.line}: {data[line_name]}</Text>
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
        <View style={styles.subLineContainer}>
            <Text style={styles.subLineName}>{structure}:{data[line_name]}</Text>
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



export const MacroTable = ({title,data}) =>{
    //TODO MAKE MACRO TABLE EXPANDABLE (a tendina)
    //EG: make a "DETAILS" text with a little arrow if click all table appears
    return (
        <View style={styles.tableContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {
                tableStructure.map(line => {
                    return (<Line structure={line} data={data}></Line>);
                })
            }
        </View>
    );

}
const styles = StyleSheet.create({
    tableContainer:{
        width:'90%',
        marginLeft:'5%',
        marginTop:10,
        backgroundColor:'white'
    },
    sectionTitle: {
        alignSelf:'flex-start',
        color:"black",
        fontSize: 30,
        fontWeight: '600',
    },
    lineContainer:{
        borderTopWidth:2,
        borderColor:'black',
    },
    lineName:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        marginLeft:'2%',
    },
    subLineContainer:{
        marginLeft:'15%',
        borderBottomWidth:1,
        borderColor:'black',
    },
    subLineName:{
        fontSize:15,
        fontWeight:'bold',
        color:'gray',
        marginLeft:'2%',
    }
});
export default MacroTable;