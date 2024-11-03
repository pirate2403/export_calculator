export const JAPAN_EXPENSES_CONFIG = {
    PORT_DELIVERY: 60_000,
    FREIGHT: [136_000, 600_000], // [не санкционный, санкционный],
    SANCTION_CONDITIONS: {
        engineVolume: 1_900,
        engineType: [2, 3],
    },
} as const;
