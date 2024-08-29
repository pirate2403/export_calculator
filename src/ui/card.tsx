import { Card as AntCard, Divider, Flex, Modal, Typography } from "antd";

interface Props {
  price: number;
  customsDuty: number;
  customsFee: number;
  recyclingFee: number;
  companyCommission: number;
  handleOk: () => void;
}

const STYLES = {
  title: { fontWeight: "bold" },
  totalPrice: { fontWeight: "bold", fontSize: "24px", color: "green" },
};

export function Card({
  price,
  companyCommission,
  customsDuty,
  customsFee,
  recyclingFee,
  handleOk,
}: Props) {
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
      title={<Typography.Title level={4}>Результат</Typography.Title>}
      open={isOpen}
      closeIcon={null}
      onOk={handleOk}
      footer={(_, { OkBtn }) => <OkBtn />}
    >
      <AntCard>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>Цена авто: </Typography.Text>
          <Typography.Text>{convertToRub(price)}</Typography.Text>
        </Flex>
        <Flex gap={10} align="center" justify="space-between">
          <Typography.Text style={STYLES.title}>
            Комиссия компании:
          </Typography.Text>
          <Typography.Text>{convertToRub(companyCommission)}</Typography.Text>
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
          <Typography.Text>{convertToRub(recyclingFee)} ₽</Typography.Text>
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
                recyclingFee
              )
            )}
          </Typography.Text>
        </Flex>
      </AntCard>
    </Modal>
  );
}
