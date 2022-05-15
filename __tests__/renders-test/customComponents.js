import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { buttonIcons, buttonIconsNames } from '../../src/assets/buttonIcons';
import { Calendar } from '../../src/customComponents/calendarPicker';
import { InputBlock } from '../../src/customComponents/containers/inputsBlock';
import { InputContainer } from '../../src/customComponents/containers/inputsContainer';
import { MarginContainer } from '../../src/customComponents/containers/marginContainer';
import { WaitLoading } from '../../src/customComponents/containers/waitLoading';
import CustomButton from '../../src/customComponents/customButton'
import  { CustomImageButton } from '../../src/customComponents/customImageButton'

const fir = ()=>{
    return {
      doc:null,
      collection: (a) =>{return "ciao"},
    };
}


jest.mock("@react-native-firebase/firestore", () => fir);
jest.mock('react-native-calendar-picker', () => 'CalendarPicker');

/**
 * Ensure that all custom components (eg. custom buttons,calendar,style containers) remain equal among code edits
 */
describe("Render All Custom Components: ", () => {

  beforeEach(() => {
    //Executed before each test
  });
  
  test('Render Calendar', () => {

    const tree = renderer.create(<Calendar openC={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Render Custom Button', () => {

    const tree = renderer.create(
    <CustomButton title ="bottone" 
                  onPress = {()=>{console.log("test")}}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Render Custom Image Button', () => {
    const tree = renderer.create(
          <CustomImageButton image={buttonIconsNames.plus} 
                             style={{}} 
                             iconStyle={{width:50,height:50}} 
                             onPress = {()=>{console.log("test")}}/>
          ).toJSON();
    expect(tree).toMatchSnapshot();
  });
})


describe("Render All Custom Container: ", () => {

  beforeEach(() => {
    //Executed before each test
  });

  test('Render InputsBlock', () => {

    const tree = renderer.create(
    <InputBlock>
        <CustomButton title ="bottone" onPress = {()=>{console.log("test")}}/>
    </InputBlock>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Render InputsContainer', () => {

    const tree = renderer.create(
    <InputContainer>
        <InputBlock>
            <CustomButton title ="first" onPress = {()=>{console.log("test")}}/>
        </InputBlock>
        <InputBlock>
          <CustomButton title ="second" onPress = {()=>{console.log("test")}}/>
       </InputBlock>
    </InputContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('Render MarginContainer', () => {

    const tree = renderer.create(

      <MarginContainer>
          <CustomButton title ="second" onPress = {()=>{console.log("test")}}/>
      </MarginContainer>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Render WaitLoading', () => {

    let [loading,setLoading] = [false,()=>{}];
    const tree = renderer.create(

      <WaitLoading loadingState={[loading,setLoading]}>
          <CustomButton title ="Button Appeared, No Loading" onPress = {()=>{console.log("test")}}/>
      </WaitLoading>
    ).toJSON();
    expect(tree).toMatchSnapshot();

    [loading,setLoading] = [true,()=>{}];

    const tree2 = renderer.create(

      <WaitLoading loadingState={[loading,setLoading]}>
          <CustomButton title ="Should not appear" onPress = {()=>{console.log("test")}}/>
      </WaitLoading>
    ).toJSON();
    expect(tree2).toMatchSnapshot();
  });
  

});