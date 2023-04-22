import {Form, Input, InputNumber, Modal, Popconfirm, Table, Tag, Typography} from "antd";
import React, {useState} from "react";
import test_data from "@/test/table_data.json";
import styles from "@/styles/ShowTable.module.scss";
import table_data from "@/test/table_data.json";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const EditableCell = ({editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    const inputNode = inputType === "number" ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
const TestTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(test_data);
    const [editingKey, setEditingKey] = useState("");
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: "",
            age: "",
            address: "",
            ...record
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey("");
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row
                });
                setData(newData);
                setEditingKey("");
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };
    const handleDelete = () => {
        console.log("调用了删除属性");
    };
    const columns = [
        {
            title: "name",
            dataIndex: "name",
            editable: true
        },
        {
            title: "age",
            dataIndex: "age",
            editable: true
        },
        {
            title: "address",
            dataIndex: "address",
            editable: true
        },
        {
            title: "操作",
            dataIndex: "operation",
            width: "17%",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Tag className={styles.tags} color={"green"} onClick={() => {
                            Modal.confirm({
                                title: "你确定要修改吗?",
                                onOk: () => {
                                    save(record.key);
                                },
                                okText: "确定",
                                cancelText: "取消"
                            });
                        }}><CheckOutlined/></Tag>
                            <Tag className={styles.tags} color={"red"} onClick={() => {
                                cancel();
                            }}><CloseOutlined/></Tag>
                    </span>
                ) : (
                    <>
                        <Tag className={styles.tags} color={"blue"} onClick={() => edit(record)}>编辑</Tag>
                        <Tag className={styles.tags} color={"red"} onClick={() => handleDelete(record)}>删除属性</Tag>
                    </>
                );
            }
        }
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        };
    });

    const tableProps = {
        size: "middle",
        className: styles.table,
        components: {
            body: {
                cell: EditableCell
            }
        },
        bordered: true,
        pagination: {
            // position: ["none", "bottomRight"],
            // pageSize: 6
            onChange: cancel
        },
        scroll: {
            y: "33.7vh"
        },
        dataSource: table_data,
        columns: mergedColumns
    };
    return (
        <Form form={form} component={false}>
            <Table {...tableProps}/>
        </Form>
    );
};
export default TestTable;