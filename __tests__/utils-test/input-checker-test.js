import { registrationErrors, steps } from "../../src/constants/registrationSteps";
import { inputChecker } from "../../src/utils/inputChecker";


//const mockedError   = jest.spyOn(inputChecker,'addError');
const mockedError = jest.fn((e)=>{console.log(e)});

const initialUserData = {
  email:"",
  password:"",
  name:"",
  surname:"",
  gender:"male",
  weight:60,
  height:170,
  birthday:{seconds:0,nanoseconds:0},
  isf:0,
  choratio:0,
  maxCarb:200,
  maxFat:100,
  maxProt:40,
}

/**
 * Test the component that control inputs from our user during registration
 */
describe('Check if input checker throw errors correctly',()=>{

  /**
   * Check if the checker throw errors on empty email/psw
   */
  test('Check Actual Registration', () => {

    const user = {...initialUserData};
    inputChecker.checkRegistrationInputs(user,steps.actual_reg,mockedError);
    expect(mockedError).toBeCalledWith([registrationErrors.noEmailInserted,
                                        registrationErrors.noPassword,
                                        registrationErrors.weakPassword]);
    user.email = "m@a.it";
    user.password = "12345678";
    mockedError.mockClear();
    inputChecker.checkRegistrationInputs(user,steps.actual_reg,mockedError);

    expect(mockedError.mock.calls.length).toBe(1);
    //expect(mockedError.mock.calls[0]).toBe([]);
  });

  /**
   * Check if checker throw errors on empty name,surname
   */
  test('Check Personal Info', () => {

    const user = {...initialUserData};
    inputChecker.checkRegistrationInputs(user,steps.personal_info,mockedError);
    expect(mockedError).toBeCalledWith([registrationErrors.noNameInserted,
                                        registrationErrors.noSurnameInserted,
                                      ]);

    mockedError.mockClear();
    inputChecker.checkRegistrationInputs(user,steps.personal_info,mockedError);
    expect(mockedError.mock.calls.length).toBe(1);

  });

  /**
   * Check if physical information are feasible
   */
  test('check Valid physical info',()=>{
    const user = {...initialUserData};
    user.weight = 22;
    user.height = 11;
    inputChecker.checkRegistrationInputs(user,steps.phisical_info,mockedError);
    expect(mockedError).toBeCalledWith([registrationErrors.invalidWeight,
                                        registrationErrors.invalidHeight
                                      ]);

    mockedError.mockClear();
    user.weight = 80;
    user.height = 70;
    inputChecker.checkRegistrationInputs(user,steps.phisical_info,mockedError);
    expect(mockedError.mock.calls.length).toBe(1);
  });


  
})
