import { theme } from "antd";
import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import ItemList from "@/components/echar/ItemList";
import BasicBar from "./BasicBar";
import { useState } from "react";
import { charListData } from "./constant";

export default function CharContent(props) {
  console.log(props);
  const [charList, setCharList] = useState([]);

  const addCharList = (value) => {
    setCharList([value, ...charList]);
  };

  const deleteViewInfo = (index) => {
    debugger
    console.log(charList.splice(index, 1));
    setCharList(charList.splice(index, 1))
  };

  const handlePropsData = () => {
    return props.linkList.map((value) => {
      return value.linkComment;
    });
  };

  console.log(props);
  return (
    <div className={styles.site_layout_content_show}>
      <div className={styles.content_title}>{props.missionName.current}</div>
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
