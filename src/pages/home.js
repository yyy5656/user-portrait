import { FileOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Tabs, Button, Modal, Empty, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.scss";

import api from "@/utils/api";
import { MENU_CONFIG } from "@/utils/constant";

import CharContent from "../components/echar/CharContent";
import AddConnectionForm from "../components/AddConnectionForm";
import Head from "next/head";
import Manage from "@/components/manage/Manage";
import PublicManage from "@/components/manage/PublicManage";

const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const Home = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const route = useRouter();

	// connectionId: number
	// linkName: null
	// tableName: string
	// userId: number
	const [connectionItemList, setConnectionItemList] = useState([]); // 左侧边栏列表
	const [publicConnectionItemList, setPublicConnectionItemList] = useState([]); // 左侧边可查看任务栏列表
	const [sharedConnectionItemList, setSharedConnectionItemList] = useState([]); // 左侧边可查看任务栏列表
	// linkList的类型是这个,没有ts难受 就这样写吧 懒的加ts
	//{
	//  linkId: number,
	//  linkComment: string,
	//  connectionId: number,
	//}[]
	const [linkList, setLinklist] = useState([]);
	const [username, setUsername] = useState("用户名");
	const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);
	const [tabKey, setTabkey] = useState("1");
	const [menuKey, setMenuKey] = useState();
	const [menuItem, setMenuItem] = useState();
	const [changeShare, setChangeShare] = useState(true);
	const [curConnectionId, setCurConnectionId] = useState();
	const connectionId = useRef(null);
	const missionName = useRef(null);
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * 获取左侧表名数据
	 * @returns {Promise<void>}
	 */
	const fetchData = async () => {
		const res = (await api.getConnection()).data;
		res.data && setConnectionItemList(res.data);
	};

	/**
	 * 这个是请求属性
	 * @returns {Promise<void>}
	 * @param data
	 */
	const fetchLinkData = async (data) => {
		const res = await api.chooseConnection(data);
		if (res.status === 200 && res.data.data) {
			localStorage.setItem("token", res.data.data);
		}
		const linkRes = await api.getLink();
		if (linkRes.data.code === 200) {
			setLinklist(linkRes.data.data.links);
		} else {
			setLinklist([]);
			message.warning("未上传数据");
		}
	};

	const fetchPublicLinkData = async (data) => {
		const res = await api.choosePublicConnection(data);
		if (res.status === 200 && res.data.data) {
			localStorage.setItem("share_token", res.data.data);
		}
		const linkRes = await api.share_getLink();
		if (linkRes.data.code === 200) {
			setLinklist(linkRes.data.data.links);
		} else {
			setLinklist([]);
			message.warning("未上传数据");
		}
	};

	const fetchShareLinkData = async (data) => {
		const res = await api.share_chooseConnection(data);
		if (res.status === 200 && res.data.data) {
			localStorage.setItem("share_token", res.data.data);
		}
		const linkRes = await api.share_getLink();
		if (linkRes.status === 200 && linkRes.data) {
			setLinklist(linkRes.data.data.links);
		} else {
			setLinklist([]);
			message.warning("未上传数据");
		}
	};

	const handleClick = (e) => {
		setIsLoading(true);
		setCurConnectionId(e.key);
		if (
			e.key !== MENU_CONFIG.CREATE_TASK &&
			e.key !== MENU_CONFIG.PUBLIC_MANAGER &&
			e.key !== MENU_CONFIG.SHARED_CONNECTION
		) {
			let findResult =
				connectionItemList?.find((element) => {
					return element.connectionId === parseInt(e.key);
				}) ||
				publicConnectionItemList?.find((element) => {
					return element.connectionId === parseInt(e.key);
				}) ||
				sharedConnectionItemList?.find((element) => {
					return element.connectionId === parseInt(e.key);
				});
			connectionId.current = findResult?.connectionId;
			const shareType = findResult.shareType === 0 ? "-只读" : "-可修改";
			missionName.current =
				findResult?.tableName || findResult.data.tableName + shareType;
		}
		if (e.keyPath && e.keyPath.includes(MENU_CONFIG.MY_TASK)) {
			setChangeShare(true);
			fetchLinkData({ connectionId: e.key });
			setMenuKey(MENU_CONFIG.MY_TASK);
		} else if (e.keyPath && e.keyPath.includes(MENU_CONFIG.CREATE_TASK)) {
			setIsConnectionModalOpen(true);
		} else if (e.keyPath && e.keyPath.includes(MENU_CONFIG.PUBLIC_MANAGER)) {
			setMenuKey(MENU_CONFIG.PUBLIC_MANAGER);
		} else if (e.keyPath && e.keyPath.includes(MENU_CONFIG.PUBLIC_CONNECTION)) {
			setMenuKey(MENU_CONFIG.PUBLIC_CONNECTION);
			const data = publicConnectionItemList.filter(
				(item) => item.connectionId == e.key
			);
			fetchPublicLinkData(data[0]);
			setChangeShare(false);
		} else if (e.keyPath && e.keyPath.includes(MENU_CONFIG.SHARED_CONNECTION)) {
			setMenuKey(MENU_CONFIG.SHARED_CONNECTION);
			const id = Number(e.key);
			let connection = null;
			sharedConnectionItemList.forEach((item) => {
				if (item.connectionId === id) {
					connection = item;
				}
			});
			if (connection?.shareType === 1) {
				setChangeShare(true);
			} else {
				setChangeShare(false);
			}
			fetchShareLinkData({
				shareId: connection.shareId,
				userId: connection.userId,
				sharedUserId: connection.sharedUserId,
				connectionId: connection.connectionId,
				shareType: connection.shareType,
				username: connection.username,
			});
		}
	};

	// 退出登录
	const showConfirm = () => {
		confirm({
			title: "即将退出！",
			content: "你确定准备要退出该系统吗？",
			onOk() {
				route.replace({ pathname: "/", query: {} });
				localStorage.removeItem("token");
			},
			onCancel() {},
			okText: "确定",
			cancelText: "取消",
		});
	};

	const addConnection = () => {
		fetchData();
	};
	const resetLinks = () => {
		setLinklist([]);
	};

	const fetchGetConnection = async () => {
		const publicConnectionRes = await api.getPublicConnection();
		if (publicConnectionRes.status === 200 && publicConnectionRes.data.data) {
			setPublicConnectionItemList(publicConnectionRes.data.data);
		}
		const sharedConnectionRes = await api.getSharedConnection();
		if (sharedConnectionRes.status === 200 && sharedConnectionRes.data.data) {
			setSharedConnectionItemList(sharedConnectionRes.data.data);
		}

		if (tabKey === "1") {
			setMenuItem(
				getItem("可查看任务", MENU_CONFIG.INQUIRE_TASK, <FileOutlined />, [
					getItem(
						"公开",
						MENU_CONFIG.PUBLIC_CONNECTION,
						<FileOutlined />,
						publicConnectionRes?.data.data?.map((data) => {
							return {
								key: `${data.connectionId}`,
								label: `${data.tableName}`,
							};
						})
					),
					getItem(
						"他人分享",
						MENU_CONFIG.SHARED_CONNECTION,
						<FileOutlined />,
						sharedConnectionRes?.data.data?.map((data) => {
							return {
								key: `${data.data.connectionId}`,
								label: `${data.data.tableName}`,
							};
						})
					),
				])
			);
		}
	};

	useEffect(() => {
		fetchData();
		fetchGetConnection();
		setUsername(localStorage.getItem("userName"));
		return () => {
			setConnectionItemList([]);
		};
	}, []);

	useEffect(() => {
		if (tabKey === "1") {
			setMenuItem(
				getItem("可查看任务", MENU_CONFIG.INQUIRE_TASK, <FileOutlined />, [
					getItem(
						"公开",
						MENU_CONFIG.PUBLIC_CONNECTION,
						<FileOutlined />,
						publicConnectionItemList.map((data) => {
							return {
								key: `${data.connectionId}`,
								label: `${data.tableName}`,
							};
						})
					),
					getItem(
						"他人分享",
						MENU_CONFIG.SHARED_CONNECTION,
						<FileOutlined />,
						sharedConnectionItemList.map((data) => {
							return {
								key: `${data.data.connectionId}`,
								label: `${data.data.tableName}`,
							};
						})
					),
				])
			);
		} else if (tabKey === "2") {
			setMenuItem(
				getItem("共享管理", MENU_CONFIG.PUBLIC_MANAGER, <FileOutlined />)
			);
		}
	}, [tabKey, curConnectionId]);

	return (
		<>
			<Head>
				<title>学生画像管理系统</title>
				<meta name="description" content="Student Portrait System" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Layout
					style={{
						minHeight: "100vh",
					}}
				>
					<Sider theme="light">
						<div className={styles.sider}>学生画像系统</div>
						<Menu
							theme="light"
							defaultSelectedKeys={["1"]}
							mode="inline"
							items={[
								getItem(
									"创建新任务",
									MENU_CONFIG.CREATE_TASK,
									<PlusOutlined />
								),
								getItem(
									"我的任务",
									MENU_CONFIG.MY_TASK,
									<UserOutlined />,
									connectionItemList.map((data) => {
										return {
											key: `${data.connectionId}`,
											label: `${data.tableName}`,
										};
									})
								),
								menuItem,
							]}
							defaultOpenKeys={[MENU_CONFIG.MY_TASK]}
							onClick={handleClick}
						/>
					</Sider>
					<Layout className="site-layout">
						<Header
							className={styles.header}
							style={{
								background: colorBgContainer,
							}}
						>
							<div>{username}</div>
							<Button onClick={showConfirm}>退出</Button>
						</Header>
						<Content
							className={styles.content}
							style={{
								margin: "0 16px",
							}}
						>
							<Tabs
								defaultActiveKey="1"
								onTabClick={(key) => {
									setTabkey(key);
								}}
								items={[
									{
										label: "可视化数据",
										key: "1",
										children: linkList.length ? (
											<CharContent
												linklist={linkList}
												connectionId={connectionId}
												missionName={missionName}
												fetchData={fetchData}
												changeShare={changeShare}
												menuKey={menuKey}
												isLoading={isLoading}
												setIsLoading={setIsLoading}
											/>
										) : (
											<Empty className={styles.empty} />
										),
									},
									{
										label: "管理",
										key: "2",
										children:
											menuKey === MENU_CONFIG.PUBLIC_MANAGER ? (
												<PublicManage />
											) : linkList.length ? (
												<Manage
													missionName={missionName}
													linkList={linkList}
													connectionId={connectionId}
													fetchData={fetchData}
													resetLinks={resetLinks}
												/>
											) : (
												<Empty className={styles.empty} />
											),
									},
									{
										label: "个人中心",
										key: "3",
										children: "Tab 3",
									},
								]}
								style={{
									lineType: "none",
								}}
							/>
						</Content>
					</Layout>
					{isConnectionModalOpen && (
						<AddConnectionForm
							setIsConnectionModalOpen={setIsConnectionModalOpen}
							addConnection={addConnection}
						/>
					)}
				</Layout>
			</main>
		</>
	);
};
export default Home;
