import { Layout as AntLayout } from "antd";
import { PropsWithChildren } from "react";
const { Header, Content } = AntLayout;

const STYLES = {
  layout: { minHeight: "100vh" },
  header: { backgroundColor: "#001529", padding: "0 20px" },
  content: { padding: "20px", display: "flex", justifyContent: "center" },
  title: { color: "white", fontSize: "20px" },
};

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <AntLayout style={STYLES.layout}>
      <Header style={STYLES.header}>
        <div style={STYLES.title}>Расчет стоимости авто</div>
      </Header>
      <Content style={STYLES.content}>{children}</Content>
    </AntLayout>
  );
}
