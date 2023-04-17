import styles from "@/styles/Manage.module.scss";
import {Button, Collapse, Dropdown, Input, message, Space, Table} from "antd";
import {DownOutlined} from "@ant-design/icons"
export default function Manage(props) {
    const items = [
        {
            label: "sadfsad",
            key: "1"
        },
        {
            label: "sdafsa",
            key: "2"
        }
    ];

    const handleMenuClick = (e) => {
        message.info("click!");
        console.log("click", e);
    };

    const menu = {
        items,
        onClick: handleMenuClick
    };

    return (
        <div className={styles.site_layout_content_show}>
            <div className={styles.title}>{props.missionName.current}</div>
            <div>属性类别（点击切换标签类别）</div>
            <Button>导入</Button><Button>导入数据</Button>
            <Collapse>
                <Collapse.Panel key={1} header={
                    <>
                        <span>名词类</span>
                    </>
                }>123</Collapse.Panel>
                <Collapse.Panel key={2} header={
                    <>
                        <span>数值类</span>
                    </>
                }>456</Collapse.Panel>
            </Collapse>
            <div>数据展示</div>
            <Button>+</Button>
            {/*<div>姓名</div>*/}
            <Dropdown menu={menu}>
                <Button>
                    <Space>
                        姓名
                        <DownOutlined/>
                    </Space>
                </Button>
            </Dropdown>
            {/*上面是下拉菜单*/}
            <Input/>
            <Button>搜索</Button>
            <Table></Table>
        </div>
    );
}