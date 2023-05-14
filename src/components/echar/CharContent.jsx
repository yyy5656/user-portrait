import { Button, message, Spin } from "antd";

import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import ItemList from "@/components/echar/ItemList";
import BasicBar from "./BasicBar";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function CharContent(props) {
	const { menuKey, linklist, changeShare, isLoading, setIsLoading } = props;

	const [charList, setCharList] = useState([]);
	// 属性分组
	const [propertyList, setPropertyList] = useState({});
	// 添加图表弹窗
	const [isModalOpen, setIsModalOpen] = useState();
	const [defaultOption, setDefaultOption] = useState();

	useEffect(() => {
		setCharList([]);
	}, [props.connectionId.current]);

	//设置400毫秒loading时间
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 400);
	}, [charList]);

	//获得图表
	const getViewChar = (viewDataList) => {
		if (!viewDataList) return;
		const data = viewDataList.map((item) => {
			item.viewData = {
				...JSON.parse(item.viewData),
				status: "open",
				viewId: item.viewId,
			};
			return item.viewData;
		});
		const newData = data.map((item) => {
			if (item.type != "PIE") {
				return {
					...item,
					data: {
						xAxisData: item.data.map((elem) => elem.name),
						yAxisData: item.data.map((elem) => elem.value),
					},
				};
			} else {
				return item;
			}
		});
		setCharList(newData);
	};

	// 增加图表
	const addViewChar = (viewData, viewId) => {
		const data = { ...viewData, viewId, status: "open" };
		setCharList((pre) => [...pre, data]);
	};

	// 删除图表
	const deleteChar = (index) => {
		const viewId = charList[index].viewId;
		api.deleteViewInfo({ viewId }).then((res) => {
			message.success(res.data.msg);
		});
		setCharList((pre) => pre.filter((item) => item.viewId !== viewId));
	};

	//切换图表显示状态
	const changeStatus = (index, status) => {
		const data = [...charList];
		const newStatus = status === "open" ? "close" : "open";
		data[index].status = newStatus;
		setCharList(data);
	};

	//获取已导入的属性
	const handlePropsData = () => {
		return props.linklist.map((value) => {
			return value.linkComment;
		});
	};

	// 生成图表
	const handleClick = () => {
		// 点击后请求属性
		setIsModalOpen(true);
		api.getLinksByType().then((res) => {
			if (res.status === 200 && res.data.data) {
				setPropertyList(res.data.data);
			}
		});
	};

	//修改图表
	const changeViewInfo = (bool, defaultOption = undefined) => {
		setIsModalOpen(bool);
		defaultOption && setDefaultOption(defaultOption);
	};
	//获取图表信息
	useEffect(() => {
		if (menuKey === "PUBLIC_CONNECTION") {
			api.getPublicViewInfo().then((res) => {
				getViewChar(res.data.data);
			});
		} else if (menuKey === "SHARED_CONNECTION") {
			api.getPublicViewInfo().then((res) => {
				getViewChar(res.data.data);
			});
		} else {
			api.getViewInfo().then((res) => {
				getViewChar(res.data.data);
			});
		}
	}, [menuKey, linklist]);
	
	if (isLoading) {
		return <div style={{height: '80vh', display:'grid', placeContent: 'center'}}><Spin /> </div>;
	}

	return (
		<div className={styles.site_layout_content_show}>
			<div className={styles.title}>
				<span>{props.missionName.current}</span>
			</div>
			<ShowProperty property={handlePropsData()} />
			{charList.length !== 0 && (
				<ItemList
					connectionId={props.connectionId.current}
					charList={charList}
					changeShare={changeShare}
					changeStatus={changeStatus}
					deleteChar={deleteChar}
					changeViewInfo={changeViewInfo}
				/>
			)}
			{changeShare && (
				<Button style={{ marginTop: "20px" }} onClick={handleClick}>
					生成图表
				</Button>
			)}
			{isModalOpen && (
				<AddChar
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					setDefaultOption={setDefaultOption}
					connectionId={props.connectionId}
					addViewChar={addViewChar}
					propertyList={propertyList}
					defaultOption={defaultOption}
				/>
			)}
			{charList.length
				? charList.map((item, index) => {
						if (item.status === "open") {
							return (
								<BasicBar
									key={item.viewId}
									index={index}
									charOption={item}
									changeStatus={changeStatus}
								/>
							);
						}
				  })
				: null}
		</div>
	);
}
