import {Button, message, Modal} from "antd";

const {confirm} = Modal;
import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import ItemList from "@/components/echar/ItemList";
import BasicBar from "./BasicBar";
import {useState} from "react";
import {charListData} from "./constant";
import deleteConnection from "@/utils/deleteConnection";
import api from "@/utils/api";

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

    return (
        <div className={styles.site_layout_content_show}>
            <div className={styles.title}>
                <span>{props.missionName.current}</span>
                <Button
                    onClick={() => {deleteConnection(props.connectionId.current, props.fetchData);}}
                    className={styles.delete_connection_btn}
                >删除任务</Button></div>
            <ShowProperty property={handlePropsData()}/>
            <ItemList/>
            <AddChar connectionId={props.connectionId} addCharList={addCharList}/>
            {charList.length
                ? charList.map((item, index) => {
                    return <BasicBar key={index} charOption={item}/>;
                })
                : null}
        </div>
    );
}
