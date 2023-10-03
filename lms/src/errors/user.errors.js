
class UserNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UserNotFoundError';
      this.statusCode = 404; // Not Found
    }
  }
  
  class UsernameAlreadyExistsError extends Error {
    constructor(message) {
      super(message);
      this.name = 'UsernameAlreadyExistsError';
      this.statusCode = 409; // Conflict
    }
  }
  
  class InvalidPasswordError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidPasswordError';
      this.statusCode = 401; // Unauthorized
    }
  }
  
  class InvalidUsernameError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidUsernameError';
      this.statusCode = 400; // Bad Request
    }
  }



  export {
    UserNotFoundError,
    UsernameAlreadyExistsError,
    InvalidPasswordError,
    InvalidUsernameError
  };