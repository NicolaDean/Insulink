
const mockDispatch = jest.fn((action) => console.log(action));
//const removeFood= jest.spyOn(actions,'removeFood');

export const reduxMock = {
    useDispatch: () => mockDispatch,
    connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
      mapStateToProps,
      mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
      reactComponent,
      mockDispatch
    }),
    Provider: ({children}) => children,
    dispatch : mockDispatch,
    getMock: () => mockDispatch
  }

  export const baaa = {
    ciao:"aa",
    aa:"ciao"
  }
  //jest.mock('victory-native',()=> mockVictory);
//jest.mock('victory-native');
//MOCK USE HOOK
//useEffect
/*jest.spyOn(React,'useEffect').mockImplementation((f)=>{
    console.log("USE EFFECT");
    f();
    console.log("END USE EFFECT");
});*/

//useState
//const setStateMock = jest.fn((a)=>{console.log("SET something ")});
//const useStateMock = (useState) => [useState,setStateMock];
//jest.spyOn(React,'useState').mockImplementation((useState)=>[useState,setStateMock]);

const setStateMock = jest.fn((a)=>{console.log("SET: "+a)});
//jest.spyOn(React,'useState').mockImplementation(useState =>[useState,setStateMock]);
