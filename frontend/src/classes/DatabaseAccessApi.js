import { DatabaseConfig } from "../config/DatabaseConfig";
import { Pages } from "../config/Pages";

export default class DatabaseAccessApi {

    static async getProducts(category) {
        if (Pages.includes(category)) {
            // We first check that there wasn't any errornous request
            try {
                const response = await fetch(DatabaseConfig.productsUrl.replace(":category", category.toLowerCase()));
                const responseJson = await response.json();
                return responseJson;
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    }
}

