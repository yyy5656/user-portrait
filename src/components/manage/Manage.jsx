import { theme } from "antd";
import styles from "@/styles/ShowDataRegion.module.scss";
import BasicBar from "./echar/BasicBar";
import ShowProperty from "./ShowProperty";
import PropertyGroup from "./PropertyGroup";

export default function ShowDataRegion(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      className={styles.site_layout_content_show}
    >
      <div className={styles.property_containe} style={{display:'flex'}}>
        <ShowProperty linkList={props.linkList} />
        <PropertyGroup linkList={props.linkList}/>
      </div>

      <BasicBar linkList={props.linkList}/>
    </div>
  );
}
