import {Card} from "./card";
import {Currency} from "./currency";
import {Form} from "./form";
import {AppLayout} from "./layout";
import {Spinner} from "./spinner";
import {Error} from "./error";
import {Divider} from "antd";

const STYLES = {
    container: {maxWidth: "400px", width: "100%"},
};

function App() {
    return (
        <Spinner>
            <AppLayout>
                <div style={STYLES.container}>
                    <Currency/>
                    <Divider/>
                    <Form/>
                    <Card/>
                    <Error/>
                </div>
            </AppLayout>
        </Spinner>
    );
}

export default App;
