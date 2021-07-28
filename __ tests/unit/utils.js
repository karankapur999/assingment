 function makeMockGetDbWithFindOneThatReturns(returnValue) {
    const findOne = jest.fn(() => Promise.resolve(returnValue));
    return jest.fn(() => ({
      get: () => ({ findOne })
    }));
  }

  module.exports = {
    makeMockGetDbWithFindOneThatReturns
  }