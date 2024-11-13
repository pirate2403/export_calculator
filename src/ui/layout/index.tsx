import {Flex, Layout as AntLayout} from "antd";
import {PropsWithChildren} from "react";
import logo from '../../assets/logo.png';
import logoText from '../../assets/logo_text.png';

const {Header, Content} = AntLayout;

const STYLES = {
    layout: {minHeight: "100vh"},
    header: {
        backgroundColor: "#001529",
        padding: "0 20px",
        display: "flex",
        alignItems: "center"
    },
    content: {padding: "20px", display: "flex", justifyContent: "center"},
    title: {color: "white"},
};

export function AppLayout({children}: PropsWithChildren) {
    return (
        <AntLayout style={STYLES.layout}>
            <Header style={STYLES.header}>
                <Flex align='center' gap={2}>
                    <img height={50} src={logo} alt="APEX"/>
                    <img height={50} src={logoText} alt='APEX импрорт автомобилей'/>
                </Flex>
            </Header>
            <Content style={STYLES.content}>{children}</Content>
        </AntLayout>
    );
}
