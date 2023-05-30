const router = [
    {
        name: "login",
        path: "/user/login"
    },
    {
        name: "register",
        path: "/user/register"
    },
    {
        name: "checkUsername",
        path: "/user/checkUsername"
    },
    {
        name: "getConnection",
        path: "/user/getConnection",
        meta: {
            permission: true
        }
    },
    {
        name: "chooseToken",
        path: "/user/chooseConnection",
        meta: {
            permission: true
        }
    },
    {
        name: "getLink",
        path: "/import/getLink",
        meta: {
            permission: true
        }
    },
    {
        name: "createConnection",
        path: "/user/createConnection",
        meta: {
            permission: true
        }
    },
    {
        name: "uploadData",
        path: "/import/getProperty",
        meta: {
            permission: true
        }
    },
    {
        name: "importProperty",
        path: "import/importPropertyByLine",
        meta: {
            permission: true
        }
    },
    {
        name: "addData",
        path: "/import/addDataByLine",
        meta: {
            permission: true
        }
    }
];
export default router;
