import { useEffect, useState } from "react";

import AllTask from "./AllTask";
import TaskAuthority from "./TaskAuthority";
import api from "@/utils/api";

export default function PublicManager(props) {
	//console.log(props);
	const [dataSource, setDataSource] = useState([]);

  const shareTypeConfig = {
    0: "只读",
    1: "修改视图",
  };

	const fetchTableData = () => {
		api.getShareList().then((res) => {
			const data = res.data.data;
			setDataSource(
				data.map((item) => ({
					key: item.connectionId,
					taskName: item.data.tableName,
					userName: item.username,
					sharedUsername: item.sharedUsername,
					authority: shareTypeConfig[item.shareType],
					shareId: item.shareId,
				}))
			);
		});
	};

	useEffect(() => {
		fetchTableData();
	}, []);

  return (
    <>
      <div style={{fontSize:"16px",fontWeight:"bold",marginTop:"10px"}}>任务共享管理</div>
      <AllTask fetchTableData={fetchTableData} dataSource={dataSource}/>
      <TaskAuthority fetchTableData={fetchTableData} dataSource={dataSource} />
    </>
  );
}
