import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./ui/app";
import "antd/dist/reset.css";
import './styles.css'

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App/>
    </StrictMode>
);


