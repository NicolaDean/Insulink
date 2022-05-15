const docData = { data: "MOCK_DATA" };
const docResult = {
  // simulate firestore get doc.data() function
  data: () => docData
};
const get = jest.fn(() => Promise.resolve(docResult));
const set = jest.fn();
const doc = jest.fn(() => {
  return {
    set,
    get
  };
});

const collection = (a) =>{return "ciao"};

const oggetto = {
  doc,
  collection,
}

//https://stackoverflow.com/questions/52043886/how-do-you-mock-firebase-firestore-methods-using-jest
export const mock_firebase = ()=>{
    return {
      doc,
      collection: (a) =>{return "ciao"},
    };
}
