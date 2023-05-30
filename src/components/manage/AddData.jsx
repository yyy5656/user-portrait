import {Form, Input, message, Modal} from "antd";
import api from "../../utils/api";

export default function AddData(props) {
    const {linkList} = props;
    const {isOpenAddDataModal, setIsOpenAddDataModal} = props;

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then((res) => {
            api.data_addDataByLine(res);
            message.success("插入成功").then();
            setIsOpenAddDataModal(false);
        }).catch(() => {
            message.error("请输入信息").then();
        });
    };

    return (
        <>
            <Modal
                title={"添加数据"}
                open={isOpenAddDataModal}
                destroyOnClose={true}
                onOk={() => {
                    handleOk();
                }}
                onCancel={() => {
                    setIsOpenAddDataModal(false);
                }}
                okText={"确定"}
                cancelText={"取消"}
                width={600}
            >
                <Form form={form} component={false}>
                    {
                        linkList.map((item) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <Form.Item
                                    label={item.linkComment}
                                    name={item.linkId}
                                    style={{margin: "5px 0"}}
                                    rules={[
                                        {
                                            required: true,
                                            message: `请输入${item.linkComment}!`
                                        }
                                    ]}
                                >
                                    <Input/>
                                </Form.Item>
                            );
                        })
                    }
                </Form>
            </Modal>
        </>
    );
}