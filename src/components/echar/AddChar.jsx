import {
	Modal,
	Select,
	Input,
	message,
	Space,
	Divider,
	Tag,
	Button,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import api from "../../utils/api"; 
import Composition from "./Composition";
import IntervalDataGroup from "./IntervalDataGroup";
import { charTypeConfig, charType } from "./constant";

export default function AddChar(props) {
	const { propertyList, linkList } = props;
	const [selectCharType, setSelectCharType] = useState(); // 选择的图表类型
	const [selectLinkType, setSelectLinkType] = useState(); // 选中的属性类型 是名词还是区间 0/1
	const [numberScope, setNumberScope] = useState({}); //数值型属性可选范围
	const [curScope, setCurScope] = useState({});
	const [selectProperty, setSelectProperty] = useState(); // 选中的单个属性
	const [numsGroups, setNumsGroups] = useState([]);
	const [nounsGroups, setNounsGroups] = useState([]);
	const [name, setName] = useState();
	const [selectedGroups, setSelectedGroups] = useState([]);
	const [charData, setCharData] = useState([]);
	const [confirmed, setConfirmed] = useState(false);
	const linkType = {
		singleLink: 1,
		intervalLink: 0,
	};

	const handleModalOkClick = () => {
		//信息是否完善
		if (name && selectCharType && selectProperty) {
			if (selectedGroups.length) {
				//复合型
				let data = selectedGroups.map(async (item) => {
					const NAME = item.name;
					const numDTOList = item.data.filter((elem) => elem.linkType === 0);
					const nounsDTOList = item.data.filter((elem) => elem.linkType === 1);
					const reqData = { numDTOList, nounsDTOList };
					const response = await api.getNounsAndNumerical(reqData, props.menuKey);
					return { name: NAME, value: response.data.data };
				});
				Promise.all(data).then((res) => {
					addCharOption({
						name,
						type: selectCharType,
						property: [{ linkComment: "自定义" }],
						data: res,
					});
				});
				props.setIsModalOpen(false);
			} else if (!charData.length && selectLinkType === linkType.intervalLink) {
				//数值型
				api
					.getNumerical({
						start: curScope.start,
						end: curScope.end,
						link: selectProperty,
					}, props.menuKey)
					.then((res) => {
						const data = { name, value: res.data.data };
						addCharOption({
							name,
							type: selectCharType,
							property: [selectProperty],
							data: [data],
						});
					});
				props.setIsModalOpen(false);
			} else if (
				selectLinkType === linkType.singleLink &&
				uniqueLinks.length === 1
			) {
				//名词型
				addCharOption({
					name,
					type: selectCharType,
					property: [selectProperty],
					data: charData,
				});
				props.setIsModalOpen(false);
			}
		} else {
			message.info("请完善信息");
		}
	};

	// 根据属性获取数据
	const handleChange = (value, option) => {
		// 1调用getNouns
		const { type } = option;
		setSelectLinkType(type);
		setSelectProperty({
			linkId: option.value,
			linkComment: option.label,
			connectionId: props.connectionId.current,
			linkType: type,
		});
	};

	//选择的属性变化时请求数据
	useEffect(() => {
		if (selectProperty === undefined) return;
		//获取名词属性数据
		if (selectProperty.linkType === linkType.singleLink) {
			api
				.getNouns({
					linkId: selectProperty.linkId,
					linkComment: selectProperty.linkComment,
					connectionId: props.connectionId.current,
					linkType: selectProperty.linkType,
				}, props.menuKey)
				.then((res) => {
					const data = res.data.data;
					const newData = Object.keys(data).map((key) => ({
						name: key,
						value: data[key],
						linkId: selectProperty.linkId,
					}));
					setCharData(newData);
				});
		}
		//获取数值属性数据
		if (selectProperty.linkType === linkType.intervalLink) {
			api.getNumericalScope(
					{
						link: {
							linkId: selectProperty.linkId,
							linkComment: selectProperty.linkComment,
							connectionId: props.connectionId.current,
							linkType: selectProperty.linkType,
						},
					},
					props.menuKey
				)
				.then((res) => {
					setNumberScope(res.data.data);
					setCurScope({ start: res.data.data.min, end: res.data.data.max });
				});
		}
	}, [selectProperty, selectCharType]);

	const addCharOption = async (option) => {
		const newOption = {
			...option,
			data: option.data.map((item) => ({
				name: item.name,
				value: item.value,
				linkId: item.linkId
			})),
		};
		let pieData = null
		if(newOption.type === charTypeConfig.pie){
			pieData = await api.getPiePersent(newOption.data, props.menuKey)
			newOption.data = pieData.data.data;
		}
		api.insertViewInfo({ viewData: JSON.stringify(newOption) }, props.menuKey).then((res) => {
			const viewId = res.data.msg;
			if (selectCharType === charTypeConfig.pie) {
				props.addViewChar(newOption, viewId);
			} else {
				const newData = {
					xAxisData: option.data.map((item) => item.name),
					yAxisData: option.data.map((item) => item.value),
				};
				const data = {
					name,
					type: selectCharType,
					property: [{ linkComment: "自定义" }],
					data: newData,
				};
				props.addViewChar(data, viewId);
			}
		});
	};

	const tagify = () => {
		const data = charData.map((item) => ({
			name: item.name,
			value: item.name,
			linkType: selectProperty.linkType,
			linkId: item.linkId,
		}));
		setNounsGroups((pre) => [...pre, ...data]);
	};

	useEffect(() => {
		return () => {
			setSelectCharType(null);
			setSelectLinkType(null);
		};
	}, []);

	const uniqueLinks = useMemo(() => {
		const newA = [...nounsGroups.concat(numsGroups)];
		let links = [];
		newA.forEach((item) => {
			const linkData = linkList.find((obj) => obj.linkId === item.linkId);
			links.push({ linkId: linkData.linkId, name: linkData.linkComment });
		});
		const uniqueLinks = [...new Set(links.map((obj) => obj.linkId))].map(
			(linkId) => links.filter((obj) => obj.linkId === linkId)[0]
		);
		return uniqueLinks;
	}, [nounsGroups, numsGroups]);

	return (
		<>
			<Modal
				title="生成图表"
				open={props.isModalOpen}
				destroyOnClose={true}
				onOk={handleModalOkClick}
				onCancel={() => {
					setSelectCharType(null);
					props.setIsModalOpen(false);
				}}
				okText="生成"
				cancelText="取消"
				width={650}
			>
				<Space direction="vertical" style={{ width: "100%" }}>
					<div>
						<span>输入图表名称：</span>
						<Input
							placeholder="输入图表名称"
							style={{ width: "300px", marginLeft: "20px" }}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</div>
					<div>
						生成图表类型:
						<Select
							style={{ width: 300, marginLeft: "20px" }}
							onChange={(value) => {
								setSelectCharType(value);
							}}
							options={charType}
						/>
					</div>
					{selectCharType && (
						<>
							<div>
								选择属性：
								<Select
									style={{ width: 200 }}
									onChange={handleChange}
									options={[
										{
											label: "区间性属性",
											key: 0,
											options:
												propertyList[0] &&
												propertyList[0].map((item) => ({
													value: item.linkId,
													label: item.linkComment,
													type: linkType.intervalLink,
												})),
										},
										{
											label: "名词性属性",
											key: 1,
											options:
												propertyList[1] &&
												propertyList[1].map((item) => ({
													label: item.linkComment,
													value: item.linkId,
													type: linkType.singleLink,
												})),
										},
									]}
								/>
								<Button
									type="primary"
									disabled={selectProperty?.linkType !== 1}
									style={{ marginLeft: 10 }}
									onClick={tagify}
								>
									标签化
								</Button>
							</div>
							{selectLinkType === linkType.intervalLink ? (
								<IntervalDataGroup
									numberScope={numberScope}
									curScope={curScope}
									setCurScope={setCurScope}
									setNumsGroups={setNumsGroups}
									selectProperty={selectProperty}
								/>
							) : (
								<Space size="small" wrap>
									当前分组：
									{charData.map((item, index) => (
										<span key={index} style={{ marginRight: "10px" }}>
											{item.name}
										</span>
									))}
								</Space>
							)}
							<Divider style={{ margin: 0 }} />
							<Space size="small" wrap>
								<div>
									<span style={{ marginRight: "13px" }}>当前标签:</span>
									{uniqueLinks.map((item, uLIndex) => (
										<div key={"item.naem" + uLIndex}>
											<span style={{ marginRight: 10 }}>{item.name}:</span>
											{nounsGroups
												.concat(numsGroups)
												.filter((tags) => tags.linkId === item.linkId)
												.map((tag) => (
													<Tag
														key={tag.name}
														style={{ marginBottom: 5 }}
														closable={!confirmed}
														onClose={(e) => {
															setNumsGroups((pre) => {
																return pre.filter((item) => tag.name !== item.name);
															})
															setNounsGroups((pre) => {
																return pre.filter((item) => tag.name !== item.name);
															});
															e.preventDefault();
														}}
													>
														{tag.name}
													</Tag>
												))}
										</div>
									))}
								</div>
							</Space>
							<Composition
								selectCharType={selectCharType}
								uniqueLinks={uniqueLinks}
								nounsGroups={nounsGroups}
								numsGroups={numsGroups}
								confirmed={confirmed}
								setConfirmed={setConfirmed}
								setSelectedGroups={setSelectedGroups}
								handleModalOkClick={handleModalOkClick}
							/>
						</>
					)}
				</Space>
			</Modal>
		</>
	);
}
