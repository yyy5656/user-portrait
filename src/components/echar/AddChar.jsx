import { Modal, Button, Select, Input, message } from "antd";
import styles from "@/styles/BasicBar.module.scss";
import { useEffect, useRef, useState } from "react";
import api from "@/utils/api";
import DataGroup from "./DataGroup";
import IntervalDataGroup from "./IntervalDataGroup";
import { charTypeConfig, charType } from "./constant";

export default function AddChar(props) {
  const { propertyList } = props;
  // const [isModalOpen, setIsModalOpen] = useState();
  const [selectCharType, setSelectCharType] = useState();

  // 选中的属性类型 是名词还是区间 0/1
  const [selectLinkType, setSelectLinkType] = useState();
  // 名词性的属性的键值数组
  const [singleLinkList, setSingleLinkList] = useState([]);
  // 选中的单个属性
  const [selectProperty, setSelectProperty] = useState();

  const [name, setName] = useState();
  const [charData, setCharData] = useState();
  const [originCharData, setOriginCharData] = useState([]);

  const linkType = {
    singleLink: 1,
    intervalLink: 0,
  };

  const handleModalOkClick = () => {
    if (name && selectProperty.length && selectCharType && charData) {
      if (
        selectCharType === charTypeConfig.line ||
        selectCharType === charTypeConfig.bar
      ) {
        const newData = {
          xAxisData: Object.keys(charData),
          yAxisData: Object.values(charData).map((item) => item.value),
        };
        addCharOption({
          name,
          type: selectCharType,
          property: selectProperty,
          data: newData,
        });
      } else {
        addCharOption({
          name,
          type: selectCharType,
          property: selectProperty,
          data: charData,
        });
      }
      props.setIsModalOpen(false);
    } else if (selectLinkType === linkType.intervalLink && !charData) {
      message.info("请选择分组");
    } else {
      message.info("请完善信息");
    }
  };

  // 根据属性获取数据
  const handleChange = (value, option) => {
    // 1调用getNouns
    const { type } = option;
    setSelectLinkType(type);
    setSelectProperty([
      {
        linkId: option.value,
        linkComment: option.label,
        connectionId: props.connectionId.current,
        linkType: type,
      },
    ]);
    if (type === linkType.singleLink) {
      api
        .getNouns({
          linkId: option.value,
          linkComment: option.label,
          connectionId: props.connectionId.current,
          linkType: option.type,
        })
        .then((res) => {
          const data = res.data.data;
          if (selectCharType === charTypeConfig.pie) {
            const newData = Object.keys(data).map((key) => ({
              name: key,
              value: data[key],
            }));
            setOriginCharData(newData);
            setCharData(newData);
          } else if (
            selectCharType === charTypeConfig.bar ||
            selectCharType === charTypeConfig.line
          ) {
            const newData = {
              xAxisData: Object.keys(data),
              yAxisData: Object.values(data),
            };
            setCharData(newData);
          }
        });
    }
  };

  const changeCharListGroup = (value) => {
    console.log(value);
    value.length && setCharData(value);
  };

  const addCharOption = (option) => {
    api.insertViewInfo({ viewData: JSON.stringify(option) }).then((res) => {
      console.log(res);
      const viewId = res.data.msg;
      props.addViewChar({ viewData: option }, Number(viewId));
    });
  };

  useEffect(() => {
    return () => {
      setSelectCharType(null);
      setSelectLinkType(null);
    };
  }, []);

  return (
    <>
      <Modal
        title="生成图表"
        open={props.isModalOpen}
        destroyOnClose={true}
        onOk={handleModalOkClick}
        onCancel={() => {
          setSelectCharType(null);
          props.setIsModalOpen(false);
        }}
        okText="生成"
        cancelText="取消"
        width={600}
      >
        <div>
          <span>输入图表名称：</span>
          <Input
            placeholder="输入图表名称"
            style={{ width: "300px", marginLeft: "20px" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          生成图表类型:
          <Select
            style={{ width: 300, marginLeft: "20px" }}
            onChange={(value) => {
              setSelectCharType(value);
            }}
            options={charType}
          />
        </div>
        {selectCharType && (
          <>
            <div>
              选择属性：
              <Select
                style={{ width: 200 }}
                onChange={handleChange}
                options={[
                  {
                    label: "区间性属性",
                    key: 0,
                    options:
                      propertyList[0] &&
                      propertyList[0].map((item) => ({
                        label: item.linkComment,
                        value: item.linkId,
                        type: linkType.intervalLink,
                      })),
                  },
                  {
                    label: "名词性属性",
                    key: 1,
                    options:
                      propertyList[1] &&
                      propertyList[1].map((item) => ({
                        label: item.linkComment,
                        value: item.linkId,
                        type: linkType.singleLink,
                      })),
                  },
                ]}
              />
            </div>

            {selectLinkType === linkType.singleLink &&
              (selectProperty ? (
                <DataGroup
                  charData={originCharData}
                  changeCharListGroup={changeCharListGroup}
                />
              ) : null)}
            {selectLinkType === linkType.intervalLink && (
              <IntervalDataGroup
                selectProperty={selectProperty}
                changeCharListGroup={changeCharListGroup}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
}
