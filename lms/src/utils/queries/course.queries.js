export const getAllCoursesQuery = `SELECT * from lms_schema.Course`;

export const getCourseWithSessionsQuery = `
    SELECT
        c.Course_Id,
        c.Title,
        c.Description,
        array_agg(s.Name) AS Sessions
    FROM
        lms_schema.Course c
    JOIN
        lms_schema.Session s ON c.Course_Id = s.Course_Id
    WHERE
        c.Course_Id = $1
    GROUP BY
        c.Course_Id`;

export const getCourseByIdQuery = `
        SELECT
            c.Course_Id,
            c.Title,
            c.Description,
            s.Name AS Session_Name
        FROM
            lms_schema.Course c
        LEFT JOIN
            lms_schema.Session s ON c.Course_Id = s.Course_Id
        WHERE
            c.Course_Id = $1;
    `;

export const createCourseQuery = `
    INSERT INTO 
        lms_schema.course(Title, Description)
    VALUES ($1, $2) RETURNING *`;

export const courseExistsQuery = `
    SELECT EXISTS (SELECT 1 FROM lms_schema.Course WHERE Course_Id = $1) AS course_exists;
`;
export const updateCourseQuery = `
    UPDATE lms_schema.course
    SET Title = $1, Description = $2
    WHERE Course_Id = $3
    RETURNING *;
`;

export const deleteCourseByIdQuery = `
    DELETE FROM lms_schema.course
    WHERE Course_Id = $1`;
