export default class CustomFirestoreMock {
  constructor () {
    // mocked methods that return the class
    this.firstCollectionCall;
    this.firstDocCall
    this.mockCollection = jest.fn(() => this)
    this.mockWhere = jest.fn(() => this)
    this.mockOrderBy = jest.fn(() => this)
    this.mockDoc = jest.fn(()=>this)

    
    // data
    this.mockData = jest.fn(()=> {console.log("DATAA");return new Promise (resolve => resolve(this._mockGetReturn))});
    // methods that return promises
    this.mockSet = jest.fn(() => Promise.resolve(this._mockAddReturn))
    //this.mockGet = jest.fn(() => {return {data:this.mockData}})

    this.mockGet = jest.fn(() => {return new Promise(r=>r({data:this.mockData}))});
    // methods that accepts callbacks
    this.mockOnSnaptshot = jest.fn((success, error) => success(this._mockOnSnaptshotSuccess))

    this.virtualDb = {
      data:this.mockData,
      ref:{
        update:jest.fn((a)=>{console.log("UPDATEE:" + a)})
      }
    }
    // return values
    this._mockAddReturn = null
    this._mockGetReturn = null
    this._mockOnSnaptshotSuccess = null
  }

  collection (c) {
    console.log("COLLE:" + c);
    return this.mockCollection(c);
  }

  doc(c){
    console.log("DOC: ",c);
    return this.mockDoc(c);
  }

  where (...args) {
    return this.mockWhere(...args)
  }

  orderBy (...args) {
    return this.mockOrderBy(...args)
  }

  set (a) {
    return this.mockSet(a)
  }

  get () {
    return this.mockGet()
  }
  
  data() {
    return this.mockData();
  }

  onSnapshot (success, error) {
    return this.mockOnSnaptshot(success, error)
  }

  mockAddReturn (val) {
    this._mockAddReturn = val
  }

  mockGetReturn (val) {
    this._mockGetReturn = val
  }

  set mockOnSnaptshotSuccess (val) {
    this._mockOnSnaptshotSuccess = val
  }

  reset () {
    // reset all the mocked returns
    this._mockAddReturn = null
    this._mockGetReturn = null
    this._mockOnSnaptshotSuccess = null

    // reset all the mocked functions
    this.mockCollection.mockClear()
    this.mockWhere.mockClear()
    this.mockOrderBy.mockClear()
    this.mockSet.mockClear()
    this.mockGet.mockClear()
    this.mockDoc.mockClear()
    this.mockData.mockClear()
  }
}

