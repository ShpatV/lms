import client from "../config/database.js";
import * as customQueries from "../utils/queries/browsecourse.query.js";

export default class BrowseCourseRepository {
    async getCoursesForStudent(studentId) {
        try {
            const result = await client.query(customQueries.GET_COURSES_FOR_STUDENT, [studentId]);
            return result.rows;
        } catch (error) {
            console.error(error.message);
            throw new Error("Error getting courses for student.");
        }
    }
}