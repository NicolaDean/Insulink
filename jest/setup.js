import 'react-native-gesture-handler/jestSetup';
import { FirebaseQuery } from '../src/utils/firebaseQuery';
import CustomFirestoreMock from '../__mocks__/@react-native-firebase/firebase';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const mock_firebase = new CustomFirestoreMock();
FirebaseQuery.users = mock_firebase;

const firebasee = () =>{
    return {
        collection:jest.fn((a)=>{console.log("COLLECTION->"+ a);return mock_firebase}),
        doc:jest.fn((a)=>{console.log("DOC->"+ a);return mock_firebase})
    };
}

jest.mock('@react-native-firebase/firestore',()=> firebasee);
jest.mock('@react-native-async-storage/async-storage');
jest.mock('react-native-slick');
jest.useFakeTimers();//TO USE useEffects and other async requests
FirebaseQuery.glicemyDateFormatter = (d) => {return "[DATE]"}
FirebaseQuery.printFormattedDate = (a) =>{return "[FORMATTED DATE]"};