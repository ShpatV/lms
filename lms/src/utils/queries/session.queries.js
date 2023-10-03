export const getAllSessionsQuery = `SELECT * FROM lms_schema.Session`;

export const getSessionByStudentId = `select s.session_id as id, s."name" , s.start_date , s.end_date , s.is_published , s.course_id  from lms_schema.user_session us join lms_schema."session" s on us.session_id =s.session_id 
where us.user_id =$1`;

export const getSessionByIdQuery = `
SELECT
    s.Session_Id,
    s.Name AS Session_Name,
    s.Start_Date,
    s.End_Date,
    s.Is_Published,
    c.Course_Id,
    c.Title AS Course_Title,
    c.Description AS Course_Description
    
FROM lms_schema.Session s
INNER JOIN lms_schema.Course c ON s.Course_Id = c.Course_Id
WHERE s.Session_Id = $1
`;

export const deleteSessionByIdQuery = `DELETE FROM lms_schema.Session WHERE Session_Id = $1 RETURNING *`;

export const createSessionQuery = `
INSERT INTO lms_schema.Session (Name, Start_Date, End_Date, Is_Published, Course_Id)
VALUES ($1, $2, $3, $4, $5)
`;

export const updateSessionQuery = `
UPDATE lms_schema.Session
  SET
    Name = $1,
    Start_Date = $2,
    End_Date = $3,
    Is_Published = $4,
    Course_Id = $5
  WHERE Session_Id = $6
`;
