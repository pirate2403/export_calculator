import { Card } from "./card";
import { Currency } from "./currency";
import { Form } from "./form";
import { AppLayout } from "./layout";
import { Spinner } from "./spinner";
import { Error } from "./error";

const STYLES = {
  container: { maxWidth: "400px", width: "100%" },
};

function App() {
  return (
    <Spinner>
      <AppLayout>
        <div style={STYLES.container}>
          <Form />
          <Currency />
          <Card />
          <Error />
        </div>
      </AppLayout>
    </Spinner>
  );
}

export default App;
