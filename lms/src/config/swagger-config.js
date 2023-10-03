import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Management System API",
      version: "1.0.0",
      description: "API documentation for LMS ",
    },
    servers: [
      {
        url: `http://localhost:${process.env.SERVER_PORT}`,
      },
    ],
    components: {
      schemas: {
        Course: {
          type: "object",
          properties: {
            Course_Id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
          },
        },
        CourseArray: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Course",
          },
        },
        Session: {
          type: "object",
          properties: {
            Session_Id: { type: "integer" },
            name: { type: "string" },
            start_date: { type: "string", format: "date" },
            end_date: { type: "string", format: "date" },
            is_published: { type: "boolean" },
            course_id: { type: "integer" },
          },
          required: [
            "Name",
            "Start_Date",
            "End_Date",
            "Is_Published",
            "Course_Id",
          ],
        },
        Material: {
          type: "object",
          properties: {
            Material_id: { type: "integer" },
            title: { type: "string" },
            content: { type: "string" },
            date_posted: { type: "string", format: "date" },
            course_id: { type: "integer" },
          },
        },
        User_Session: {
          type: "object",
          properties: {
            User_Session_Id: { type: "integer" },
            User_Id: { type: "integer" },
            Session_Id: { type: "integer" },
          },
        },
        MaterialProgress: {
          type: "object",
          properties: {
            user_id: { type: "integer" },
            is_completed: { type: "boolean" },
            material_id: { type: "integer" },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
