import { Config } from 'jest';
import path from 'path';

const config: Config = {
   rootDir: path.resolve(__dirname, '../../'),
   testRegex: '.*\\.spec\\.ts$',
   transform: {
      '^.+\\.ts$': 'ts-jest',
   },
   verbose: true,
   preset: 'ts-jest',
   testEnvironment: 'node',
   moduleNameMapper: {
      '@services/(.*)': '<rootDir>/src/services/$1',
   },
   collectCoverage: true,
   coverageDirectory: 'coverage',
   collectCoverageFrom: [
      '**/src/**/(modules|services)/**/*.(ts|js)',
      '!**/src/**/*.module.ts',
      '!**/node_modules/**',
      '!**/src/main.ts',
      '!**/src/common/**',
      '!**/src/config/**',
   ],
   moduleFileExtensions: ['ts', 'js'],
   reporters: [
      'default',
      [
         'jest-html-reporters',
         {
            publicPath: './html-report',
            filename: 'report.html',
            expand: true,
         },
      ],
   ],
   testPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
      '<rootDir>/src/main.ts',
   ],
};

export default config;
