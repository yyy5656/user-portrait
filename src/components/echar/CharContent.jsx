import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "@/components/echar/ShowProperty";
import ItemList from "@/components/echar/ItemList";
import PropertyGroup from "@/components/echar/PropertyGroup"
import BasicBar from "@/components/echar/BasicBar";

export default function CharContent(props) {
    return (
        <div
            className={styles.site_layout_content_show}
        >
            <div className={styles.title}>这里是任务名</div>
            <ShowProperty/>
            <ItemList/>
            {/*<PropertyGroup/>*/}
            {/*<BasicBar />*/}
        </div>
    );
}
