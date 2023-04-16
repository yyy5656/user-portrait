import { theme } from "antd";
import styles from "@/styles/ShowDataRegion.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import PropertyGroup from "./PropertyGroup";
import BasicBar from "./BasicBar";
import { useState } from "react";
import { charListData } from "./constant";

export default function CharContent(props) {
  const [charList, setCharList] = useState([]);
  const addCharList = (value) => {
    setCharList([...charList, value]);
  };

  console.log(props);
  return (
    <div className={styles.site_layout_content_show}>
      <div>这里是任务名</div>
      <ShowProperty />
      {/* <PropertyGroup /> */}
      <AddChar connectionId={props.connectionId} addCharList={addCharList} />
      {charList.length
        ? charList.map((item, index) => {
            return <BasicBar key={index} charOption={item} />;
          })
        : null}
    </div>
  );
}
