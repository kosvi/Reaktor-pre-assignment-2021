const express = require("express");
const app = express();

const Logger = require("./classes/Logger");
const LocalCache = require("./classes/LocalCache");

const { allowedCategories } = require("./config/ApiConfig");

Logger.log("Starting server", 0);
// This variable is later compared to see if we need to update our LocalCache
// We don't need it if we want to constantly poll bad api for dataupdates
// But since this is just an example to showcase coding skills, we don't want
// to keep polling Reaktor servers all the time, do we? ;)
var latestVisit = Date.now();
// and this sets how often we will update our cache,
// for now we update cache if data is older than 5 minutes
const updateFrequenzy = 5 * 60 * 1000;

/*
  we provide /api/products/:category as an endpoint
*/
app.get("/api/products/:category", (req, res) => {
    latestVisit = Date.now();
    if (latestVisit > (LocalCache.timestamp + updateFrequenzy)) {
        Logger.log("Old data served at: /api/products/" + req.params["category"], 0);
    }
    let failure = true;
    // Let's first check that given category is good
    if (allowedCategories.includes(req.params["category"])) {
        // ok, category is indeed valid
        let category = req.params["category"];
        // also check that our LocalCache is ready and can serve the category requested
        if (LocalCache.products.hasOwnProperty(category)) {
            failure = false;
            Logger.log("Success for: /api/products/" + req.params["category"], 1);
            res.send(LocalCache.products[category]);
        }
    }
    if (failure) {
        Logger.log("Send 404 for: /api/products/" + req.params["category"], 1);
        res.sendStatus(404);
    }
});

/*
  This is for serving static files (our React.js frontend)
*/
app.use("/static", express.static("static"));

const server = app.listen(5000, () => {
    // here is the actual server that will respond to requests
    // I decided to hardcode the port as this is goind inside a Docker container anyways. 
});

/*
  This timer handles updating our LocalCache. We don't update it unless we have a 
  user on the site as it would be pointless to update a pre-assignment constantly
  when nobody is using it. Useless stress for the Reaktor-server...
*/

// Update once on start!
LocalCache.updateCache();
var timer = setInterval(() => {
    // And here it is: only update if last update is older then latest visit + updatefrequenzy
    if (latestVisit > (LocalCache.timestamp + updateFrequenzy)) {
        LocalCache.updateCache();
    }
}, 10000);
// We check every 10 seconds if cache needs to be updated
