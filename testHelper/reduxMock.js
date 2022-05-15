
// https://stackoverflow.com/questions/59018071/mock-usedispatch-in-jest-and-test-the-params-with-using-that-dispatch-action-in

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch
}));