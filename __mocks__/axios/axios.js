
const mockaxios = jest.fn(async(config) =>{
    console.log("CONFIG:" + JSON.stringify(config));
    return new Promise(resolve=>resolve()); //THIS ALLOW TO FAKE THE REQUEST
});

module.exports = mockaxios;