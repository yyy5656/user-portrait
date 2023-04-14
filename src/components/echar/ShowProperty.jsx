import {Collapse, Tag, theme} from "antd";
import styles from "@/styles/ShowProperty.module.scss";

const {Panel} = Collapse;

export default function ShowProperty(props) {
    const {
        token: {colorBgContainer}
    } = theme.useToken();

    const property = props.property;

    return (
        <div>
            <Collapse
                expandIconPosition="end"
                style={{backgroundColor: colorBgContainer}}
            >
                <Panel header={
                    <>
                        <span>已导入属性：</span>
                        {
                            property.map((value, index) => {
                                return (
                                    <Tag key={index}>
                                        {value}
                                    </Tag>
                                );
                            })
                        }
                    </>
                } key="1">
                    {
                        property.map((value, index) => {
                            return (
                                <Tag color="#6e84c9" style={{padding: "3px 15px", marginBottom:"5px"}} key={index}>
                                    {value}
                                </Tag>
                            );
                        })
                    }
                </Panel>
            </Collapse>
            <div className={styles.count_items}>共{property.length}条数据</div>
        </div>
    );
}
