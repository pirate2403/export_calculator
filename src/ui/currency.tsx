import { Flex, Typography } from "antd";
import { useEffect } from "react";
import { rootStore } from "../store/root-store";

const STYLES = {
  title: { fontWeight: "bold" },
};

export function Currency() {
  const currencyRates = rootStore.state.currencyRates;

  useEffect(() => {
    rootStore.fetchCurrencyRates();
  }, []);

  const convert = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Flex gap={4} style={{ color: "white" }}>
      <Flex gap={4} align="center">
        <Typography.Text style={STYLES.title}>EUR: </Typography.Text>
        <Typography.Text>{convert(1 / currencyRates.EUR)}</Typography.Text>
      </Flex>

      <Flex gap={4} align="center">
        <Typography.Text style={STYLES.title}>USD: </Typography.Text>
        <Typography.Text>{convert(1 / currencyRates.USD)}</Typography.Text>
      </Flex>

      <Flex gap={4} align="center">
        <Typography.Text style={STYLES.title}>JPY: </Typography.Text>
        <Typography.Text>{convert(1 / currencyRates.JPY)}</Typography.Text>
      </Flex>

      <Flex gap={4} align="center">
        <Typography.Text style={STYLES.title}>KRW: </Typography.Text>
        <Typography.Text>{convert(1 / currencyRates.KRW)}</Typography.Text>
      </Flex>
    </Flex>
  );
}
