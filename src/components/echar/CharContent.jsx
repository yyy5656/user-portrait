import {theme} from "antd";
import styles2 from "@/styles/ShowDataRegion.module.scss";
import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import PropertyGroup from "./PropertyGroup";
import BasicBar from "./BasicBar";
import ItemList from "@/components/echar/ItemList";

export default function CharContent(props) {
    const {
        token: {colorBgContainer}
    } = theme.useToken();

    return (
        <div
            className={styles2.site_layout_content_show}
        >
            <div className={styles.title}>这里是任务名</div>
            <ShowProperty/>
            <ItemList/>
            {/*<PropertyGroup/>*/}
            {/*<BasicBar />*/}
        </div>
    );
}
