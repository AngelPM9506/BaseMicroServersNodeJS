module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@Controllers/(.*)$': '<rootDir>/src/Controllers/$1',
    '^@Middlewares/(.*)$': '<rootDir>/src/Middlewares/$1',
    '^@Routes/(.*)$': '<rootDir>/src/Routes/$1',
    '^@Services/(.*)$': '<rootDir>/src/Services/$1',
    '^@Server/(.*)$': '<rootDir>/src/Server/$1',
    '^@Types/(.*)$': '<rootDir>/src/Types/$1',
    '^@Utils/(.*)$': '<rootDir>/src/Utils/$1'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};