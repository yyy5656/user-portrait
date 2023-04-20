import {
  Modal,
  Button,
  Select,
  Input,
  InputNumber,
  Checkbox,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "@/styles/AddChar.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  transfromLinkToSelect,
  transfromSeleToList,
  getBasicBarData,
} from "@/utils/utils";
import { getCharOption } from "./constant";
import api from "@/utils/api";

export default function IntervalDataGroup(props) {
  console.log(props);
  const [groupList, setGroupList] = useState([]);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  return (
    <>
      <div>
        <div>
          分组：
          <Button
            type="primary"
            onClick={() => {
              setGroupList([...groupList, {}]);
            }}
          >
            添加分组
          </Button>
        </div>
        {groupList &&
          groupList.map((item, index) => (
            <div className={styles.interval_group} key={index}>
              <Input
                placeholder="输入分组名"
                style={{ width: "130px", marginRight: "20px" }}
                onChange={(e) => {
                  const newGourpList = [...groupList];
                  newGourpList[index].name = e.target.value;
                  setGroupList(newGourpList);
                }}
              />
              <InputNumber
                onChange={(value) => {
                  const newGourpList = [...groupList];
                  newGourpList[index].start = value;
                  setGroupList(newGourpList);
                }}
              />
              <InputNumber
                onChange={(value) => {
                  const newGourpList = [...groupList];
                  newGourpList[index].end = value;
                  setGroupList(newGourpList);
                }}
              />
              <Button
                onClick={() => {
                  debugger;
                  api
                    .getNumerical({
                      start: groupList[index].start,
                      end: groupList[index].end,
                      link: props.selectProperty[0],
                    })
                    .then((res) => {
                      groupList[index].value = res.data.data;
                      props.changeCharListGroup(groupList);
                    });
                  message.success("添加成功");
                }}
              >
                确认添加
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}
