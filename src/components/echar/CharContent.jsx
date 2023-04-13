import { theme } from "antd";
import styles from "@/styles/ShowDataRegion.module.scss";
import ShowProperty from './ShowProperty';
import PropertyGroup from './PropertyGroup';
import BasicBar from './BasicBar';

export default function CharContent(props) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      className={styles.site_layout_content_show}
    >
      <div>这里是任务名</div>
      <ShowProperty />
      {/* <PropertyGroup /> */}
      {/* <BasicBar /> */}
    </div>
  );
}
