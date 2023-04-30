import { useState, useEffect, useRef } from "react";
import {
	Button,
	Collapse,
	Dropdown,
	Form,
	Input,
	Modal,
	Space,
	Tag,
	theme,
} from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "@/styles/Manage.module.scss";
import deleteConnection from "@/utils/deleteConnection";
import ShowTable from "@/components/manage/ShowTable";
import AddData from "./AddData";
import AddProperty from "./AddProperty";
import api from "@/utils/api";

export default function Manage(props) {
	// hooks
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const [isOpenAddDataModal, setIsOpenAddDataModal] = useState();
	const [isOpenAddPropertyModal, setIsOpenAddPropertyModal] = useState();

	// state
	const [types, setTypes] = useState([[], []]); // 渲染的属性列表
	const [typeState, setTypeState] = useState(null); // 要传给table的type数据
	const [linkList, setLinklist] = useState([]); // 字段列表
	const [clickedSearchType, setClickedSearchType] = useState(null); // 目前显示的搜索部分框字段
	const [keyWord, setKeyWord] = useState(null); //搜索关键词对象

	// ref
	const typeRef = useRef(null); // 用以缓存未处理的type数据

	// methods

	/**
	 * 获取字段列表
	 * @returns {Promise<void>}
	 */
	const getLinklist = async () => {
		const linkRes = await api.getLink();
		//console.log(linkRes);
		if (linkRes.status === 200 && linkRes.data) {
			setLinklist(linkRes.data.data.links);
			setClickedSearchType(linkRes.data.data.links[0]);
		}
	};

	/**
	 * 获取属性类别
	 */
	const getTypes = async () => {
		const res = await api.getLinksByType({});
		let output = [[], []];
		typeRef.current = Object.values(res.data.data);
		setTypeState(Object.values(res.data.data));
		Object.values(res.data.data).forEach((value, index) => {
			value.forEach((value2) => {
				output[index].push(value2.linkComment);
			});
		});
		setTypes(output);
	};

	/**
	 * 转换属性类别
	 * @param target
	 * @param fromWhere
	 */
	const changeType = (target, fromWhere) => {
		const findResult = typeRef.current[fromWhere].find((value) => {
			return value.linkComment === target;
		});
		api.changeLinkType(findResult).then(
			() => {
				getTypes();
			},
			(err) => {
				console.error(err);
			}
		);
	};
	/**
	 * 生成搜索框列表
	 * @type {{label: string, key: string}[]}
	 */
	const getItems = linkList.map((value) => {
		return {
			label: value.linkComment,
			key: value.linkId.toString(),
		};
	});

	/**
	 * 点击后切换字段
	 * @param e
	 */
	const handleMenuClick = (e) => {
		setClickedSearchType(
			linkList.find((value) => {
				return value.linkId.toString() === e.key;
			})
		);
	};

	// Dropdown列表菜单
	const menu = {
		items: getItems,
		onClick: handleMenuClick,
	};

	/**
	 * 搜索指定字段内容
	 * @param data
	 */
	const searchData = async (queryData) => {
		if (!queryData.searchName) {
			//* 无搜索关键字
			return setKeyWord(null);
		} else {
			//* 搜索关键字
			/* let output = {
				linkId: clickedSearchType.linkId,
				value: queryData.searchName,
			};
			const { data } = await api.queryData(output);
			if (data.code === 200) {
				setSearchedData(data.data);
			} */
			setKeyWord({
				linkId: clickedSearchType.linkId,
				value: queryData.searchName,
			});
		}
	};

	useEffect(() => {
		getLinklist();
		getTypes();
		return () => {
			setTypes([[], []]);
		};
	}, []);

	return (
		<div className={styles.site_layout_content_show}>
			<div className={styles.title}>
				<span>{props.missionName.current}</span>
				<Button
					onClick={() => {
						deleteConnection(props.connectionId.current, props.fetchData);
					}}
					className={styles.delete_connection_btn}
				>
					删除任务
				</Button>
			</div>
			<div className={styles.property_box}>
				<div className={styles.property_type}>属性类别（点击切换标签类别）</div>
				<div className={styles.btn_box}>
					<Button
						onClick={() => {
							setIsOpenAddPropertyModal(true);
						}}
					>
						导入
					</Button>
					<Button className={styles.import_data_btn}>导入记录</Button>
				</div>
			</div>
			<Collapse
				expandIconPosition="end"
				style={{ backgroundColor: colorBgContainer }}
			>
				<Collapse.Panel
					key={1}
					header={
						<>
							<span className={styles.collapse_panel_span}>名词类</span>
							{types[1].slice(0, 5).map((value, index) => {
								return <Tag key={index}>{value}</Tag>;
							})}
						</>
					}
				>
					{types[1].map((value, index) => {
						return (
							<Tag
								color="#6e84c9"
								style={{
									padding: "3px 15px",
									marginBottom: "5px",
									cursor: "pointer",
								}}
								key={index}
								onClick={() => {
									Modal.confirm({
										title: (
											<span style={{ fontWeight: 400 }}>
												是否切换
												<span style={{ fontWeight: 700 }}> {value} </span>到
												<span style={{ fontWeight: 700 }}> 数值类 </span>？
											</span>
										),
										okText: "确定",
										cancelText: "取消",
										onOk() {
											changeType(value, 1);
										},
									});
								}}
							>
								{value}
							</Tag>
						);
					})}
				</Collapse.Panel>
				<Collapse.Panel
					key={2}
					header={
						<>
							<span className={styles.collapse_panel_span}>数值类</span>
							{types[0].slice(0, 5).map((value, index) => {
								return <Tag key={index}>{value}</Tag>;
							})}
						</>
					}
				>
					{types[0].map((value, index) => {
						return (
							<Tag
								color="#6e84c9"
								style={{
									padding: "3px 15px",
									marginBottom: "5px",
									cursor: "pointer",
								}}
								key={index}
								onClick={() => {
									Modal.confirm({
										title: (
											<span style={{ fontWeight: 400 }}>
												是否切换
												<span style={{ fontWeight: 700 }}> {value} </span>到
												<span style={{ fontWeight: 700 }}> 名词类 </span>？
											</span>
										),
										okText: "确定",
										cancelText: "取消",
										onOk() {
											changeType(value, 0);
										},
									});
								}}
							>
								{value}
							</Tag>
						);
					})}
				</Collapse.Panel>
			</Collapse>
			<div className={styles.show_data_box}>
				<div className={styles.show_data_title}>数据展示</div>
				<Button
					size={"small"}
					type={"primary"}
					className={styles.plus_btn}
					onClick={() => {
						setIsOpenAddDataModal(true);
					}}
				>
					+
				</Button>
				<Form className={styles.search_bigbox} onFinish={searchData}>
					<Form.Item>
						<Dropdown menu={menu} className={styles.dropdown}>
							<Button>
								<Space>
									{clickedSearchType ? clickedSearchType.linkComment : null}
									<DownOutlined />
								</Space>
							</Button>
						</Dropdown>
					</Form.Item>
					<Form.Item name={"searchName"}>
						<Input
							className={styles.search_box}
							placeholder={"你想查询的内容..."}
						/>
					</Form.Item>
					<Button
						className={styles.search_btn}
						type={"primary"}
						htmlType={"submit"}
					>
						<SearchOutlined />
					</Button>
				</Form>
			</div>
			<ShowTable
				keyWord={keyWord && keyWord}
				types={typeState ? typeState : null}
			/>
			<AddData
				linkList={linkList}
				isOpenAddDataModal={isOpenAddDataModal}
				setIsOpenAddDataModal={setIsOpenAddDataModal}
			/>
			<AddProperty
				connectionId={props.connectionId}
				isOpenAddPropertyModal={isOpenAddPropertyModal}
				setIsOpenAddPropertyModal={setIsOpenAddPropertyModal}
			/>
		</div>
	);
}
