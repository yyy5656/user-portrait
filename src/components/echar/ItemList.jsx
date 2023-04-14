import {Button, theme} from "antd";
import {TagOutlined, SendOutlined} from "@ant-design/icons";

import styles from "@/styles/ItemList.module.scss";

export default function ItemList(props) {

    const {
        token: {colorBgContainer}
    } = theme.useToken();

    return (
        <>
            <div className={styles.item_big_box}>
                <div
                    style={{backgroundColor: colorBgContainer}}
                    className={styles.item_box}
                >
                    <div>
                        <div className={styles.table_name}>自定义图名称</div>
                        <div className={styles.table_information}>
                            <span style={{margin: "0 1vw"}}><TagOutlined/></span>扇形图
                        </div>
                        <div>
                            <span style={{margin: "0 1vw"}}><SendOutlined/></span>姓名，性别
                        </div>
                        <div className={styles.last_line}>
                            <div className={styles.status_light}
                                 style={{backgroundColor: "#80ad97"}}
                            />
                            <div className={styles.open_status}>已打开</div>
                            <Button
                                className={styles.open_button}
                                type={"primary"}
                                size={"small"}
                            >打开</Button>
                        </div>

                    </div>
                </div>

                <div
                    style={{backgroundColor: colorBgContainer}}
                    className={styles.item_box}
                >
                    <div>
                        <div>自定义图名称</div>
                        <div>扇形图</div>
                        <div>姓名，性别</div>
                        <div>未打开</div>
                        <Button>打开</Button>
                    </div>
                </div>
            </div>
            <div className={styles.count_items}>共x条数据</div>
        </>
    );
}