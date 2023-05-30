import { useState, useEffect, useRef } from "react";
import {
  Button,
  Collapse,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import {
  DownOutlined,
  RollbackOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "../../styles/Manage.module.scss";
import deleteConnection from "../../utils/deleteConnection";
import ShowTable from "../manage/ShowTable";
import AddData from "./AddData";
import AddProperty from "./AddProperty";
import api from "../../utils/api";

export default function Manage(props) {
  // hooks
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isOpenAddDataModal, setIsOpenAddDataModal] = useState();
  const [isOpenAddPropertyModal, setIsOpenAddPropertyModal] = useState();
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);
  const [importDataSource, setImportDataSource] = useState([]);

  // state
  const [types, setTypes] = useState([[], []]); // 渲染的属性列表
  const [typeState, setTypeState] = useState(null); // 要传给table的type数据
  const [clickedSearchType, setClickedSearchType] = useState("???"); // 目前显示的搜索部分框字段
  const [keyWord, setKeyWord] = useState(null); //搜索关键词对象
  const [isSearching, setIsSearching] = useState(false);

  // ref
  const typeRef = useRef(null); // 用以缓存未处理的type数据

  // props
  const { linkList, isLoading } = props;
  // methods
  /**
   * 获取属性类别
   */
  const getTypes = async () => {
    const res = await api.getLinksByType({});
    let output = [[], []];
    typeRef.current = Object.values(res.data.data);
    setTypeState(Object.values(res.data.data));
    Object.values(res.data.data).forEach((value, index) => {
      value.forEach((value2) => {
        output[index].push(value2.linkComment);
      });
    });
    setTypes(output);
  };

  /**
   * 转换属性类别
   * @param target
   * @param fromWhere
   */
  const changeType = (target, fromWhere) => {
    const findResult = typeRef.current[fromWhere].find((value) => {
      return value.linkComment === target;
    });
    api.changeLinkType(findResult).then(
      () => {
        getTypes();
      },
      (err) => {
        console.error(err);
      }
    );
  };
  /**
   * 生成搜索框列表
   * @type {{label: string, key: string}[]}
   */
  const getItems = linkList.map((value) => {
    return {
      label: value.linkComment,
      key: value.linkId.toString(),
    };
  });

  /**
   * 点击后切换字段
   * @param e
   */
  const handleMenuClick = (e) => {
    setClickedSearchType(
      linkList.find((value) => {
        return value.linkId.toString() === e.key;
      })
    );
  };

  // Dropdown列表菜单
  const menu = {
    items: getItems,
    onClick: handleMenuClick,
  };

  /**
   * 搜索指定字段内容
   * @param queryData
   */
  const searchData = (queryData) => {
    if (!queryData.searchName) {
      //* 无搜索关键字
      setKeyWord(null);
      message.info("请输入要检索的内容");
    } else if (!clickedSearchType) {
      message.info("请选择要检索的属性");
    } else {
      setIsSearching(true);
      //* 搜索关键字
      setKeyWord({
        linkId: clickedSearchType.linkId,
        value: queryData.searchName,
      });
    }
  };

  const cancelSearch = () => {
    setKeyWord(null);
    setIsSearching(false);
  };

  useEffect(() => {
    getTypes();
    return () => {
      setTypes([[], []]);
      setClickedSearchType(null);
    };
  }, [props.linkList]);

  return (
    <div className={styles.site_layout_content_show}>
      <div className={styles.title}>
        <span>{props.missionName.current}</span>
        <Button
          onClick={() => {
            deleteConnection(props.connectionId.current, [
              props.resetLinks,
              props.fetchData,
            ]);
          }}
          className={styles.delete_connection_btn}
        >
          删除任务
        </Button>
      </div>
      <div className={styles.property_box}>
        <div className={styles.property_type}>属性类别（点击切换标签类别）</div>
        <div className={styles.btn_box}>
          <Button
            onClick={() => {
              setIsOpenAddPropertyModal(true);
            }}
          >
            导入
          </Button>
          <Button
            className={styles.import_data_btn}
            onClick={() => {
              api.getAddInfo().then((res) => {
                setImportDataSource(
                  res.data.data.map((item) => {
                    const addData = JSON.parse(item.addData);
                    return {
                      unImportDataList: addData.unImportDataList,
                      unMatchPrimaryKey: addData.unMatchPrimaryKey,
                      addTime: item.addTime,
                      connectionId: item.connectionId,
                      addId: item.addId,
                    };
                  })
                );
                setIsOpenImportModal(true);
              });
            }}
          >
            导入记录
          </Button>
        </div>
      </div>
      <Collapse
        expandIconPosition="end"
        style={{ backgroundColor: colorBgContainer }}
      >
        <Collapse.Panel
          key={1}
          header={
            <>
              <span className={styles.collapse_panel_span}>名词类</span>
              {types[1].slice(0, 5).map((value, index) => {
                return <Tag key={index}>{value}</Tag>;
              })}
            </>
          }
        >
          {types[1].map((value, index) => {
            return (
              <Tag
                color="#6e84c9"
                style={{
                  padding: "3px 15px",
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  Modal.confirm({
                    title: (
                      <span style={{ fontWeight: 400 }}>
                        是否切换
                        <span style={{ fontWeight: 700 }}> {value} </span>到
                        <span style={{ fontWeight: 700 }}> 数值类 </span>？
                      </span>
                    ),
                    okText: "确定",
                    cancelText: "取消",
                    onOk() {
                      changeType(value, 1);
                    },
                  });
                }}
              >
                {value}
              </Tag>
            );
          })}
        </Collapse.Panel>
        <Collapse.Panel
          key={2}
          header={
            <>
              <span className={styles.collapse_panel_span}>数值类</span>
              {types[0].slice(0, 5).map((value, index) => {
                return <Tag key={index}>{value}</Tag>;
              })}
            </>
          }
        >
          {types[0].map((value, index) => {
            return (
              <Tag
                color="#6e84c9"
                style={{
                  padding: "3px 15px",
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  Modal.confirm({
                    title: (
                      <span style={{ fontWeight: 400 }}>
                        是否切换
                        <span style={{ fontWeight: 700 }}> {value} </span>到
                        <span style={{ fontWeight: 700 }}> 名词类 </span>？
                      </span>
                    ),
                    okText: "确定",
                    cancelText: "取消",
                    onOk() {
                      changeType(value, 0);
                    },
                  });
                }}
              >
                {value}
              </Tag>
            );
          })}
        </Collapse.Panel>
      </Collapse>
      <div className={styles.show_data_box}>
        <div className={styles.show_data_title}>数据展示</div>
        <Button
          size={"small"}
          type={"primary"}
          className={styles.plus_btn}
          onClick={() => {
            setIsOpenAddDataModal(true);
          }}
        >
          +
        </Button>
        <Form className={styles.search_bigbox} onFinish={searchData}>
          <Form.Item>
            <Dropdown menu={menu} className={styles.dropdown}>
              <Button>
                <Space>
                  {clickedSearchType ? clickedSearchType.linkComment : "请选择"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Form.Item>
          <Form.Item name={"searchName"}>
            <Input
              className={styles.search_box}
              placeholder={"你想查询的内容..."}
            />
          </Form.Item>
          <Button
            className={styles.search_btn}
            style={{ marginRight: "10px" }}
            type={"primary"}
            htmlType={"submit"}
          >
            <SearchOutlined />
          </Button>
          <Button
            className={styles.search_btn}
            type={"primary"}
            danger={true}
            disabled={!isSearching}
            onClick={cancelSearch}
          >
            <RollbackOutlined />
          </Button>
        </Form>
      </div>
      <ShowTable
        keyWord={keyWord && keyWord}
        types={typeState ? typeState : null}
      />
      <AddData
        linkList={linkList}
        isOpenAddDataModal={isOpenAddDataModal}
        setIsOpenAddDataModal={setIsOpenAddDataModal}
      />
      <AddProperty
        connectionId={props.connectionId}
        isOpenAddPropertyModal={isOpenAddPropertyModal}
        setIsOpenAddPropertyModal={setIsOpenAddPropertyModal}
      />
      <Modal
        title="导入记录"
        footer={null}
        open={isOpenImportModal}
        width={900}
        onCancel={() => {
          setIsOpenImportModal(false);
        }}
      >
        <Table
          className={styles.table_div}
          rowKey={(e) => e.addId}
          size="small"
          style={{ minHeight: 200 }}
          pagination={false}
          dataSource={[...importDataSource]}
          columns={[
            {
              title: "添加时间",
              dataIndex: "addTime",
              key: "addTime",
              width: "25%",
            },
            {
              title: "未导入数据信息",
              dataIndex: "unImportDataList",
              key: "unImportDataList",
              render: (text) => {
                const len = text[0].unImportData.length;
                return (
                  <table
                    style={{
                      borderRadius: 0,
                      border: "0.5px solid",
                      borderColor: "rgb(214 214 214)",
                    }}
                    className={styles.table_hand}
                    border={1}
                    cellpadding={1}
                  >
                    <tr>
                      <th width="20%">主键</th>
                      <th colspan={len} style={{ textAlign: "center" }}>
                        数据
                      </th>
                    </tr>
                    {text.map((item, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>
                          {item.primaryKey}
                        </td>
                        {item.unImportData.map((e, index) => (
                          <td
                            style={{ minWidth: "10px", textAlign: "center" }}
                            key={index}
                            border={1}
                          >
                            {e}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </table>
                );
              },
            },
            {
              title: "数据库未匹配",
              dataIndex: "unMatchPrimaryKey",
              key: "unMatchPrimaryKey",
              width:"15%",
              render: (text) => {
                return (
                  <table
                    border={1}
                    cellpadding={1}
                    className={styles.table_hand}
                    style={{
                      borderRadius: 0,
                      border: "0.5px solid",
                      borderColor: "rgb(214 214 214)",
                    }}
                  >
                    {text.map((item, index) => (
                      <tr key={index}>
                        <td style={{ minWidth: "10px", textAlign: "center" }}>
                          {item}
                        </td>
                      </tr>
                    ))}
                  </table>
                );
              },
            },
          ]}
        />
      </Modal>
    </div>
  );
}
