
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