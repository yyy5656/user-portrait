import { Button, message, Modal } from "antd";

const { confirm } = Modal;
import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import ItemList from "@/components/echar/ItemList";
import BasicBar from "./BasicBar";
import { useState } from "react";
import { charListData } from "./constant";
import deleteConnection from "@/utils/deleteConnection";
import api from "@/utils/api";

export default function CharContent(props) {
  console.log(props);
  const [charList, setCharList] = useState([]);
  const [newlist, setNewList] = useState();
  // 属性分组
  const [propertyList, setPropertyList] = useState({});
  const [isModalOpen, setIsModalOpen] = useState();

  // 增加图表
  const addViewChar = (value, viewId) => {
    console.log(value);
    setNewList({
      connectionId: props.connectionId.current,
      status: "open",
      viewData: value.viewData,
      viewId,
    });
    setCharList([value, ...charList]);
  };

  // 删除图表
  const deleteViewChar = (viewId) => {
    let idx = null;
    charList.forEach((item, index) => {
      if (viewId === item.viewId) {
        idx = index;
      }
    });
    charList.splice(idx, 1);
    setCharList([...charList]);
  };

  const handlePropsData = () => {
    return props.linklist.map((value) => {
      return value.linkComment;
    });
  };

  // 生成图表
  const handleClick = () => {
    // 点击后请求属性
    setIsModalOpen(true);
    api.getLinksByType().then((res) => {
      if (res.status === 200 && res.data.data) {
        setPropertyList(res.data.data);
      }
    });
  };

  console.log(props);
  return (
    <div className={styles.site_layout_content_show}>
      <div className={styles.title}>
        <span>{props.missionName.current}</span>
        {/* TODO: 这里需要删除任务吗 */}
        <Button
          onClick={() => {
            deleteConnection(props.connectionId.current, props.fetchData);
          }}
          className={styles.delete_connection_btn}
        >
          删除任务
        </Button>
      </div>
      <ShowProperty property={handlePropsData()} />
      <ItemList
        charList={charList}
        addViewChar={addViewChar}
        deleteViewInfo={deleteViewChar}
        newlist={newlist}
      />
      <Button style={{ marginTop: "20px" }} onClick={handleClick}>
        生成图表
      </Button>
      <AddChar
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        connectionId={props.connectionId}
        addViewChar={addViewChar}
        propertyList={propertyList}
      />
      {charList.length
        ? charList.map((item, index) => {
            return (
              <BasicBar
                key={index}
                viewId={item.viewId}
                charOption={item.viewData}
                deleteViewChar={deleteViewChar}
              />
            );
          })
        : null}
    </div>
  );
}
