

import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, printf } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create a Winston logger instance for errors
export const errorLogger = createLogger({
    format: combine(
        timestamp(), // Add timestamp to log entries
        colorize(), // Apply color to log levels
        logFormat
    ),
    transports: [
        new transports.File({ filename: 'errors.log', level: 'error' }) // Log errors to errors.log
    ],
});

// Create a Winston logger instance for info
export const infoLogger = createLogger({
    format: combine(

        timestamp(), // Add timestamp to log entries
        colorize(), // Apply color to log levels
        logFormat
    ),
    transports: [
        new transports.File({ filename: 'info.log', level: 'info' }) // Log errors to errors.log
    ],
});

// Create a Winston logger instance for warning
export const warnLogger = createLogger({
    format: combine(

        timestamp(), // Add timestamp to log entries
        colorize(), // Apply color to log levels
        logFormat
    ),
    transports: [
        new transports.File({ filename: 'warn.log', level: 'warn' }) // Log errors to errors.log
    ],
});



