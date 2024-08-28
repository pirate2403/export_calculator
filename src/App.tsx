import { Spin } from "antd";
import { Form } from "./components/form";
import { AppLayout } from "./components/layout";
import { useCurrencyRates } from "./hooks/use-currency-rates";
import { Car } from "./interfaces";
import { useCalculate } from "./hooks/use-calculate";
import { Card } from "./components/card";

const STYLES = {
  container: { maxWidth: "400px", width: "100%" },
};

function App() {
  const { currencyRates, isLoading } = useCurrencyRates();
  const { calculatedCar, calculateCar, clear } = useCalculate();

  const handleCalculate = (values: Car) => {
    calculateCar(values, currencyRates);
  };

  return (
    <AppLayout>
      <div style={STYLES.container}>
        <Spin spinning={isLoading} size="large">
          <Form onSubmit={handleCalculate} onClear={clear} />
          <Card handleOk={clear} calculatedCar={calculatedCar} />
        </Spin>
      </div>
    </AppLayout>
  );
}

export default App;
