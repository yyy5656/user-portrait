import { Form, Input, InputNumber, Modal, Table, Tag, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/ShowTable.module.scss";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import api from "../../utils/api";

/**
 *  可供修改的单元格
 *   @param editing
 *   @param dataIndex
 *   @param title
 *   @param inputType
 *   @param record
 *   @param index
 *   @param children
 *   @param restProps
 *   @returns {JSX.Element}
 *   @constructor
 */
const EditableCell = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{
						margin: 0,
					}}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

/**
 * 展示表格
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ShowTable = (props) => {
	// hooks
	const [form] = Form.useForm();

	// state
	const [data, setData] = useState([]); // 源数据
	const [editingKey, setEditingKey] = useState(""); // 修改的位置
	const [pagination, setPagination] = useState({ size: 10, page: 1, total: 0 });

	// ref
	const columns = useRef([]); // 暂存的表格位置
	const tempData = useRef(null);

	// methods
	/**
	 * 获取表格源数据
	 */
	const getTableData = (page) => {
		const { keyWord } = props;
		if (page) {
			//更新数据
			const pageReq = { size: pagination.size, page: page };
			api.getAllDataByPage(pageReq).then((res) => {
				setData(res.data.data.data);
				setPagination(pre => ({...pre, page}));
			});
			return ;
		}
		if (keyWord) {
			tempData.current = data;
			api.queryData(keyWord).then((res) => {
				setData(res.data.data);
				setPagination(pre=> ({...pre, total: res.data.data.total}));
			});
		} else {
			const pageReq = { size: pagination.size, page: pagination.page };
			api.getAllDataByPage(pageReq).then((res) => {
				setData(res.data.data.data);
				setPagination((pre) => ({ ...pre, total: res.data.data.total }));
			});
		}
		columns.current = handleColumns();
	};

	/**
	 * 对表头进行设置
	 * @returns {{dataIndex: *, editable: boolean, title: *}[]}
	 */
	const handleColumns = () => {
		let output = [];
		if (props.types) {
			output = props.types.flat(1).map((value, index) => {
				return {
					title: value.linkComment,
					dataIndex: value.linkId,
					key: index,
					editable: true,
					width: "120px",
					textWrap: "word-break",
				};
			});
		}
		let operation = {
			title: "操作",
			dataIndex: "operation",
			width: "140px",
			fixed: "right",
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Tag
							className={styles.tags}
							color={"green"}
							onClick={() => {
								Modal.confirm({
									title: "你确定要修改吗?",
									onOk: () => {
										save(record.id);
									},
									okText: "确定",
									cancelText: "取消",
								});
							}}
						>
							<CheckOutlined />
						</Tag>
						<Tag
							className={styles.tags}
							color={"red"}
							onClick={() => {
								// cancel();
							}}
						>
							<CloseOutlined />
						</Tag>
					</span>
				) : (
					<>
						<Tag
							className={styles.tags}
							color={"blue"}
							onClick={() => edit(record)}
						>
							编辑
						</Tag>
						<Tag
							className={styles.tags}
							color={"red"}
							onClick={() => handleDelete(record)}
						>
							删除该行
						</Tag>
					</>
				);
			},
		};
		output.push(operation);
		return output;
	};

	/**
	 * 是否处于编辑状态
	 * @param record
	 * @returns {boolean}
	 */
	const isEditing = (record) => record.id === editingKey;

	/**
	 * 编辑表格
	 * @param record
	 */
	const edit = (record) => {
		form.setFieldsValue({
			name: "",
			age: "",
			address: "",
			...record,
		});
		setEditingKey(record.id);
	};

	/**
	 * 取消编辑(x键)
	 */
	const handleChangePage = (value) => {
		setEditingKey("");
		setPagination((pre) => ({ ...pre, page: value }));
	};

	/**
	 * 保存修改
	 * @param key
	 * @returns {Promise<void>}
	 */
	const save = async (key) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.id);
			const item = newData[index];
			const changedData = { ...item, ...row };
			const {
				data: { msg },
			} = await api.updateDataById(changedData);
			message.success(msg);
			setEditingKey("");
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	/**
	 * 删除某一行数据
	 * @param data
	 */
	const handleDelete = (data) => {
		Modal.confirm({
			title: "你确定要删除该行数据吗？",
			okText: "确定",
			cancelText: "取消",
			onOk() {
				api.deleteDataById(data).then(() => {
					getTableData();
				});
			},
		});
	};

	const handleSizeChange = (current, value) => {
		setPagination(pre => ({...pre, size: value, page: current}))
	}

	/**
	 * 对传入的column进行精细化处理，使得能够被正式渲染上去
	 * @type {unknown[]}
	 */
	const mergedColumns = columns.current.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record) => {
				return {
					record,
					inputType: col.dataIndex === "age" ? "number" : "text",
					dataIndex: col.dataIndex,
					title: col.title,
					editing: isEditing(record),
				};
			},
		};
	});
	// tableProps
	const tableProps = {
		size: "middle",
		components: {
			body: {
				cell: EditableCell,
			},
		},
		bordered: true,
		pagination: {
			hideOnSinglePage: true,
			defaultPageSize: 10,
			total: pagination.total,
			onChange: handleChangePage,
			onShowSizeChange: handleSizeChange
		},
		scroll: {
			x: `${props.types ? 120 * props.types.flat(1).length : 0}px`,
			y: "33.7vh",
		},
		dataSource: data,
		columns: mergedColumns,
		sticky: true,
	};

	useEffect(() => {
	}, [])

	useEffect(() => {
		getTableData();
	}, [props.types, editingKey, props.keyWord]);

	useEffect(() => {
		getTableData(pagination.page);
	}, [pagination.page, pagination.size]);

	return (
		<Form form={form} component={false}>
			<Table {...tableProps} />
		</Form>
	);
};
export default ShowTable;
