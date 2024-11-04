export const convert = (value: number) => {
    const result = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 1,
    }).format(value);
    return parseFloat(result.replace(/,/, '.'));
};