import {AppLayout} from "../layout";
import {Spinner} from "../spinner";
import {useEffect} from "react";
import {Calculator} from "../calculator";
import {Card} from "../card";
import {rootStore} from "../../store/root-store.ts";



function App() {
    useEffect(() => {
        void rootStore.initApp()
    }, [])

    return (
        <AppLayout>
            <Spinner>
                <Calculator/>
                <Card/>
            </Spinner>
        </AppLayout>
    );
}

export default App;
