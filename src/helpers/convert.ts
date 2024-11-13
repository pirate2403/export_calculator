export const convert = (price: number, rate: number) => {
    return toFixed(price / rate);
};

function toFixed(value: number): number {
    return parseFloat(value.toFixed(2));
}
