import { Modal, Tabs } from "antd";
import PropertyCom from "./addPropertyCom/PropertyCom"

export default function AddProperty(props) {
  const { connectionId, isOpenAddPropertyModal, setIsOpenAddPropertyModal } =
    props;

  return (
    <>
      <Modal
        open={isOpenAddPropertyModal}
        destroyOnClose={true}
        onOk={() => {}}
        onCancel={() => {
          setIsOpenAddPropertyModal(false);
        }}
        okText="确定"
        cancelText="取消"
        width={500}
        footer={null}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "新增字段",
              children: (
                <PropertyCom
                  connectionId={connectionId}
                  setIsOpenAddPropertyModal={setIsOpenAddPropertyModal}
                  type={1}
                />
              ),
            },
            {
              key: "2",
              label: "更新数据",
              children: (
                <PropertyCom
                  connectionId={connectionId}
                  setIsOpenAddPropertyModal={setIsOpenAddPropertyModal}
                  type={2}
                />
              ),
            },
             {
              key: "3",
              label: "导入数据",
              children: (
                <PropertyCom
                  connectionId={connectionId}
                  setIsOpenAddPropertyModal={setIsOpenAddPropertyModal}
                  type={3}
                />
              ),
            },
          ]}
        ></Tabs>
      </Modal>
    </>
  );
}
