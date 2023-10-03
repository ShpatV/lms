import client from "../../src/config/database";

test("Database connection", async () => {
  try {
    await client.connect();
    expect(client._connected).toBeTruthy();
  } catch (error) {
    throw new Error("Failed to connect to the database" + error.message);
  }
});
