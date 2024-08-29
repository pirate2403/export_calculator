import { Spin } from "antd";
import { useRootStore } from "../store/root-store";
import { Card } from "./card";
import { Form } from "./form";
import { AppLayout } from "./layout";

const STYLES = {
  container: { maxWidth: "400px", width: "100%" },
};

function App() {
  const rootStore = useRootStore();

  return (
    <AppLayout>
      <div style={STYLES.container}>
        <Spin spinning={rootStore.state.isLoading} size="large">
          <Form onSubmit={rootStore.calculate} onClear={rootStore.reset} />
          <Card handleOk={rootStore.reset} {...rootStore.state} />
        </Spin>
        {rootStore.modal}
      </div>
    </AppLayout>
  );
}

export default App;
