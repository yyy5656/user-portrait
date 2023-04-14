import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "@/components/echar/ShowProperty";
import ItemList from "@/components/echar/ItemList";
import PropertyGroup from "@/components/echar/PropertyGroup";
import BasicBar from "@/components/echar/BasicBar";

export default function CharContent(props) {

    const handlePropsData = () => {
        return props.linklist.map((value) => {
            return value.linkComment;
        });
    };

    return (
        <div
            className={styles.site_layout_content_show}
        >
            <div className={styles.title}>{props.missionName.current}</div>
            <ShowProperty property={handlePropsData()}/>
            <ItemList/>
            {/*<PropertyGroup/>*/}
            {/*<BasicBar />*/}
        </div>
    );
}
