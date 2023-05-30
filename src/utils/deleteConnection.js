import api from "../utils/api";
import {message, Modal} from "antd";

const {confirm} = Modal;

export default function deleteConnection(id, callbackFns) {
    confirm({
        title: "即将删除任务！",
        content: "删除任务后该任务无法恢复，是否继续？",
        onOk() {
            console.log('ok');
            api.deleteConnection({
                "connectionId": id
            }).then(
                (res) => {
                    console.log(res);
                    callbackFns.forEach(element => {
                        element()
                    });;
                    
                }
            ).catch((err) => {
                message.error(err.msg)
            });
        },
        onCancel() {
            console.log("Cancel");
        },
        okText: "确定",
        cancelText: "取消"
    });
}