// Here we mainly store those url's of the bad api we use to get the data
// for parsing and forwarding to our warehouse frontend. Easier to update
// links if needed if they are kept here :)

const endPoints = {
    products: "https://bad-api-assignment.reaktor.com/v2/products/:category",
    manufacturers: "https://bad-api-assignment.reaktor.com/v2/availability/:manufacturer",
}

module.exports = endPoints;
