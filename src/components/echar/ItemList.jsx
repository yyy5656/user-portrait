import { Button, theme, Row, Col, List, message } from "antd";
import { TagOutlined, SendOutlined } from "@ant-design/icons";

import styles from "@/styles/ItemList.module.scss";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { charTypeName, addViewType } from "./constant";

// props里面要包含是否有修改权限
export default function ItemList(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { newView } = props;
  const [list, setList] = useState([]);

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
      setList(newList);
    });
    return () => {
      setList([]);
    };
  }, []);

  useEffect(() => {
    if (newView) {
      setList([...list, newView]);
    }
  }, [newView]);

  const deleteChar = (id, index) => {
    list.splice(index, 1);
    setList([...list]);
    api.deleteViewInfo({ viewId: id }).then((res) => {
      message.success("删除成功");
      props.deleteViewInfo(id);
    });
  };

  // const addCharList = (value) => {};

  const changeStatus = (index, status, newlist) => {
    const item = [...list];
    item[index].status = status;
    setList([...item]);
    console.log(list);
    console.log(item);
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
                        {/* {openStatus[item.status].statusText} */}
                        {item.status}
                      </div>
                      <Button
                        className={styles.open_button}
                        type={"primary"}
                        size={"small"}
                        onClick={() => {
                          console.log(list[index]);
                          props.changeViewInfo(true, list[index]);
                        }}
                      >
                        修改
                      </Button>
                      <Button
                        className={styles.open_button}
                        type={"primary"}
                        size={"small"}
                        onClick={() => {
                          if (item.status === "close") {
                            changeStatus(index, "open");
                            props.addViewChar(addViewType.open_view, item);
                          } else {
                            changeStatus(index, "close");
                            props.deleteViewInfo(item.viewId);
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
                          deleteChar(item.viewId, index);
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
