const fs = require("fs");

/*
  Creates log-file for the backend. logs can be give a level:
   - 0 normal logging
   - 1 requests
   - 2 debug logging
   - 3 performance logging
*/

class Logger {

    static logLevels = ['normal', 'request', 'debug', 'performance'];
    static logStream = fs.createWriteStream('./logs/backend.log', { flags: 'a' });

    static log(content, level = 0) {
        let timestamp = new Date().toISOString();
        let label = 'unknown';
        if (level < this.logLevels.length) {
            label = this.logLevels[level];
        }
        this.logStream.write(timestamp + " [" + label.toUpperCase() + "] " + content + "\n");
    }
}

module.exports = Logger;

