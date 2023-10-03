import { jest } from "@jest/globals";

const mockQuery = jest.fn();

const mockClient = {
  query: mockQuery,
  connect: jest.fn(),
};

module.exports = {
  mockClient,
  mockQuery,
};
