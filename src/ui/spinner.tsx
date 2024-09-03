import { PropsWithChildren } from "react";
import { rootStore } from "../store/root-store";
import { Spin } from "antd";

export function Spinner({ children }: PropsWithChildren) {
  return (
    <Spin spinning={rootStore.state.isLoading} size="large" delay={300}>
      {children}
    </Spin>
  );
}
