import { Button, message, Modal } from "antd";

import styles from "@/styles/CharContent.module.scss";
import ShowProperty from "./ShowProperty";
import AddChar from "./AddChar";
import ItemList from "@/components/echar/ItemList";
import BasicBar from "./BasicBar";
import { useEffect, useState } from "react";
import { charListData, addViewType } from "./constant";
import api from "@/utils/api";

const { confirm } = Modal;

export default function CharContent(props) {
	//console.log(props);
	const [charList, setCharList] = useState([]);
	const [newView, setNewView] = useState();
	const [deleteIdx, setDeleteIdx] = useState();
	// 属性分组
	const [propertyList, setPropertyList] = useState({});
	// 添加图表弹窗
	const [isModalOpen, setIsModalOpen] = useState();
	const [defaultOption, setDefaultOption] = useState();

	useEffect(() => {
		setCharList([]);
	}, [props.connectionId.current]);

	// 增加图表
	const addViewChar = (type, value, viewId = 0) => {
		if (type === addViewType.add_view) {
			setNewView({
				connectionId: props.connectionId.current,
				status: "open",
				viewData: value.viewData,
				viewId,
			});
			setCharList([value, ...charList]);
		} else if (type === addViewType.open_view) {
			setCharList([value, ...charList]);
		}
	};

	// 删除图表
	const deleteViewChar = (viewId, type) => {
		let idx = null;
		charList.forEach((item, index) => {
			if (viewId === item.viewId) {
				idx = index;
			}
		});
		charList.splice(idx, 1);
		setCharList([...charList]);
		if (type !== "fetch") {
			setDeleteIdx(viewId);
		}
	};

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

	const changeViewInfo = (bool, defaultOption = undefined) => {
		setIsModalOpen(bool);
		defaultOption && setDefaultOption(defaultOption);
	};

	//console.log(props);
	return (
		<div className={styles.site_layout_content_show}>
			<div className={styles.title}>
				<span>{props.missionName.current}</span>
			</div>
			<ShowProperty property={handlePropsData()} />
			<ItemList
				connectionId={props.connectionId.current}
				charList={charList}
				newView={newView}
				deleteIdx={deleteIdx}
				addViewChar={addViewChar}
				deleteViewChar={deleteViewChar}
				changeViewInfo={changeViewInfo}
			/>
			<Button style={{ marginTop: "20px" }} onClick={handleClick}>
				生成图表
			</Button>
			<AddChar
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				setDefaultOption={setDefaultOption}
				connectionId={props.connectionId}
				addViewChar={addViewChar}
				propertyList={propertyList}
				defaultOption={defaultOption}
			/>
			{charList.length
				? charList.map((item) => {
						console.log("charList", charList);
						return (
							<BasicBar
								key={item.viewId}
								viewId={item.viewId}
								charOption={item.viewData}
								deleteViewChar={deleteViewChar}
							/>
						);
				  })
				: null}
		</div>
	);
}
