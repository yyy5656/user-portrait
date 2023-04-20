import { Button, theme, Row, Col } from "antd";
import { TagOutlined, SendOutlined } from "@ant-design/icons";

import styles from "@/styles/ItemList.module.scss";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { charTypeName } from "./constant";

// props里面要包含是否有修改权限
export default function ItemList(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("close");

  const openStatus = {
    open: {
      btnText: "关闭",
      statusText: "已打开",
    },
    close: {
      btnText: "打开",
      statusText: "已关闭",
    },
  };

  useEffect(() => {
    api.getViewInfo().then((res) => {
      console.log(res.data.data);
      const newList = res.data.data.map((item) => ({
        viewData: JSON.parse(item.viewData),
        viewId: item.viewId,
        connectionId: item.connectionId,
        status: "close",
      }));
      console.log(newList);
      // console.log(JSON.parse(res.data.data));
      setList(newList);
    });
    return () => {
      setList([]);
    };
  }, [props.charList]);

  const deleteChar = (id) => {
    api.deleteViewInfo({ viewId: id });
  };

  const changeStatus = (index, status) => {
    const item = [...list];
    item[index].status = status;
    setList(item);
    console.log(list);
  };

  return (
    <>
      <div className={styles.container}>
        <Row gutter={[4, 8]}>
          {list.map((item, index) => (
            <Col key={item.viewId}>
              <div key={index} className={styles.item_big_box}>
                <div
                  style={{ backgroundColor: colorBgContainer }}
                  className={styles.item_box}
                >
                  <div>
                    <div className={styles.table_name}>
                      {item.viewData.name}
                    </div>
                    <div className={styles.table_information}>
                      <span style={{ margin: "0 1vw" }}>
                        <TagOutlined />
                      </span>
                      {charTypeName[item.viewData.type]}
                    </div>
                    <div>
                      <span style={{ margin: "0 1vw" }}>
                        <SendOutlined />
                      </span>
                      {item.viewData.property.map((item) => (
                        <span style={{ marginRight: "10px" }} key={item.value}>
                          {item.linkComment}
                        </span>
                      ))}
                    </div>
                    <div className={styles.last_line}>
                      <div
                        className={styles.status_light}
                        style={{ backgroundColor: "#80ad97" }}
                      />
                      <div className={styles.open_status}>
                        {openStatus[item.status].statusText}
                      </div>
                      <Button
                        className={styles.open_button}
                        type={"primary"}
                        size={"small"}
                      >
                        修改
                      </Button>
                      <Button
                        className={styles.open_button}
                        type={"primary"}
                        size={"small"}
                        onClick={() => {
                          if (status === "close") {
                            changeStatus(index, "open");
                            props.addCharList(item);
                          } else {
                            setStatus("close");
                            deleteChar(item.viewId);
                          }
                        }}
                      >
                        {openStatus[item.status].btnText}
                      </Button>
                      <Button
                        className={styles.open_button}
                        type={"primary"}
                        size={"small"}
                        onClick={() => {
                          deleteChar(item.viewId);
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <div className={styles.count_items}>共{list.length}条数据</div>
    </>
  );
}
