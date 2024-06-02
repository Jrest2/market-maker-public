import * as winston from 'winston';
import 'winston-daily-rotate-file';
export declare const loggerConfig: {
    transports: (winston.transports.ConsoleTransportInstance | import("winston-daily-rotate-file"))[];
};
