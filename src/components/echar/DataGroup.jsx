import { Modal, Button, Select, Input, InputNumber, Checkbox, message } from "antd";
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

const CheckboxGroup = Checkbox.Group;

export default function DataGroup(props) {
  console.log(props);
  const [groupList, setGroupList] = useState([]);
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
              <CheckboxGroup
                options={JSON.parse(JSON.stringify(props.charData)).map(
                  (item) => ({
                    value: item.value,
                    label: item.name,
                  })
                )}
                onChange={(value) => {
                  console.log(value);
                  const res = value.reduce((pre, cur) => pre + cur, 0);
                  const newGourpList = [...groupList];
                  newGourpList[index].value = res;
                  setGroupList(newGourpList);
                }}
              />
              <Button
                onClick={() => {
                  props.changeCharListGroup(groupList);
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
