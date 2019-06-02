const Validator = require("../services/user-validator");
let user;

describe("user validator", () => {

  beforeEach(() => {
    user = {
      firstName: "John",
      lastName: "Smith",
      email: "john@smith.com",
      password: "123456"
    };
  });

  it("should detect missing user name", () => {
   
    let validator = new Validator();
    let result = validator.validateUser(user);
    expect(result).toBe(true);
  });

});
