import {Collapse, Tag, theme} from "antd";
import styles from "@/styles/ShowProperty.module.scss";
const {Panel} = Collapse;

export default function ShowProperty() {
    const {
        token: {colorBgContainer}
    } = theme.useToken();

    return (
        <div>
            <Collapse
                expandIconPosition="end"
                style={{backgroundColor: colorBgContainer}}
            >
                <Panel header={
                    <>
                        <span>已导入属性：</span>
                        <Tag key={1}>
                            姓名
                        </Tag>
                        <Tag key={2}>
                            性别
                        </Tag>
                    </>
                } key="1">
                    <Tag color="#6e84c9" style={{padding: "3px 15px"}} key={1}>
                        姓名
                    </Tag>
                    <Tag color="#6e84c9" style={{padding: "3px 15px"}} key={2}>
                        性别
                    </Tag>
                </Panel>
            </Collapse>
            <div className={styles.count_items}>共x条数据</div>
        </div>
        // <div className={styles.property_div}>

        //   <div className={styles.title}>已导入属性</div>
        //   <Space size={[0, 8]} wrap style={{ padding: "10px" }}>
        //     {/* {props.linkList.map((item, index) => (
        //       <Tag color="#6e84c9" style={{ padding: "3px 15px" }} key={index}>
        //         {item.linkComment}
        //       </Tag>
        //     ))} */}
        //   </Space>
        // </div>
    );
}
