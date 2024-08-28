import { Card as AntCard, Divider, Flex, Modal, Typography } from "antd";
import { CalculatedCar } from "../../interfaces";

interface Props {
  calculatedCar: CalculatedCar | null;
  handleOk: () => void;
}

const STYLES = {
  title: { fontWeight: "bold" },
  totalPrice: { fontWeight: "bold", fontSize: "24px", color: "green" },
};

export function Card({ calculatedCar, handleOk }: Props) {
  if (!calculatedCar) return null;

  const convertToRub = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Modal
      title={<Typography.Title level={4}>Результат</Typography.Title>}
      open={!!calculatedCar}
      closeIcon={null}
      onOk={handleOk}
      footer={(_, { OkBtn }) => <OkBtn />}
    >
      <AntCard>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Цена авто: </Typography.Text>
          <Typography.Text>
            {convertToRub(calculatedCar.rubPrice)}
          </Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Комиссия компании:
          </Typography.Text>
          <Typography.Text>
            {convertToRub(calculatedCar.companyCommission)}
          </Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Пошлина: </Typography.Text>
          <Typography.Text>
            {convertToRub(calculatedCar.customsDuty)}
          </Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Таможенный сбор:
          </Typography.Text>
          <Typography.Text>
            {convertToRub(calculatedCar.customsFee)}
          </Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Утилизационный сбор:
          </Typography.Text>
          <Typography.Text>
            {convertToRub(calculatedCar.recyclingFee)} ₽
          </Typography.Text>
        </Flex>

        <Divider />
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Итоговая цена:</Typography.Text>
          <Typography.Text style={STYLES.totalPrice}>
            {convertToRub(calculatedCar.totalPrice)}
          </Typography.Text>
        </Flex>
      </AntCard>
    </Modal>
  );
}
