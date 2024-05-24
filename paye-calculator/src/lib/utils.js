import currencyConfig from "../lib/currencyConfig.json";

const getCurrency = (country) => {
    const currencyConfig = require("./currencyConfig.json");
    const currencyObj = currencyConfig[country]["currency"];
    
    if (!currencyObj) {
        throw new Error(`Currency configuration for ${country} not found.`);
    }
    
    const money = currencyObj["name"];
    const moneyForm = currencyObj["shortForm"];

    return `${money} (${moneyForm})`;
};

export default getCurrency;