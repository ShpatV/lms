export const createUserQuery = `
  INSERT INTO lms_schema.Users (Username, Email, Password, Role_Id)
  VALUES ($1, $2, $3, $4)
  RETURNING User_Id, Username, Email, Role_Id
`;

export const findByUsernameQuery = `
  SELECT * FROM lms_schema.Users WHERE Username = $1
`;
