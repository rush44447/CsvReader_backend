import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug'];

  log(message: string, context?: string) {
    this.printLog('log', message, context);
  }

  error(message: string, trace: string, context?: string) {
    this.printLog('error', message, context, trace);
  }

  warn(message: string, context?: string) {
    this.printLog('warn', message, context);
  }

  debug(message: string, context?: string) {
    this.printLog('debug', message, context);
  }

  private printLog(level: LogLevel, message: string, context?: string, trace?: string) {
    const timestamp = new Date().toISOString();
    context = context ? `[${context}]` : '';
    const logMessage = `${timestamp} ${level}${context} - ${message}`;

    if (trace) {
      console[level](logMessage, '\n', trace);
    } else {
      console[level](logMessage);
    }
  }
}
