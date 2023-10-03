import dotenv from "dotenv";
dotenv.config();

test("Environment variables are loaded correctly", () => {
  expect(process.env.DB_HOST).toBeDefined();
  expect(process.env.DB_PORT).toBeDefined();
  expect(process.env.DB_USER).toBeDefined();
  expect(process.env.DB_PASSWORD).toBeDefined();
  expect(process.env.DB_DATABASE).toBeDefined();
});
