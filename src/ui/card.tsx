import { Card as AntCard, Divider, Flex, Modal, Typography } from "antd";
import { rootStore } from "../store/root-store";

const STYLES = {
  title: { fontWeight: "bold" },
  totalPrice: { fontWeight: "bold", fontSize: "18px", color: "green" },
};

export function Card() {
  const customsDuty = rootStore.state.customsDuty;
  const customsFee = rootStore.state.customsFee;
  const recyclingFee = rootStore.state.recyclingFee;
  const price = rootStore.state.price;
  const companyCommission = rootStore.state.companyCommission;
  const portDelivery = rootStore.state.portDelivery;
  const freight = rootStore.state.freight;
  const brokerExpenses = rootStore.state.brokerExpenses;
  const expertise = rootStore.state.expertise;
  const testing = rootStore.state.testing;

  const isOpen = Boolean(customsDuty || customsFee || recyclingFee);

  const convertToRub = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0);

  return (
    <Modal
      centered
      open={isOpen}
      closeIcon={null}
      onOk={() => rootStore.reset()}
      footer={(_, { OkBtn }) => <OkBtn />}
    >
      <AntCard>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Цена авто: </Typography.Text>
          <Typography.Text>{convertToRub(price)}</Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Доставка до порта отгрузки:
          </Typography.Text>
          <Typography.Text>{convertToRub(portDelivery)}</Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Фрахт до Владивостока:
          </Typography.Text>
          <Typography.Text>{convertToRub(freight)}</Typography.Text>
        </Flex>
        <Divider />
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
        <Divider />
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Услуги брокера:
          </Typography.Text>
          <Typography.Text>{convertToRub(brokerExpenses)}</Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Экспертизы:</Typography.Text>
          <Typography.Text>{convertToRub(expertise)}</Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Испытательная лаборатория:
          </Typography.Text>
          <Typography.Text>{convertToRub(testing)}</Typography.Text>
        </Flex>
        <Divider />
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Комиссия компании:
          </Typography.Text>
          <Typography.Text>{convertToRub(companyCommission)}</Typography.Text>
        </Flex>
        <Divider />
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Итоговая цена:</Typography.Text>
          <Typography.Text style={STYLES.totalPrice}>
            {convertToRub(
              sum(
                price,
                companyCommission,
                customsDuty,
                customsFee,
                recyclingFee,
                brokerExpenses,
                expertise,
                testing,
                portDelivery,
                freight
              )
            )}
          </Typography.Text>
        </Flex>
      </AntCard>
    </Modal>
  );
}
