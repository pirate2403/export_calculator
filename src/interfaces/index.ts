export interface Car {
    ownerType: number;
    carAgeGroup: number;
    engineType: number;
    enginePower: number;
    engineVolume: number;
    price: number;
    currency: "USD" | "EUR" | "JPY" | "CNY" | "KRW";
}
