import InsulineCalculator from "../../src/utils/insulineCalculator";

test('Test totalDose', () => {
    const ic = new InsulineCalculator(50,1,80);

    const res = ic.totalDose(44,230);
    expect(res).toMatchSnapshot();
});