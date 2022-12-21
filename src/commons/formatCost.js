import { CONFIG_COST } from '../constants'; 
export const formatVND = (str) => {
    return str ? str?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" : 0 + "đ";
};
export const formatUSD = (num) => {
    if (num) {
        const usd = (num / CONFIG_COST.EXCHANGE_RATE);
        return usd.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " $";
    }
};
