import {
  Form as AntForm,
  Button,
  Flex,
  InputNumber,
  Radio,
  Select,
} from "antd";
import { Car } from "../../interfaces";
import { CURRENCY } from "../../features/currency-rates";
import { CAR_AGE, ENGINE_TYPE, OWNER } from "../../features/calculator";

interface Props {
  onSubmit: (car: Car) => void;
  onClear?: () => void;
}

const STYLE = {
  form: { marginBottom: "20px" },
  buttons: { marginTop: "20px" },
  fillWidth: { width: "100%" },
  currency: { minWidth: "120px", width: "30%" },
} as const;

const DEFAULT_VALUE = {
  owner: OWNER.INDIVIDUAL,
  carAge: CAR_AGE["<3"],
  engineType: ENGINE_TYPE.GASOLINE,
  enginePower: "",
  engineVolume: "",
  price: "",
  currency: CURRENCY.RUB,
} as const;

export function Form({ onSubmit, onClear }: Props) {
  const [form] = AntForm.useForm<Car>();

  const handleClear = () => {
    form.resetFields();
    onClear?.();
  };

  return (
    <AntForm
      layout="vertical"
      form={form}
      initialValues={DEFAULT_VALUE}
      onFinish={onSubmit}
      style={STYLE.form}
    >
      <AntForm.Item label="Владелец" name="owner">
        <Radio.Group>
          <Radio.Button value={OWNER.INDIVIDUAL}>Физическое лицо</Radio.Button>
          <Radio.Button disabled value={OWNER.INDIVIDUAL}>
            Юридическое лицо
          </Radio.Button>
        </Radio.Group>
      </AntForm.Item>
      <AntForm.Item
        label="Цена авто"
        name="price"
        rules={[{ required: true, message: "Введите цену авто" }]}
      >
        <InputNumber style={STYLE.fillWidth} />
      </AntForm.Item>
      <AntForm.Item label="Валюта" name="currency">
        <Select style={STYLE.currency}>
          <Select.Option value={CURRENCY.USD}>{CURRENCY.USD}</Select.Option>
          <Select.Option value={CURRENCY.EUR}>{CURRENCY.EUR}</Select.Option>
          <Select.Option value={CURRENCY.RUB}>{CURRENCY.RUB}</Select.Option>
          <Select.Option value={CURRENCY.JPY}>{CURRENCY.JPY}</Select.Option>
          <Select.Option value={CURRENCY.CNY}>{CURRENCY.CNY}</Select.Option>
          <Select.Option value={CURRENCY.KRW}>{CURRENCY.KRW}</Select.Option>
        </Select>
      </AntForm.Item>

      <AntForm.Item label="Возраст авто" name="carAge">
        <Radio.Group>
          <Radio.Button value={CAR_AGE["<3"]}>Младше 3</Radio.Button>
          <Radio.Button value={CAR_AGE["3-5"]}>От 3 до 5</Radio.Button>
          <Radio.Button value={CAR_AGE[">5"]}>Старше 5</Radio.Button>
        </Radio.Group>
      </AntForm.Item>
      <AntForm.Item label="Тип двигателя" name="engineType">
        <Radio.Group>
          <Radio.Button value={ENGINE_TYPE.GASOLINE}>Бензин</Radio.Button>
          <Radio.Button value={ENGINE_TYPE.DIESEL}>Дизель</Radio.Button>
          <Radio.Button disabled value={ENGINE_TYPE.ELECTRIC}>
            Электро
          </Radio.Button>
          <Radio.Button disabled value={ENGINE_TYPE.HYBRID}>
            Гибрид
          </Radio.Button>
        </Radio.Group>
      </AntForm.Item>
      <AntForm.Item
        label="Объем двигателя (см3)"
        name="engineVolume"
        rules={[{ required: true, message: "Введите объем двигателя" }]}
      >
        <InputNumber style={STYLE.fillWidth} />
      </AntForm.Item>
      <AntForm.Item
        label="Мощность двигателя (л.с.)"
        name="enginePower"
        rules={[{ required: true, message: "Введите мощность двигателя" }]}
      >
        <InputNumber style={STYLE.fillWidth} />
      </AntForm.Item>
      <AntForm.Item>
        <Flex gap={20} style={STYLE.buttons}>
          <Button type="primary" htmlType="submit" block>
            Рассчитать
          </Button>
          <Button type="default" htmlType="button" onClick={handleClear}>
            Очистить
          </Button>
        </Flex>
      </AntForm.Item>
    </AntForm>
  );
}
