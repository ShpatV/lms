export const GET_COURSES_FOR_STUDENT = `
    SELECT DISTINCT c.Course_Id, c.Title, c.Description
    FROM lms_schema.User_Session us
    JOIN lms_schema.Session s ON us.Session_Id = s.Session_Id
    JOIN lms_schema.Course c ON s.Course_Id = c.Course_Id
    WHERE us.User_Id = $1;
`;
