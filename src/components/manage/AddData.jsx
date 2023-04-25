import { useState } from "react";
import { Modal, Form, Table, Input, message } from "antd";

import api from "@/utils/api";

const EditableCell = ({ dataIndex, title }) => {
  return (
    <td>
      <Form.Item
        name={dataIndex}
        style={{
          margin: 0,
        }}
        rules={[
          {
            required: true,
            message: `请输入${title}!`,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </td>
  );
};

export default function AddData(props) {
  // console.log(props);
  const { linkList } = props;
  const { isOpenAddDataModal, setIsOpenAddDataModal } = props;
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: "",
      age: "",
      address: "",
    },
  ]);

  const [form] = Form.useForm();

  const columns = linkList.map((item) => ({
    ...item,
    title: item.linkComment,
    dataIndex: item.linkId,
    editable: true,
  }));

  const mergedColumns = columns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((res) => {
        console.log(res);
        api.data_addDataByLine(res);
        message.success("插入成功");
        setIsOpenAddDataModal(false);
      })
      .catch(() => {
        message.error("请输入信息");
      });
  };

  return (
    <>
      <Modal
        title="添加数据"
        open={isOpenAddDataModal}
        destroyOnClose={true}
        onOk={() => {
          handleOk();
        }}
        onCancel={() => {
          setIsOpenAddDataModal(false);
        }}
        okText="确定"
        cancelText="取消"
        width={600}
      >
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
      </Modal>
    </>
  );
}
