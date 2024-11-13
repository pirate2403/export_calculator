import {Collapse, Flex, Typography} from "antd";
import {rootStore} from "../../store/root-store";

const STYLES = {
    title: {fontWeight: "bold"},
    totalPrice: {fontWeight: "bold", fontSize: "18px", color: "green"},
};

export function Card() {
    const customsDuty = rootStore.state.customsDuty;
    const customsFee = rootStore.state.customsFee;
    const recyclingFee = rootStore.state.recyclingFee;
    const price = rootStore.state.price;
    const companyCommission = rootStore.state.companyCommission;
    const japanExpanses = rootStore.state.japanExpanses;
    const brokerExpenses = rootStore.state.brokerExpenses;
    const vat = rootStore.state.vat;
    const exciseDuty = rootStore.state.exciseDuty;
    const isCalculatorInit = rootStore.state.isCalculatorInit;

    const convertToRub = (value: number) => {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
        }).format(value);
    };


    const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0);

    if (!isCalculatorInit) return null;

    return (
        <Collapse
            expandIcon={() => null}
            items={[
                {
                    key: "1",
                    label: (
                        <Flex gap={10} align="center" justify="space-between">
                            <Typography.Text style={STYLES.title}>Итоговая цена:</Typography.Text>
                            <Typography.Text style={STYLES.totalPrice}>
                                {convertToRub(sum(
                                    price,
                                    companyCommission,
                                    customsDuty,
                                    customsFee,
                                    recyclingFee,
                                    brokerExpenses,
                                    japanExpanses,
                                    exciseDuty,
                                    vat,
                                ))}
                            </Typography.Text>
                        </Flex>
                    ),
                    children: (
                        <>
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    Расходы по Японии:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(japanExpanses)}</Typography.Text>
                            </Flex>
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>Пошлина: </Typography.Text>
                                <Typography.Text>{convertToRub(customsDuty)}</Typography.Text>
                            </Flex>
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    Таможенный сбор:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(customsFee)}</Typography.Text>
                            </Flex>
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    Утилизационный сбор:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(recyclingFee)}</Typography.Text>
                            </Flex>
                            {vat ? <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    НДС:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(vat)}</Typography.Text>
                            </Flex> : null}
                            {exciseDuty ? <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    Акциз:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(exciseDuty)}</Typography.Text>
                            </Flex> : null}
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    Услуги брокера:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(brokerExpenses)}</Typography.Text>
                            </Flex>
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>Цена авто + растаможка: </Typography.Text>
                                <Typography.Text>{convertToRub(price)}</Typography.Text>
                            </Flex>
                            <Flex gap={10} align="center" justify="space-between">
                                <Typography.Text style={STYLES.title}>
                                    Комиссия компании:
                                </Typography.Text>
                                <Typography.Text>{convertToRub(companyCommission)}</Typography.Text>
                            </Flex>
                        </>
                    ),
                }
            ]}/>
    );
}
