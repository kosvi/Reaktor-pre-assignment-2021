const BadApiConfig = require("../config/BadApiConfig");
const Logger = require("./Logger");
const fetch = require("node-fetch");
const { performance } = require("perf_hooks");


/*
  This class returns an array of all products. 
  The array contains information of availability, 
  so it is parsed together from both apis given in assignment.
*/


class BadApiParser {

    // we start with an empty array
    constructor() {
        this.products = Array();
    }

    // user is supposed to call this method!
    // parameter takes an array of categories we wanna GET from the bad api
    async getProducts(categories) {
        // start timing this function 
        const start = performance.now();
        // let's first fetch all products and put them in this.products as separate arrays
        for (let i = 0; i < categories.length; i++) {
            try {
                const newProducts = await this._badApiProducts(categories[i]);
                if (newProducts != null) {
                    this.products[categories[i]] = newProducts;
                }
            } catch (error) {
                Logger.log("getProducts() -> this._badApiProducts() failed:", 2);
                Logger.log(error, 2);
            }
        }
        // now let's get all manufacturers too:
        var manufacturers = [];
        for (let i = 0; i < categories.length; i++) {
            let t0 = performance.now();
            manufacturers = this._findUniqueManufacturers(this.products[categories[i]]);
            let t1 = performance.now();
            Logger.log("Calculated manufacturers for " + categories[i] + " in " + (t1 - t0) + " milliseconds.", 3);
        }
        // now there might (and probably will) be duplicates in manufacturers, but we can take care of that 
        var availability;
        try {
            availability = await this._badApiManufacturers(manufacturers);
        } catch (error) {
            Logger.log("getProducts() -> this._badApiManufacturers() failed: ", 2);
            Logger.log(error, 2);
            availability = [];
        }
        // now let's add availability info for every single product we have (if we have it's availability-info)
        for (let i = 0; i < categories.length; i++) {
            let t0 = performance.now();
            var category = categories[i];
            for (let j = 0; j < this.products[category].length; j++) {
                let currentProduct = this.products[category][j];
                var availabilityStatus = "";
                if (availability[currentProduct.manufacturer].hasOwnProperty("id" + currentProduct.id)) {
                    availabilityStatus = availability[currentProduct.manufacturer]["id" + currentProduct.id];
                } else {
                    Logger.log("Product: " + currentProduct.id + " - NO AVAILABILITY INFORMATION FOUND", 2);
                }
                currentProduct.availability = availabilityStatus;
            }
            let t1 = performance.now();
            Logger.log("Added availability status for " + categories[i] + " in " + (t1 - t0) + " milliseconds.", 3);
        }
        // stop timing this function
        const stop = performance.now();
        Logger.log("Fetch products from bad api in " + (stop - start) + " milliseconds", 3);
        return this.products;
    }

    // fetch products from bad api
    async _badApiProducts(category) {
        try {
            const response = await fetch(BadApiConfig.products.replace(":category", category));
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            Logger.log("_badApiProducts() failure: ", 2);
            Logger.log(error, 3);
            return null;
        }
    }

    // get all manufacturers from the product array
    _findUniqueManufacturers(products) {
        const manufacturers = Array();
        for (let i = 0; i < products.length; i++) {
            if (!manufacturers.includes(products[i].manufacturer)) {
                manufacturers.push(products[i].manufacturer);
            }
        }
        return manufacturers;
    }

    // this method will return availabilityinfo in a two-dimensional array
    /*
       First index is the manufacturer
       Second index is the product id and the value is products availability status
    */
    async _badApiManufacturers(manufacturers) {
        const availability = [];
        for (let i = 0; i < manufacturers.length; i++) {
            if (!availability.includes(manufacturers[i])) {
                // this manufacturer hasn't been fetched yet
                var responseJson = [];
                do {
                    let t0 = performance.now();
                    try {
                        const response = await fetch(BadApiConfig.manufacturers.replace(":manufacturer", manufacturers[i]));
                        responseJson = await response.json();
                    } catch (error) {
                        Logger.log("_badApiManufacturers() failure: ", 2);
                        Logger.log(error, 2);
                        break;
                    }
                    let t1 = performance.now();
                    Logger.log("Fetch availability info of " + manufacturers[i] + " in " + (t1 - t0) + " milliseconds. ", 3);
                    // sometimes the response is empty, let's just try fetch again in that case
                } while (responseJson.response.length <= 2);
                const productAvailabilityInfo = [];
                for (let j = 0; j < responseJson.response.length; j++) {
                    // let's add to array
                    // I've hardcoded the availability categories, sorry... :(
                    // this is simply for performance...
                    var currentProduct = responseJson.response[j];
                    var currentProductAvailability = currentProduct.DATAPAYLOAD;
                    if (currentProductAvailability.includes("INSTOCK")) {
                        productAvailabilityInfo["id" + currentProduct.id.toLowerCase()] = "INSTOCK";
                    } else if (currentProductAvailability.includes("OUTOFSTOCK")) {
                        productAvailabilityInfo["id" + currentProduct.id.toLowerCase()] = "OUTOFSTOCK";
                    } else if (currentProductAvailability.includes("LESSTHAN10")) {
                        productAvailabilityInfo["id" + currentProduct.id.toLowerCase()] = "LESSTHAN10";
                    } else {
                        productAvailabilityInfo["id" + currentProduct.id.toLowerCase()] = "UNKNOWN";
                        Logger.log("Could not find availability data for product id: " + currentProduct.id.toLowerCase());
                    }
                }
                availability[manufacturers[i]] = productAvailabilityInfo;
            }
        }
        return availability;
    }
}

module.exports = BadApiParser;
