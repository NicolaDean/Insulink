
const fir = ()=>{
  return {
    doc:null,
    collection: (a) =>{return "ciao"},
  };
}
module.exports = {
    useDispatch: () => mockDispatch,
    connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
      mapStateToProps,
      mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
      reactComponent,
      mockDispatch
    }),
    Provider: ({children}) => children
  };