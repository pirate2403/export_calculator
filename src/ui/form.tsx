import {Form as AntForm, InputNumber, Radio, Select,} from "antd";
import {CAR_AGE_GROUP, CURRENCY_RATES, ENGINE_TYPE, OWNER_TYPE,} from "../constants";
import {Car} from "../interfaces";
import {rootStore} from "../store/root-store";

const STYLES = {
    form: {marginBottom: "20px"},
    buttons: {marginTop: "20px"},
    fillWidth: {width: "100%"},
    currency: {minWidth: "120px", width: "30%"},
} as const;

const DEFAULT_VALUE = {
    ownerType: OWNER_TYPE.INDIVIDUAL,
    carAgeGroup: CAR_AGE_GROUP.BETWEEN_3_5,
    engineType: ENGINE_TYPE.GAS,
    enginePower: "",
    engineVolume: "",
    price: "",
    currency: CURRENCY_RATES.JPY,
} as const;

function isElectric(engineType: number) {
    return engineType === ENGINE_TYPE.ELECTRIC;
}

export function Form() {
    const [form] = AntForm.useForm<Car>();

    const changeEngineType = () => {
        form.resetFields(['enginePower', 'engineVolume']);
    }

    const handleFormChange = async () => {
        try {
            const values = await form.validateFields();
            await rootStore.calculate(values)
        } catch {
            rootStore.reset();
        }
    }

    return (
        <AntForm
            layout="vertical"
            form={form}
            initialValues={DEFAULT_VALUE}
            onChange={handleFormChange}
            style={STYLES.form}
        >
            <AntForm.Item label="Владелец" name="ownerType">
                <Radio.Group>
                    <Radio.Button value={OWNER_TYPE.INDIVIDUAL}>
                        Физическое лицо
                    </Radio.Button>
                    <Radio.Button disabled value={OWNER_TYPE.INDIVIDUAL}>
                        Юридическое лицо
                    </Radio.Button>
                </Radio.Group>
            </AntForm.Item>
            <AntForm.Item
                label="Цена авто"
                name="price"
                rules={[{required: true, message: ""}]}
            >
                <InputNumber style={STYLES.fillWidth} min={0}/>
            </AntForm.Item>
            <AntForm.Item label="Валюта" name="currency">
                <Select style={STYLES.currency}>
                    <Select.Option value={CURRENCY_RATES.USD}>
                        {CURRENCY_RATES.USD}
                    </Select.Option>
                    <Select.Option value={CURRENCY_RATES.EUR}>
                        {CURRENCY_RATES.EUR}
                    </Select.Option>
                    <Select.Option value={CURRENCY_RATES.JPY}>
                        {CURRENCY_RATES.JPY}
                    </Select.Option>
                    <Select.Option value={CURRENCY_RATES.CNY}>
                        {CURRENCY_RATES.CNY}
                    </Select.Option>
                    <Select.Option value={CURRENCY_RATES.KRW}>
                        {CURRENCY_RATES.KRW}
                    </Select.Option>
                </Select>
            </AntForm.Item>
            <AntForm.Item label="Возраст авто" name="carAgeGroup">
                <Radio.Group>
                    <Radio.Button value={CAR_AGE_GROUP.UNDER_3}>Младше 3</Radio.Button>
                    <Radio.Button value={CAR_AGE_GROUP.BETWEEN_3_5}>
                        От 3 до 5
                    </Radio.Button>
                    <Radio.Button value={CAR_AGE_GROUP.OVER_5}>Старше 5</Radio.Button>
                </Radio.Group>
            </AntForm.Item>
            <AntForm.Item
                label="Тип двигателя"
                name="engineType"
            >
                <Radio.Group onChange={changeEngineType}>
                    <Radio.Button value={ENGINE_TYPE.GAS}>Бензин</Radio.Button>
                    <Radio.Button value={ENGINE_TYPE.DIESEL}>Дизель</Radio.Button>
                    <Radio.Button value={ENGINE_TYPE.HYBRID}>
                        Гибрид
                    </Radio.Button>
                    <Radio.Button value={ENGINE_TYPE.ELECTRIC}>
                        Электро
                    </Radio.Button>
                </Radio.Group>
            </AntForm.Item>
            <AntForm.Item shouldUpdate>
                {
                    ({getFieldValue}) => (
                        <>
                            <AntForm.Item
                                label="Мощность двигателя (л.с.)"
                                name="enginePower"
                                shouldUpdate
                                rules={[{required: isElectric(getFieldValue("engineType")), message: ""}]}
                                hidden={!isElectric(getFieldValue("engineType"))}
                            >
                                <InputNumber style={STYLES.fillWidth} min={0} placeholder='100'/>
                            </AntForm.Item>
                            <AntForm.Item
                                label="Объем двигателя (см3)"
                                name="engineVolume"
                                shouldUpdate
                                rules={[{required: !isElectric(getFieldValue("engineType")), message: ""}]}
                                hidden={isElectric(getFieldValue("engineType"))}
                            >
                                <InputNumber style={STYLES.fillWidth} min={0} placeholder='1500'/>
                            </AntForm.Item>
                        </>
                    )
                }
            </AntForm.Item>
        </AntForm>
    )
        ;
}
