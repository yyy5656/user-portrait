import {useEffect, useState} from "react";
import {InputNumber, Steps, message, Upload, Button, Select} from "antd";
import {UploadOutlined} from "@ant-design/icons";

import api from "@/utils/api";

export default function PropertyCom(props) {
    //console.log(0, props);
    const {type, connectionId} = props;

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
    const [stepThrSelectPropertyList, setStepThrSelectPropertyList] = useState(
        []
    );

    // type为2
    const [stepThrList, setStepThrList] = useState([{}]);
    const [minNum, setMinNum] = useState(2);
    const [maxNum, setMaxNum] = useState(2);
    const [updateCategoriesList, setUpdateCategoriesList] = useState([]);

    const fetchData = async (connectionId) => {
        const res = await api.chooseConnection({connectionId});
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
            category: stepThrSelectPropertyList
        };
        console.log(params);
        api.addData(params);
    };
    const fetchUpdateData = () => {
        const params = {
            sheetIndex,
            start: minNum,
            end: maxNum,
            primaryLink: stepTwoSelectLink,
            primaryCategory: stepTwoSelectProperty,
            updateCategoriesList
        };
        api.updateData(params);
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
                message.success("上传成功！");
                // setIsUpload(true);
                sePpropertyData(res.data.data);
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
        }
    };

    const stepItems = [
        {
            title: "上传表单",
            content: (
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined/>}>上传表格</Button>
                </Upload>
            ),
            // disabled: !isUpload,
            buttonName: "下一步"
        },
        {
            title: "选择主键对应",
            content: (
                <>
                    <div>
                        当前表格为：{propertyData.fileName}
                        <div>
                            <span>选择表格：</span>
                            <Select
                                allowClear
                                // style={{ width: "100%" }}
                                placeholder="Please select"
                                onChange={(value) => {
                                    setSheetIndex(value);
                                }}
                                options={
                                    propertyData.sheetList &&
                                    propertyData.sheetList.map((item) => {
                                        return {
                                            value: item.sheetIndex,
                                            label: item.sheetName
                                        };
                                    })
                                }
                            />
                        </div>
                        {sheetIndex >= 0 && (
                            <>
                                <div>
                                    <span>选择字段：</span>
                                    <Select
                                        allowClear
                                        style={{width: "30%"}}
                                        placeholder="选择属性"
                                        onChange={(_, option) => {
                                            setStepTwoSelectLink({
                                                linkComment: option.value,
                                                linkId: option.linkId,
                                                connectionId: option.connectionId,
                                                linkType: option.type
                                            });
                                        }}
                                        options={linkList.map((item) => ({
                                            label: item.linkComment,
                                            value: item.linkComment,
                                            linkId: item.linkId,
                                            connectionId: item.connectionId,
                                            linkType: item.linkType
                                        }))}
                                    />
                                </div>
                                <div>
                                    <span>选择属性:</span>
                                    <Select
                                        allowClear
                                        style={{width: "30%"}}
                                        placeholder="选择属性"
                                        onChange={(_, option) => {
                                            setStepTwoSelectProperty({
                                                categoryIndex: option.categoryIndex,
                                                categoryName: option.value,
                                                categoryType: option.type
                                            });
                                        }}
                                        options={
                                            propertyData.sheetList?.[sheetIndex] &&
                                            propertyData.sheetList?.[sheetIndex].categoryList.map(
                                                (item) => {
                                                    return {
                                                        value: item.categoryName,
                                                        label: item.categoryName,
                                                        type: item.categoryType,
                                                        categoryIndex: item.categoryIndex
                                                    };
                                                }
                                            )
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </>
            ),
            // disabled: !isUpload,
            buttonName: "下一步"
        },
        type === 1
            ? {
                title: "选择属性",
                content: (
                    <div>
                        当前表格为：{propertyData.fileName}
                        <div>
                            <span>选择属性</span>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{width: "80%"}}
                                placeholder="选择属性"
                                onChange={(_, option) => {
                                    setStepThrSelectPropertyList(
                                        option.map((item) => ({
                                            categoryIndex: item.categoryIndex,
                                            categoryName: item.value,
                                            categoryType: item.type
                                        }))
                                    );
                                }}
                                options={
                                    propertyData.sheetList?.[sheetIndex] &&
                                    propertyData.sheetList?.[sheetIndex].categoryList.map(
                                        (item) => {
                                            // if (
                                            //   !stepTwoSelectProperty ||
                                            //   item.categoryIndex !==
                                            //     stepTwoSelectProperty.categoryIndex
                                            // ) {
                                            return {
                                                value: item.categoryName,
                                                label: item.categoryName,
                                                type: item.categoryType,
                                                categoryIndex: item.categoryIndex
                                            };
                                            // }
                                        }
                                    )
                                }
                            />
                        </div>
                    </div>
                ),
                disabled: !selectList,
                buttonName: "完成"
            }
            : {
                title: "对应标签",
                content: (
                    <>
                        <div>
                            当前表格为：{propertyData.fileName}
                            <div>
                                {sheetIndex >= 0 ? (
                                    <>
                      <span>
                        选择导入数据行数,总计
                          {propertyData.sheetList?.[sheetIndex].dataLine}
                          条数据
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
                            <Button
                                onClick={() => {
                                    setStepThrList([...stepThrList, {}]);
                                }}
                            >
                                新增一组
                            </Button>
                            {stepThrList.map((item, index) => (
                                <>
                                    <div style={{display: "flex"}}>
                                        <span>选择字段：</span>
                                        <Select
                                            allowClear
                                            style={{width: "30%"}}
                                            placeholder="选择属性"
                                            onChange={(_, option) => {
                                                stepThrList[index].link = {
                                                    linkComment: option.value,
                                                    linkId: option.linkId,
                                                    connectionId: option.connectionId,
                                                    linkType: option.linkType
                                                };
                                                setStepThrList([...stepThrList]);
                                            }}
                                            options={linkList.map((item) => ({
                                                label: item.linkComment,
                                                value: item.linkComment,
                                                linkId: item.linkId,
                                                connectionId: item.connectionId,
                                                linkType: item.linkType
                                            }))}
                                        />
                                    </div>
                                    <div>
                                        <span>选择属性:</span>
                                        <Select
                                            allowClear
                                            style={{width: "30%"}}
                                            placeholder="选择属性"
                                            onChange={(_, option) => {
                                                stepThrList[index].property = {
                                                    categoryIndex: option.categoryIndex,
                                                    categoryName: option.value,
                                                    categoryType: option.type
                                                };
                                                setStepThrList([...stepThrList]);
                                            }}
                                            options={
                                                propertyData.sheetList?.[sheetIndex] &&
                                                propertyData.sheetList?.[sheetIndex].categoryList.map(
                                                    (item) => {
                                                        return {
                                                            value: item.categoryName,
                                                            label: item.categoryName,
                                                            type: item.categoryType,
                                                            categoryIndex: item.categoryIndex
                                                        };
                                                    }
                                                )
                                            }
                                        />
                                    </div>
                                    <Button
                                        onClick={() => {
                                            const temp = stepThrList[index];
                                            const params = {
                                                categoryIndex: temp.property.categoryIndex,
                                                categoryName: temp.property.categoryName,
                                                linkId: temp.link.linkId
                                            };
                                            setUpdateCategoriesList([
                                                ...updateCategoriesList,
                                                params
                                            ]);
                                        }}
                                    >
                                        点击添加
                                    </Button>
                                </>
                            ))}
                        </div>
                    </>
                ),
                disabled: !selectList,
                buttonName: "完成"
            }
    ];

    return (
        <>
            <Steps current={stepIndex} items={stepItems}/>
            <div style={{marginTop: 16}}>{stepItems[stepIndex].content}</div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                {stepIndex === 0 && (
                    <Button
                        style={{marginRight: "20px"}}
                        onClick={() => {
                            props.setIsConnectionModalOpen(false);
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
