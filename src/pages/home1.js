import React, {useEffect, useRef, useState} from "react";
import Head from "next/head";
import AddConnectionForm from "@/components/AddConnectionForm";

import {Button, Layout, Menu, theme, Modal, message} from "antd";

const {Content, Footer, Header, Sider} = Layout;
const {confirm} = Modal;

import styles from "@/styles/Home.module.scss";
import api from "@/utils/api";
import {useRouter} from "next/router";

// Home
export default function Home() {
    const [linkList,setLinklist] = useState([]);
    // state
    const [connectionItem, setConnectionItem] = useState([]); // 左侧边栏列表
    // const [username, setUsername] = useState("Admin"); // 用户名
    const [key, setKey] = useState(0);// 左侧边栏高亮的位置

    // ref
    let connectionItemTemp = useRef(connectionItem);
    const keyTemp = useRef(key);

    // hooks
    const {
        token: {colorBgContainer}
    } = theme.useToken();
    const route = useRouter();

    // methods
    /**
     * 添加侧边栏Connection的条数
     */
    const addConnection = (value) => {

        let newArr = connectionItem;
        newArr.push({
            tableName: value
        });
        setConnectionItem([...newArr]);
        setKey(newArr.length - 1);
        keyTemp.current = newArr.length - 1;
    };

    /**
     * 下面代码均用于设置右下角按钮的弹窗
     */
    const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

    const showConnectionModal = () => {
        setIsConnectionModalOpen(true);
    };

    // const handleConnectionOk = () => {
    //     setIsConnectionModalOpen(false);
    //     addConnection();
    // };

    // const handleConnectionCancel = () => {
    //     setIsConnectionModalOpen(false);
    // };

    /**
     * 右上角退出按钮的弹窗设置
     */
    const showConfirm = () => {
        confirm({
            title: "即将退出！",
            content: "你确定准备要退出该系统吗？",
            onOk() {
                console.log("OK");
                route.replace({pathname: "/", query: {}})
                localStorage.removeItem("token");
            },
            onCancel() {
                console.log("Cancel");
            },
            okText: "确定",
            cancelText: "取消"
        });
    };

    /**
     * 获取数据
     */
    const getData = () => {
        api.chooseToken({connectionId: connectionItemTemp.current[keyTemp.current].connectionId}).then((res) => {
            localStorage.setItem("token", res.data.data);
            api.getLink().then((res) => {
            console.log(res);
            setLinklist(res.data.data.links)
            });
        });
    };

    useEffect(() => {
        const promise = new Promise(() => {
            api.getConnection().then((res) => {
                const temp = [...res.data.data];
                setConnectionItem(temp);
                connectionItemTemp.current = temp;
            }).then(() => {
                if (connectionItemTemp.current.length === 0) {
                    message.info("提示：你现在还没有创建任务，请首先创建一个任务！");
                    showConnectionModal();
                } else {
                    getData();
                }
            });
        });
        return () => {
            setConnectionItem([]);
        };
    }, []);

    return (
        <>
            <Head>
                <title>学生画像管理系统</title>
                <meta name="description" content="Student Portrait System"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <Layout style={{minHeight: "100vh"}}>
                    <Header className={styles.head}>
                        <span className={styles.title}>学生画像管理系统</span>
                        <Button
                            className={styles.exit_button}
                            size="small"
                            onClick={showConfirm}
                        >
                            退出
                        </Button>
                        {/*<span className={styles.username}>当前用户：{username}</span>*/}
                    </Header>
                    <Layout hasSider>
                        <Sider
                            width={200}
                            className={styles.left_sider}
                            style={{background: colorBgContainer}}
                        >
                            {connectionItem.length === 0 ?
                                <h3 className={styles.left_sider_when_connectionItem_is_0}>
                                    你还没有创建任务，请点击右下方&quot;+&quot;按钮以创建
                                </h3>
                                :
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={["0"]}
                                    style={{height: "100%", borderRight: 0}}
                                    items={connectionItem.map((data, index) => {
                                        return {
                                            key: `${index}`,
                                            label: `${data.tableName}`
                                        };
                                    })}
                                    selectedKeys={[key.toString()]}
                                    onClick={(e) => {
                                        keyTemp.current = e.key;
                                        setKey(() => e.key);
                                        getData();
                                        api.add
                                    }}
                                />
                            }
                        </Sider>
                        <Layout className={styles.right_skirt}>
                            <Content
                                className={styles.outskirt_content}
                                style={{background: colorBgContainer}}
                            >
                                <ShowDataRegion linkList={linkList}/>
                            </Content>
                            <Footer className={styles.footer}>
                                Student Portrait System ©2023 Created by Hunter Li & Zhenyue
                                Wang
                            </Footer>
                        </Layout>
                    </Layout>
                </Layout>
                <Button
                    shape={"circle"}
                    type={"primary"}
                    className={styles.add_connection_button}
                    onClick={showConnectionModal}
                >+</Button>
                {isConnectionModalOpen && <AddConnectionForm setIsConnectionModalOpen={setIsConnectionModalOpen} addConnection={addConnection}/>}
            </main>
        </>
    );
}
