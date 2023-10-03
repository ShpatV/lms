export const GET_ALL_MATERIALS =
  "SELECT * FROM lms_schema.Material WHERE Course_Id = $1";
export const GET_MATERIAL_BY_ID =
  "SELECT * FROM lms_schema.Material WHERE Material_Id = $1";
export const CREATE_MATERIAL =
  "INSERT INTO lms_schema.Material (Course_Id, Title, Content, Date_Posted) VALUES ($1, $2, $3, $4) RETURNING *";
export const UPDATE_MATERIAL =
  "UPDATE lms_schema.Material SET Course_Id = $1, Title = $2, Content = $3, Date_Posted = $4 WHERE Material_Id = $5 RETURNING *";
export const DELETE_MATERIAL =
  "DELETE FROM lms_schema.Material WHERE Material_Id = $1 RETURNING *";
export const MATERIAL_EXISTS =
  "SELECT EXISTS(SELECT 1 FROM lms_schema.Material WHERE Material_Id = $1)";

export const UPDATE_COMPLETION_STATUS =
  "UPDATE lms_schema.User_Material SET Is_Completed = $1 WHERE Material_Id = $2 AND User_Id = $3 RETURNING *";
export const GET_USER_MATERIAL_BY_MATERIAL_ID =
  "SELECT * FROM lms_schema.User_Material WHERE Material_Id = $1";
