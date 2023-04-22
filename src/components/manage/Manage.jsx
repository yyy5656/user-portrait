import styles from "@/styles/Manage.module.scss";
import {
  Button,
  Collapse,
  Dropdown,
  Input,
  message,
  Space,
  Tag,
  theme,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import deleteConnection from "@/utils/deleteConnection";
import ShowTable from "@/components/manage/ShowTable";
import AddData from "./AddData";
import AddProperty from "./AddProperty";
import { useState, useEffect } from "react";
import api from "@/utils/api";

export default function Manage(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isOpenAddDataModal, setIsOpenAddDataModal] = useState();
  const [isOpenAddPropertyModal, setIsOpenAddPropertyModal] = useState();
  const [linkList, setLinklist] = useState([]);

  const fetchData = async () => {
    const linkRes = await api.getLink();
    if (linkRes.status === 200 && linkRes.data) {
      setLinklist(linkRes.data.data.links);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const items = [
    {
      label: "sadfsad",
      key: "1",
    },
    {
      label: "sdafsa",
      key: "2",
    },
  ];

  const test = ["a", "b", "c", "d", "e", "f"];

  const handleMenuClick = (e) => {
    message.info("click!");
    console.log("click", e);
  };

  const menu = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className={styles.site_layout_content_show}>
      <div className={styles.title}>
        <span>{props.missionName.current}</span>
        <Button
          onClick={() => {
            deleteConnection(props.connectionId.current, props.fetchData);
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
          <Button className={styles.import_data_btn}>导入数据</Button>
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
              {test.slice(0, 5).map((value, index) => {
                return <Tag key={index}>{value}</Tag>;
              })}
            </>
          }
        >
          {test.map((value, index) => {
            return (
              <Tag
                color="#6e84c9"
                style={{ padding: "3px 15px", marginBottom: "5px" }}
                key={index}
                onClick={() => {
                  console.log(1.1);
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
              {test.slice(0, 5).map((value, index) => {
                return <Tag key={index}>{value}</Tag>;
              })}
            </>
          }
        >
          {test.map((value, index) => {
            return (
              <Tag
                color="#6e84c9"
                style={{ padding: "3px 15px", marginBottom: "5px" }}
                key={index}
                onClick={() => {
                  console.log(2.1);
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
        <div className={styles.search_bigbox}>
          <Dropdown menu={menu} className={styles.dropdown}>
            <Button>
              <Space>
                姓名
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Input
            className={styles.search_box}
            placeholder={"你想查询的内容..."}
          />
          <Button className={styles.search_btn} type={"primary"}>
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <ShowTable />
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
    </div>
  );
}
