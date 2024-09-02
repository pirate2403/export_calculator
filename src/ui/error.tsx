import { Flex, Modal } from "antd";
import { rootStore } from "../store/root-store";
import { InfoCircleFilled } from "@ant-design/icons";

export function Error() {
  const errorMessage = rootStore.state.errorMessage;
  return (
    <Modal
      title={
        <Flex gap={10}>
          <InfoCircleFilled style={{ color: "red" }} /> Ошибка
        </Flex>
      }
      open={!!errorMessage}
      closeIcon={null}
      onOk={() => rootStore.reset()}
      footer={(_, { OkBtn }) => <OkBtn />}
    >
      {errorMessage}
    </Modal>
  );
}
