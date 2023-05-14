import { Button, theme, Row, Col } from "antd";
import { TagOutlined, SendOutlined } from "@ant-design/icons";

import styles from "@/styles/ItemList.module.scss";
import { charTypeName } from "./constant";

// props里面要包含是否有修改权限
export default function ItemList(props) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { charList, deleteChar, changeStatus, changeShare } = props;

	const openStatus = {
		open: {
			btnText: "关闭",
			statusText: "已打开",
		},
		close: {
			btnText: "打开",
			statusText: "已关闭",
		},
	};

	return (
		<>
			<div className={styles.container}>
				<Row gutter={[4, 8]}>
					{charList.map((item, index) => {
						return (
							<Col key={item.viewId}>
								<div key={index} className={styles.item_big_box}>
									<div
										style={{
											backgroundColor: colorBgContainer,
											width: "auto",
											paddingRight: 15,
										}}
										className={styles.item_box}
									>
										<div>
											<div className={styles.table_name}>{item.name}</div>
											<div className={styles.table_information}>
												<span style={{ margin: "0 1vw" }}>
													<TagOutlined />
												</span>
												{charTypeName[item.type]}
											</div>
											<div>
												<span style={{ margin: "0 1vw" }}>
													<SendOutlined />
												</span>
												{item.property.map((links) => (
													<span
														style={{ marginRight: "10px" }}
														key={links.linkComment}
													>
														{links.linkComment}
													</span>
												))}
											</div>
											<div className={styles.last_line}>
												<div
													className={styles.status_light}
													style={{ backgroundColor: "#80ad97" }}
												/>
												<div className={styles.open_status}>{item.status}</div>
												<Button
													className={styles.open_button}
													type={"primary"}
													size={"small"}
													onClick={() => {
														if (item.status === "close") {
															changeStatus(index, item.status);
														} else {
															changeStatus(index, item.status);
														}
													}}
												>
													{openStatus[item.status].btnText}
												</Button>
												{changeShare && (
													<Button
														className={styles.open_button}
														type={"primary"}
														size={"small"}
														onClick={() => {
															deleteChar(index);
														}}
													>
														删除
													</Button>
												)}
											</div>
										</div>
									</div>
								</div>
							</Col>
						);
					})}
				</Row>
			</div>
			<div className={styles.count_items}>共{charList.length}条数据</div>
		</>
	);
}
