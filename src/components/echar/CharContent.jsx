import { theme } from "antd";
import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import ItemList from "@/components/echar/ItemList";
import BasicBar from "./BasicBar";
import { useState } from "react";
import { charListData } from "./constant";

export default function CharContent(props) {
  const [charList, setCharList] = useState([]);
  const addCharList = (value) => {
    setCharList([...charList, value]);
  };
  const handlePropsData = () => {
    return props.linklist.map((value) => {
      return value.linkComment;
    });
  };

  console.log(props);
  return (
    <div className={styles.site_layout_content_show}>
        <div className={styles.title}>{props.missionName.current}</div>
      <ShowProperty property={handlePropsData()} />
      <ItemList />
      <AddChar connectionId={props.connectionId} addCharList={addCharList} />
      {charList.length
        ? charList.map((item, index) => {
            return <BasicBar key={index} charOption={item} />;
          })
        : null}
    </div>
  );
}
