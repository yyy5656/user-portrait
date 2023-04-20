import QS from "qs";
import HTTP from "@/service/request";

const api = {
  /**
   * 注册
   * @param data
   * @returns {*}
   */
  login(data) {
    return HTTP({
      url: "/user/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 注册前异步调用的接口，查看注册 username 是否会存在
   * @param data
   * @returns {*}
   */
  checkUsername(data) {
    return HTTP({
      url: "/user/checkUsername",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 注册
   * @param data
   * @returns {*}
   */
  register(data) {
    return HTTP({
      url: "/user/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 查看已存在任务
   * @returns {*}
   */
  getConnection() {
    return HTTP({
      url: "/user/getConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 删除任务
   * @param data
   * @returns {*}
   */
  deleteConnection(data) {
    return HTTP({
      url: "/user/deleteConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 获取已存在 connection 的 token（使用该 token 调用该任务的内容查询）
   * @param data
   * @returns {*}
   */
  chooseConnection(data) {
    return HTTP({
      url: "/user/chooseConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 获得指定任务已导入的属性和已导入数据行数
   * @returns {*}
   */
  getLink() {
    return HTTP({
      url: "/import/getLink",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 创建任务（与后面接口先后调用）
   * @param data
   * @returns {*}
   */
  createConnection(data) {
    return HTTP({
      url: "/user/createConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 上传文件并返回属性字段（使用上一个接口的新 token，前后调用）
   * @param data
   * @returns {*}
   */
  getProperty(data) {
    return HTTP({
      url: "/import/getProperty",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // TODO 试试这个？
      },
      data,
    });
  },

  /**
   * 导入已选属性
   * 与上一个接口前后调用
   * 参数来源上个属性的选择，start 最低为 2，end 最高为 dataline 的值
   * @param data
   * @returns {*}
   */
  importPropertyByLine(data) {
    return HTTP({
      url: "/import/importPropertyByLine",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 删除任务的属性
   * @param data
   * @returns {*}
   */
  removeProperty(data) {
    return HTTP({
      url: "/import/removeProperty",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 补充新的属性
   * 与 9 号接口前后调用，参数来自 9 号接口和 7 接口.
   * @param data
   * @returns {*}
   */
  addData(data) {
    return HTTP({
      url: "/import/addDataByLine",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  // createGroup(data) {
  //     return HTTP({
  //         url: "/data/createGroup",
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json;charset=UTF-8"
  //         },
  //         data
  //     });
  // },
  // deleteGroup(data) {
  //     return HTTP({
  //         url: "/data/deleteGroup",
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json;charset=UTF-8"
  //         },
  //         data
  //     });
  // },
  // getGroups(data) {
  //     return HTTP({
  //         url: "/data/getGroups",
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json;charset=UTF-8"
  //         },
  //         data
  //     });
  // },
  //
  // getAllData(data) {
  //     return HTTP({
  //         url: "/data/getAllData",
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json;charset=UTF-8"
  //         },
  //         data
  //     });
  // },
  //  getDataByLinks(data) {
  //     return HTTP({
  //         url: "/data/getDataByLinks",
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json;charset=UTF-8"
  //         },
  //         data
  //     });
  // }

  getAllData(data) {
    return HTTP({
      url: "/data/getAllData",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  getDataByLinks(data) {
    return HTTP({
      url: "/data/getDataByLinks",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  getLinksByType() {
    return HTTP({
      url: "/data/getLinksByType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  getNouns(data) {
    return HTTP({
      url: "/data/getNouns",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  getNumerical(data) {
    return HTTP({
      url: "/data/getNumerical",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  insertViewInfo(data) {
    return HTTP({
      url: "/data/insertViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  getViewInfo() {
    return HTTP({
      url: "/data/getViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  deleteViewInfo(data) {
    return HTTP({
      url: "/data/deleteViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  getSharedConnection() {
    return HTTP({
      url: "/share/getSharedConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  getConnectionsByType(data) {
    return HTTP({
      url: "/share/getConnectionsByType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  getOtherALlUser() {
    return HTTP({
      url: "/share/getOtherALlUser",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  getShareList() {
    return HTTP({
      url: "/share/getShareList",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  changeConnectionType(data) {
    return HTTP({
      url: "/share/changeConnectionType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  deleteShareById(data) {
    return HTTP({
      url: "/share/deleteShareById",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
};

export default api;
