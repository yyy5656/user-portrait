import QS from "qs";
import HTTP from "@/service/request";

const api = {
    login(data) {
        return HTTP({
            url: "/user/login",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    checkUsername(data) {
        return HTTP({
            url: "/user/checkUsername",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    register(data) {
        return HTTP({
            url: "/user/register",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    getConnection() {
        return HTTP({
            url: "/user/getConnection",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        });
    },

    chooseToken(data) {
        return HTTP({
            url: "/user/chooseConnection",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    getLink() {
        return HTTP({
            url: "/import/getLink",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        });
    },

    createConnection(data) {
        return HTTP({
            url: "/user/createConnection",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    uploadData(data) {
        return HTTP({
            url: "/import/getProperty",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // TODO 试试这个？
            },
            data
        });
    },

    importProperty(data) {
        return HTTP({
            url: "/import/importPropertyByLine",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    addData(data) {
        return HTTP({
            url: "/import/addDataByLine",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    createGroup(data) {
        return HTTP({
            url: "/data/createGroup",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },
    deleteGroup(data) {
        return HTTP({
            url: "/data/deleteGroup",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },
    getGroups(data) {
        return HTTP({
            url: "/data/getGroups",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },

    getAllData(data) {
        return HTTP({
            url: "/data/getAllData",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    },
     getDataByLinks(data) {
        return HTTP({
            url: "/data/getDataByLinks",
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            data
        });
    }

};

export default api;