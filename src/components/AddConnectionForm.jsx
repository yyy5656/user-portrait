import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Steps,
  Upload,
  Select,
  Modal,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BASE_URL } from "@/utils/constant";
import router from "@/service/router";
import api from "@/utils/api";
import { transfromListToSelect, transfromSelectToAipList } from "@/utils/utils";

export default function AddConnectionForm(props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [value, setValue] = useState();
  const [list, setList] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [minNum, setMinNum] = useState(2);
  const [maxNum, setMaxNum] = useState(2);

  const [isFinisedCreate, setIsFinisedCreate] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isImport, setIsImport] = useState(false);

  const uploadProps = {
    name: "file",
    accept: ".xlsx,.xls", // 支持的文件类型
    action: BASE_URL + router.uploadData, // 上传的地址
    showUploadList: false, // 展示浏览器的默认选择文件框？
    customRequest(event) {
      const formData = new FormData();
      formData.append("excel", event.file);
      api.uploadData(formData).then((res) => {
        console.log(res.data);
        message.success("上传成功！");
        setIsUpload(true);
        setList(res.data.data);
      });
    },
    beforeUpload(file) {
      if (!/(.xlsx|.xls)$/i.test(file.name)) {
        message.error("文件类型不符合要求，不允许上传！");
        return false;
      }
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`文件上传成功！`);
      } else if (info.file.status === "error") {
        message.error(`文件上传失败！`);
      }
    },
  };

  const createConnection = (value) => {
    api.createConnection(value).then(
      (res) => {
        // 更新token
        localStorage.setItem("token", res.data.data);
        message.success("任务创建成功！");
        setIsFinisedCreate(true);
      },
      (err) => {
        message.error(err);
      }
    );
  };

  const handleConnectionOk = () => {
    api
      .importProperty({
        start: minNum,
        end: maxNum,
        sheetIndex,
        category: transfromSelectToAipList(selectList),
      })
      .then((res) => {
        message.success("创建成功！");
        props.setIsConnectionModalOpen(false);
        props.addConnection(value);
      });
  };

  const handleChange = (value, option) => {
    setSheetIndex(value);
    console.log(list.sheetList[value]);
  };

  const handlePropertyChange = (value, option) => {
    setSelectList(option);
  };

  const contentStyle = {
    marginTop: 16,
  };

  const stepItems = [
    {
      title: "创建任务名称",
      content: (
        <Form
          onFinish={createConnection}
          onFinishFailed={() => {
            message.error("你没有填入任务名称！");
          }}
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "10px",
          }}
        >
          <div>任务名称：</div>
          <Form.Item
            name={"tableName"}
            style={{ width: "60%" }}
            rules={[{ required: true, message: "请填入任务名称" }]}
          >
            <Input
              onChange={(e) => {
                console.log(e);
                setValue(e.target.value);
              }}
              type="text"
              placeholder="在此输入任务名称"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType={"submit"}>创建任务</Button>
          </Form.Item>
        </Form>
      ),
      disabled: !isFinisedCreate,
      buttonName: "Next",
    },
    {
      title: "上传表单",
      content: (
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>上传表格</Button>
        </Upload>
      ),
      disabled: !isUpload,
      buttonName: "Next",
    },
    {
      title: "选择字段",
      content: (
        <div>
          当前表格为：{list.fileName}
          <div>
            <span>选择表格：</span>
            <Select
              allowClear
              // style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={
                list.sheetList &&
                list.sheetList.map((item) => {
                  return {
                    value: item.sheetIndex,
                    label: item.sheetName,
                  };
                })
              }
            />
          </div>
          {sheetIndex >= 0 && (
            <>
              <div>
                <span>选择属性</span>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "80%" }}
                  placeholder="选择属性"
                  onChange={handlePropertyChange}
                  options={
                    list.sheetList?.[sheetIndex] &&
                    list.sheetList?.[sheetIndex].categoryList.map((item) => {
                      return {
                        value: item.categoryIndex,
                        label: item.categoryName,
                      };
                    })
                  }
                />
              </div>
              <div>
                <span>
                  选择导入数据行数,总计{list.sheetList?.[sheetIndex].dataLine}条数据
                </span>
                <InputNumber
                  min={2}
                  max={Number(list.sheetList?.[sheetIndex].dataLine)}
                  onChange={(value)=>setMinNum(value)}
                  keyboard={true}
                  defaultValue={2}
                />
                <InputNumber
                  min={2}
                  max={Number(list.sheetList?.[sheetIndex].dataLine)}
                  onChange={(value)=>setMaxNum(value)}
                  keyboard={true}
                  defaultValue={Number(list.sheetList?.[sheetIndex].dataLine)}
                />
              </div>
            </>
          )}
        </div>
      ),
      disabled: !selectList ,
      buttonName: "完成",
    },
  ];

  return (
    <>
      <Modal
        destroyOnClose={true}
        closable={false}
        // onCancel={props.setIsConnectionModalOpen(false)}
        title={"新建任务！"}
        open={true}
        footer={null}
      >
        <Steps current={stepIndex} items={stepItems} />
        <div style={contentStyle}>{stepItems[stepIndex].content}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              if (stepIndex === 2) {
                handleConnectionOk();
              } else {
                setStepIndex(stepIndex + 1);
              }
            }}
            disabled={stepItems[stepIndex].disabled}
          >
            {stepItems[stepIndex].buttonName}
          </Button>
        </div>
      </Modal>
    </>
  );
}
