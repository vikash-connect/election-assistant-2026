// A simple custom Logger utility to handle logs professionally
const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  static info(message, data = null) {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, data ? data : '');
    }
  }

  static warn(message, data = null) {
    console.warn(`[WARN] ${message}`, data ? data : '');
  }

  static error(message, error = null) {
    console.error(`[ERROR] ${message}`, error ? error : '');
    // Here we would typically send the error to an external service like Sentry or Google Cloud Logging
    // For this simulation, we simulate a fetch request if needed
  }
}

export default Logger;
