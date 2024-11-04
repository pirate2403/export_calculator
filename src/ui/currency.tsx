import {Button, Collapse, Flex, Form as AntForm, InputNumber, Typography} from "antd";
import {FocusEventHandler, useEffect} from "react";
import {rootStore} from "../store/root-store";
import {ReloadOutlined} from "@ant-design/icons";
import {CurrencyRatesValues} from "../services/currency-rates-service.ts";
import {convert} from "../helpers/convert.ts";

const STYLES = {
    container: {marginBottom: '-20px'},
    title: {fontWeight: "bold"},
    button: {marginTop: '3px'},
    fullWidth: {width: "100%"},
};

export function Currency() {
    const currencyRates = rootStore.state.currencyRates;
    const [form] = AntForm.useForm<CurrencyRatesValues>();

    useEffect(() => {
        void rootStore.fetchCurrencyRates();
    }, []);

    const handleRefresh = () => {
        void rootStore.fetchCurrencyRates();
        form.resetFields();
    }

    const handleFormBlur: FocusEventHandler<HTMLFormElement> = () => {
        const formValues = form.getFieldsValue();
        const result = Object.keys(formValues).reduce<CurrencyRatesValues>((acc, item) => {
            const key = item as keyof CurrencyRatesValues
            acc[key] = convert(formValues[key] ?? currencyRates[key]);
            return acc
        }, currencyRates);

        rootStore.setCurrencyRates(result);
        form.resetFields();
    }

    return (
        <Flex gap={8} align='start' justify='space-between' style={STYLES.container}>
            <Collapse
                size="small"
                expandIcon={() => null}
                ghost
                items={[{
                    key: '1', label: (
                        <Flex gap={4} wrap style={{color: "white"}}>
                            <Flex gap={4} align="center">
                                <Typography.Text style={STYLES.title}>€: </Typography.Text>
                                <Typography.Text>{currencyRates.EUR};</Typography.Text>
                            </Flex>
                            <Flex gap={4} align="center">
                                <Typography.Text style={STYLES.title}>$: </Typography.Text>
                                <Typography.Text>{currencyRates.USD};</Typography.Text>
                            </Flex>
                            <Flex gap={4} align="center">
                                <Typography.Text style={STYLES.title}>¥: </Typography.Text>
                                <Typography.Text>{currencyRates.JPY};</Typography.Text>
                            </Flex>
                            <Flex gap={4} align="center">
                                <Typography.Text style={STYLES.title}>₩: </Typography.Text>
                                <Typography.Text>{currencyRates.KRW};</Typography.Text>
                            </Flex>
                        </Flex>

                    ), children: (
                        <AntForm form={form} initialValues={currencyRates} onBlur={handleFormBlur}>
                            <AntForm.Item name="EUR">
                                <InputNumber addonBefore='€' style={STYLES.fullWidth}/>
                            </AntForm.Item>
                            <AntForm.Item name="USD">
                                <InputNumber addonBefore='$' style={STYLES.fullWidth}/>
                            </AntForm.Item>
                            <AntForm.Item name="JPY">
                                <InputNumber addonBefore='¥' style={STYLES.fullWidth}/>
                            </AntForm.Item>
                            <AntForm.Item name="KRW">
                                <InputNumber addonBefore='₩' style={STYLES.fullWidth}/>
                            </AntForm.Item>
                        </AntForm>
                    )
                }]}
            />
            <Button style={STYLES.button} icon={<ReloadOutlined/>} onClick={handleRefresh}/>
        </Flex>
    );
}
