/*
  This class will act as a "local cache" that gets data from bad api trough
  BadApiParser and keeps the data in HUGE arrays in memory. Those arrays are
  then used by our API to return data when requested by frontend. 
*/

const Logger = require("./Logger");
const { allowedCategories } = require("../config/ApiConfig");
const BadApiParser = require("./BadApiParser");

class LocalCache {

    static products = Array();
    static timestamp = 0;

    static async updateCache() {
        this.timestamp = Date.now();
        Logger.log("Updating LocalCache", 0);
        const badApiParser = new BadApiParser();
        try {
            this.products = await badApiParser.getProducts(allowedCategories);
        } catch (error) {
            Logger.log("LocalCache.updateCache() failure: ", 2);
            Logger.log(error, 2);
        }
    }
}

module.exports = LocalCache;
