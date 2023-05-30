import { useEffect, useState } from "react";
import {
  InputNumber,
  Steps,
  message,
  Upload,
  Button,
  Select,
  Tag,
  Table,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../../styles/Manage.module.scss";
import api from "../../../utils/api";

export default function PropertyCom(props) {
  const { type, connectionId, setIsOpenAddPropertyModal } = props;
  console.log(props);

  const [stepIndex, setStepIndex] = useState(0);

  // 选择属性部分
  const [list, setList] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(-1);

  // selete框展示的option
  const [linkList, setLinklist] = useState([]);
  const [propertyData, sePpropertyData] = useState([]);

  const [stepTwoSelectLink, setStepTwoSelectLink] = useState();
  const [stepTwoSelectProperty, setStepTwoSelectProperty] = useState();
  const [stepThrSelectPropertyOption, setStepThrSelectPropertyOption] =
    useState([]);
  const [stepThrSelectLinkOption, setStepThrSelectLinkOption] = useState([]);
  const [stepThrSelectPropertyList, setStepThrSelectPropertyList] = useState(
    []
  );

  // type为2
  const [stepThrList, setStepThrList] = useState({});
  const [minNum, setMinNum] = useState(2);
  const [maxNum, setMaxNum] = useState(2);
  const [updateCategoriesList, setUpdateCategoriesList] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async (connectionId) => {
    const res = await api.chooseConnection({ connectionId });
    if (res.status === 200 && res.data.data) {
      localStorage.setItem("token", res.data.data);
    }
    const linkRes = await api.getLink();
    if (linkRes.status === 200 && linkRes.data) {
      setLinklist(linkRes.data.data.links);
    }
  };

  useEffect(() => {
    fetchData(connectionId.current);
  }, []);

  const fetchAddData = () => {
    const params = {
      sheetIndex,
      primaryLink: stepTwoSelectLink,
      primaryCategory: stepTwoSelectProperty,
      category: stepThrSelectPropertyList,
    };
    api.addData(params).then((res) => {
      if (res.data.code === 200) {
        message.success("添加成功！");
        setIsOpenAddPropertyModal(false);
      } else {
        message.info(res.data.data.msg);
      }
    });
  };
  const fetchUpdateData = () => {
    const params = {
      sheetIndex,
      start: minNum,
      end: maxNum,
      primaryLink: stepTwoSelectLink,
      primaryCategory: stepTwoSelectProperty,
      updateCategories: updateCategoriesList,
    };
    api.updateData(params).then((res) => {
      if (res.data.code == 200) {
        message.success("更新成功！");
        setIsOpenAddPropertyModal(false);
      } else {
        message.info(res.data.data.msg);
      }
    });
  };

  const fetchImportMoreData = () => {
    const params = {
      sheetIndex,
      start: minNum,
      end: maxNum,
      updateCategories: updateCategoriesList,
    };
    api.importMoreData(params).then((res) => {
      if (res.data.code == 200) {
        message.success("更新成功！");
        setIsOpenAddPropertyModal(false);
      } else {
        message.info(res.data.data.msg);
      }
    });
  };

  const filterChoosenPropetry = (categoryIndex, list) => {
    if (!list) {
      return [];
    }
    const filterList = list.filter(
      (item) => item.categoryIndex !== categoryIndex
    );
    setStepThrSelectPropertyOption(
      filterList.map((item) => ({
        value: item.categoryName,
        label: item.categoryName,
        type: item.categoryType,
        categoryIndex: item.categoryIndex,
        categoryName: item.categoryName,
        categoryType: item.categoryType,
      }))
    );
  };
  const filterChoosenLink = (linkId, list) => {
    const filterLink = list.filter((item) => item.linkId !== linkId);
    setStepThrSelectLinkOption(
      filterLink.map((item) => ({
        label: item.linkComment,
        value: item.linkComment,
        linkId: item.linkId,
        connectionId: item.connectionId,
        linkType: item.linkType,
        linkComment: item.linkComment,
      }))
    );
  };

  const uploadProps = {
    name: "file",
    accept: ".xlsx,.xls", // 支持的文件类型
    showUploadList: false, // 展示浏览器的默认选择文件框？
    customRequest(event) {
      const formData = new FormData();
      formData.append("excel", event.file);
      api.getProperty(formData).then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          message.success("上传成功！");
          // setIsUpload(true);
          sePpropertyData(res.data.data);
        } else {
          message.error("上传失败！");
        }
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

  const stepItems = [
    {
      title: "上传表单",
      content: (
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>上传表格</Button>
        </Upload>
      ),
      // disabled: !isUpload,
      buttonName: "下一步",
    },
    type === 3
      ? {
          title: "选择表格",
          content: (
            <>
              <div>
                当前表格为：{propertyData?.fileName}
                <div className={styles.add_property_div}>
                  <span className={styles.add_property_span}>选择表格:</span>
                  <Select
                    allowClear
                    style={{ width: "40%" }}
                    placeholder="选择表格"
                    onChange={(value) => {
                      setSheetIndex(value);
                      setMaxNum(Number(propertyData.sheetList[value].dataLine));
                      filterChoosenPropetry(
                        "-1",
                        propertyData.sheetList?.[value]?.categoryList
                      );
                      filterChoosenLink("-1", linkList);
                    }}
                    options={
                      propertyData.sheetList &&
                      propertyData.sheetList.map((item) => {
                        return {
                          value: item.sheetIndex,
                          label: item.sheetName,
                        };
                      })
                    }
                  />
                </div>
              </div>
            </>
          ),
          // disabled: !isUpload,
          buttonName: "下一步",
        }
      : {
          title: "选择主键对应",
          content: (
            <>
              <div>
                当前表格为：{propertyData?.fileName}
                <div className={styles.add_property_div}>
                  <span className={styles.add_property_span}>选择表格:</span>
                  <Select
                    allowClear
                    style={{ width: "40%" }}
                    placeholder="选择表格"
                    onChange={(value) => {
                      setSheetIndex(value);
                      setMaxNum(Number(propertyData.sheetList[value].dataLine));
                    }}
                    options={
                      propertyData.sheetList &&
                      propertyData.sheetList.map((item) => {
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
                    <div className={styles.add_property_div}>
                      <span className={styles.add_property_span}>
                        选择字段:
                      </span>
                      <Select
                        allowClear
                        style={{ width: "40%" }}
                        placeholder="选择字段"
                        onChange={(_, option) => {
                          setStepTwoSelectLink({
                            linkComment: option.value,
                            linkId: option.linkId,
                            connectionId: option.connectionId,
                            linkType: option.type,
                          });
                          filterChoosenLink(option.linkId, linkList);
                        }}
                        options={linkList.map((item) => ({
                          label: item.linkComment,
                          value: item.linkComment,
                          linkId: item.linkId,
                          connectionId: item.connectionId,
                          linkType: item.linkType,
                        }))}
                      />
                    </div>
                    <div className={styles.add_property_div}>
                      <span className={styles.add_property_span}>
                        选择属性:
                      </span>
                      <Select
                        allowClear
                        style={{ width: "40%" }}
                        placeholder="选择属性"
                        onChange={(_, option) => {
                          setStepTwoSelectProperty({
                            categoryIndex: option.categoryIndex,
                            categoryName: option.value,
                            categoryType: option.type,
                          });
                          filterChoosenPropetry(
                            option.categoryIndex,
                            propertyData.sheetList?.[sheetIndex]?.categoryList
                          );
                        }}
                        options={
                          propertyData.sheetList?.[sheetIndex]
                            ? propertyData.sheetList?.[
                                sheetIndex
                              ].categoryList.map((item) => {
                                return {
                                  value: item.categoryName,
                                  label: item.categoryName,
                                  type: item.categoryType,
                                  categoryIndex: item.categoryIndex,
                                };
                              })
                            : []
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          ),
          // disabled: !isUpload,
          buttonName: "下一步",
        },

    type == 1
      ? {
          title: "选择属性",
          content: (
            <div>
              <div className={styles.add_property_div}>
                当前表格为：{propertyData.fileName}
              </div>
              <div className={styles.add_property_div}>
                <span className={styles.add_property_span}>选择属性：</span>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "60%" }}
                  placeholder="选择属性"
                  onChange={(_, option) => {
                    setStepThrSelectPropertyList(
                      option.map((item) => ({
                        categoryIndex: item.categoryIndex,
                        categoryName: item.value,
                        categoryType: item.type,
                      }))
                    );
                  }}
                  defaultValue={[]}
                  options={[...stepThrSelectPropertyOption]}
                />
              </div>
            </div>
          ),
          //   disabled: !selectList,
          buttonName: "完成",
        }
      : {
          title: "对应标签",
          content: (
            <>
              <div>
                当前表格为：{propertyData.fileName}
                <div className={styles.add_property_div}>
                  {sheetIndex >= 0 ? (
                    <>
                      <span>
                        选择导入数据行数 总计
                        {propertyData.sheetList?.[sheetIndex].dataLine}
                        条数据：
                      </span>
                      <InputNumber
                        min={2}
                        max={Number(
                          propertyData.sheetList?.[sheetIndex].dataLine
                        )}
                        onChange={(value) => setMinNum(value)}
                        keyboard={true}
                        defaultValue={2}
                      />
                      -
                      <InputNumber
                        min={2}
                        max={Number(
                          propertyData.sheetList?.[sheetIndex].dataLine
                        )}
                        onChange={(value) => setMaxNum(value)}
                        keyboard={true}
                        defaultValue={Number(
                          propertyData.sheetList?.[sheetIndex].dataLine
                        )}
                      />
                    </>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "5px",
                  }}
                >
                  <div style={{ width: "40%" }}>
                    <span className={styles.add_property_span}>选择字段：</span>
                    <Select
                      allowClear
                      style={{ width: "60%" }}
                      placeholder="选择字段："
                      onChange={(_, option) => {
                        if (option) {
                          stepThrList.link = {
                            linkComment: option.value,
                            linkId: option.linkId,
                            connectionId: option.connectionId,
                            linkType: option.linkType,
                          };
                        }
                        setStepThrList({ ...stepThrList });
                      }}
                      options={stepThrSelectLinkOption}
                    />
                  </div>
                  <div style={{ width: "40%" }}>
                    <span className={styles.add_property_span}>选择属性：</span>
                    <Select
                      allowClear
                      style={{ width: "60%" }}
                      placeholder="选择属性"
                      onChange={(_, option) => {
                        if (option) {
                          stepThrList.property = {
                            categoryIndex: option.categoryIndex,
                            categoryName: option.value,
                            categoryType: option.type,
                          };
                        }
                        setStepThrList({ ...stepThrList });
                      }}
                      options={stepThrSelectPropertyOption}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const temp = stepThrList;
                      const params = {
                        categoryIndex: temp.property.categoryIndex,
                        categoryName: temp.property.categoryName,
                        linkId: temp.link.linkId,
                      };
                      // 去除已选择的option
                      filterChoosenPropetry(
                        params.categoryIndex,
                        stepThrSelectPropertyOption
                      );
                      filterChoosenLink(params.linkId, stepThrSelectLinkOption);
                      setDataSource([
                        ...dataSource,
                        {
                          link: temp.link.linkComment,
                          property: temp.property.categoryName,
                          linkParamas: temp.link,
                          propertyParamas: temp.property,
                        },
                      ]);
                      setUpdateCategoriesList([
                        ...updateCategoriesList,
                        params,
                      ]);
                      message.success("添加成功！");
                    }}
                  >
                    点击添加
                  </Button>
                </div>
                <Table
                  dataSource={[...dataSource]}
                  size="small"
                  style={{ marginTop: 5 }}
                  pagination={false}
                  columns={[
                    {
                      title: "字段",
                      dataIndex: "link",
                      key: "link",
                      align: "center",
                    },
                    {
                      title: "属性",
                      dataIndex: "property",
                      key: "property",
                      align: "center",
                    },
                    {
                      title: "操作",
                      dataIndex: "操作",
                      key: "操作",
                      align: "center",
                      render: (_, record, index) => (
                        <Tag
                          className={styles.tags}
                          color={"blue"}
                          onClick={() => {
                            // 删除后将option有加回来
                            setStepThrSelectLinkOption([
                              ...stepThrSelectLinkOption,
                              {
                                value: record.propertyParamas.linkComment,
                                label: record.propertyParamas.linkComment,
                                ...record.propertyParamas,
                              },
                            ]);
                            setStepThrSelectPropertyOption([
                              ...stepThrSelectPropertyOption,
                              {
                                value: record.propertyParamas.categoryName,
                                label: record.propertyParamas.categoryName,
                                type: record.propertyParamas.categoryType,
                                ...record.propertyParamas,
                              },
                            ]);
                            dataSource.splice(index, 1);
                            setDataSource([...dataSource]);
                          }}
                        >
                          删除
                        </Tag>
                      ),
                    },
                  ]}
                />
              </div>
            </>
          ),
          //   disabled: !selectList,
          buttonName: "完成",
        },
  ];
  return (
    <>
      <Steps size="small" current={stepIndex} items={stepItems} />
      <div style={{ margin: "16px 0" }}>{stepItems[stepIndex].content}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {stepIndex === 0 && (
          <Button
            style={{ marginRight: "20px" }}
            onClick={() => {
              setIsOpenAddPropertyModal(false);
            }}
          >
            取消
          </Button>
        )}
        <Button
          type="primary"
          onClick={() => {
            if (stepIndex === 2) {
              if (type === 1) {
                fetchAddData();
              } else if (type === 2) {
                fetchUpdateData();
              } else if (type === 3) {
                fetchImportMoreData();
              }
            } else {
              setStepIndex(stepIndex + 1);
            }
          }}
          disabled={stepItems[stepIndex].disabled}
        >
          {stepItems[stepIndex].buttonName}
        </Button>
      </div>
    </>
  );
}
