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

  const addCharList = (value) => {
    setCharList([value, ...charList]);
  };

  const deleteViewInfo = (index) => {
    debugger;
    console.log(charList.splice(index, 1));
    setCharList(charList.splice(index, 1));
  };

  const handlePropsData = () => {
    return props.linklist.map((value) => {
      return value.linkComment;
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
      <ItemList charList={charList} addCharList={addCharList} />
      <AddChar connectionId={props.connectionId} addCharList={addCharList} />
      {charList.length
        ? charList.map((item, index) => {
            return (
              <BasicBar
                key={index}
                index={index}
                charOption={item.viewData}
                deleteViewInfo={deleteViewInfo}
              />
            );
          })
        : null}
    </div>
  );
}
