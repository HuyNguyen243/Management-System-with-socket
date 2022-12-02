export const formatVND = (str) => {
    return str ? str?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ" : 0 + "đ";
};
export const formatUSD = (num) => {
    if (num) {
        return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " $";
    }
};
