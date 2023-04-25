import { useEffect, useState } from "react";
import { Modal, Steps, Table, Tabs, InputNumber } from "antd";

import PropertyCom from "./addPropertyCom/propertyCom";
// import DataCom from "./addPropertyCom/DataCom";
import api from "@/utils/api";

export default function AddProperty(props) {
  // console.log(props);
  const { connectionId, isOpenAddPropertyModal, setIsOpenAddPropertyModal } =
    props;

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Modal
        // title="新增字段"
        open={isOpenAddPropertyModal}
        destroyOnClose={true}
        onOk={() => {}}
        onCancel={() => {
          setIsOpenAddPropertyModal(false);
        }}
        okText="确定"
        cancelText="取消"
        width={600}
        footer={null}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "新增字段",
              children: <PropertyCom connectionId={connectionId} type={1} />,
            },
            {
              key: "2",
              label: "更新数据",
              children: <PropertyCom connectionId={connectionId} type={2} />,
            },
          ]}
          onChange={onChange}
        />
      </Modal>
    </>
  );
}
