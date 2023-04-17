import { Modal, Button, Select, Input } from "antd";
import styles from "@/styles/BasicBar.module.scss";
import { useEffect, useRef, useState } from "react";
import api from "@/utils/api";
import DataGroup from "./DataGroup";
import IntervalDataGroup from "./IntervalDataGroup";
import { charTypeConfig, charType } from "./constant";

export default function AddChar(props) {
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectCharType, setSelectCharType] = useState();
  // 属性分组
  const [propertyList, setPropertyList] = useState({});
  // 选中的属性类型 是名词还是区间
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

  const handleClick = () => {
    // 点击后请求属性
    setIsModalOpen(true);
    api.getLinksByType().then((res) => {
      if (res.status === 200 && res.data.data) {
        setPropertyList(res.data.data);
      }
    });
  };

  const handleChange = (value, option) => {
    console.log(value);
    console.log(option);
    // 1调用getNouns
    const { type } = option;
    setSelectLinkType(type);
    setSelectProperty([
      {
        linkId: option.value,
        linkComment: option.label,
        connectionId: props.connectionId,
        linkType: type,
      },
    ]);
    if (type === linkType.intervalLink) {
      // api.getNumerical({});
    } else if (type === linkType.singleLink) {
      api
        .getNouns({
          linkId: option.value,
          linkComment: option.label,
          connectionId: props.connectionId,
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

  useEffect(() => {
    return () => {
      setSelectCharType(null);
    };
  }, []);

  return (
    <>
      <Button style={{ marginTop: "20px" }} onClick={handleClick}>
        生成图表
      </Button>

      <Modal
        title="生成图表"
        open={isModalOpen}
        destroyOnClose={true}
        onOk={() => {
          setIsModalOpen(false);
          if (selectCharType === charTypeConfig.pie) {
            props.addCharList({
              name,
              type: selectCharType,
              property: selectProperty,
              data: charData,
            });
          } else if (
            selectCharType === charTypeConfig.bar ||
            selectCharType === charTypeConfig.line
          ) {
            props.addCharList({
              name,
              type: selectCharType,
              property: selectProperty,
              data: charData,
            });
          }
        }}
        onCancel={() => {
          setSelectCharType(null);
          setIsModalOpen(false);
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
        {selectCharType === charTypeConfig.pie && (
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
            {selectLinkType ? (
              selectProperty ? (
                <DataGroup
                  charData={originCharData}
                  changeCharListGroup={changeCharListGroup}
                />
              ) : null
            ) : (
              <IntervalDataGroup selectProperty={selectProperty} />
            )}
          </>
        )}
        {(selectCharType === charTypeConfig.bar ||
          selectCharType === charTypeConfig.line) && (
          <>
            <div>
              选择属性：
              <Select
                // mode="multiple"
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
          </>
        )}
      </Modal>
    </>
  );
}
