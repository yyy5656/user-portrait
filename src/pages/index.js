import React, {useState, useRef, useEffect} from "react";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";

import styles from "@/styles/Login.module.css";
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import {RULES} from "@/utils/constant";
import api from "@/utils/api";

// Login
 function Login() {
    // Ref
    const _pre_box = useRef(null);
    const route = useRouter();

    // State
    const [flag, setFlag] = useState(true); // 登录或注册？
    const [imgSrc, setImgSrc] = useState("/img/login.png"); // 图片地址

    // method
    /**
     * 登录
     * @param values 从表单中获取的数据
     */
    const login = (values) => {
        const output = {
            username: values.login_username,
            password: values.login_password
        };
        api.login(output).then(
            (res) => {
                if (res.data.data === "用户名或密码错误") {
                    message.error("账号或密码错误");
                } else {
                    // 放入token
                    localStorage.setItem("token", res.data.data);
                    // 跳转界面
                    route.replace({pathname: "/home", query: {}});
                    // 登录成功
                    message.success("登录成功！");
                }
            }
        );
    };

    /**
     * 注册
     * @param values
     */
    const register = (values) => {
        const output = {
            username: values.register_username,
            password: values.register_password
        };
        const promise = new Promise((resolve, reject) => {
            // 校验用户名是否相同
            api.checkUsername({username: values.register_username}).then(
                (res) => {
                    console.log(res);
                    if (res.data.code === 400) {
                        message.error("用户名已被注册");
                        reject();
                    } else {
                        resolve();
                    }
                }
            );
            // 校验密码是否相同
            if (values.register_password !== values.confirmPassword) {
                message.error("密码不相同，请重新设置密码！");
                return false;
            }
        }).then(
            () => {
                api.register(output).then(
                    (res) => {
                        if (res.data.code === 201) {
                            message.success("注册成功，请返回登录界面登录！");
                            mySwitch();
                            return true;
                        } else {
                            return false;
                        }
                    }
                );
            },
            () => {
                return false;
            }
        );
    };

    /**
     * 切换登录与注册页面
     */
    const mySwitch = () => {
        let pre_box = _pre_box.current;
        if (flag) {
            pre_box.style.cssText = "transform: translateX(100%) ";
            pre_box.style.backgroundColor = "#c9e0ed";
            setImgSrc("/img/register.jpg");
        } else {
            pre_box.style.cssText = "transform: translateX(0%) ";
            pre_box.style.backgroundColor = "#edd4dc";
            setImgSrc("/img/login.png");
        }
        setFlag(!flag);
    };

    const onFinishFailed = () => {
        message.error("提交失败，请检查输入是否正确！");
        return false;
    };

    useEffect(() => {
        // 如果有token，则不允许停留在login界面。
        if (localStorage.getItem("token")) {
            route.replace({pathname: "/home", query: {}});
        }
    }, []);

    return (
        <>
            <Head>
                <title>欢迎！</title>
                <meta name="description" content="Student Portrait System"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <style jsx>{`
                  body {
                    display: flex;
                    overflow-x: hidden;
                    background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
                  }
                `}</style>
            </Head>
            <main>
                <div className={styles.big_box}>
                    <div className={styles.box}>
                        {/*遮罩盒子*/}
                        <div className={styles.pre_box} ref={_pre_box}>
                            <h1>WELCOME</h1>
                            <p>JOIN US!</p>
                            <div className={styles.img_box}>
                                <Image id="img" src={imgSrc} priority={true} alt={""}
                                       width={200} height={200}
                                />
                            </div>
                        </div>
                        {/*注册盒子*/}
                        <div className={styles.register_form}>
                            <div className={styles.title_box}>
                                <h1>注册</h1>
                            </div>
                            <Form
                                size={"middle"}
                                onFinish={register}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    name={"register_username"}
                                    className={styles.input_box}
                                    rules={RULES.register_username}
                                >
                                    <Input
                                        prefix={<UserOutlined/>}
                                        className={styles.input}
                                        type="text"
                                        placeholder="用户名"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={"register_password"}
                                    className={styles.input_box}
                                    rules={RULES.register_password}
                                >
                                    <Input
                                        prefix={<LockOutlined/>}
                                        className={styles.input}
                                        type="password"
                                        placeholder="密码"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={"confirmPassword"}
                                    className={styles.input_box}
                                    rules={RULES.confirmPassword}
                                >
                                    <Input
                                        prefix={<LockOutlined/>}
                                        className={styles.input}
                                        type="password"
                                        placeholder="确认密码"
                                    />
                                </Form.Item>
                                <Form.Item className={styles.btn_box}>
                                    <Button className={styles.button}
                                            htmlType={"submit"}
                                    >注册</Button>
                                    {/*绑定点击事件*/}
                                    <p onClick={mySwitch}>已有账号？去登录</p>
                                </Form.Item>
                            </Form>
                        </div>

                        {/*登录盒子*/}
                        <div className={styles.login_form}>
                            {/*标题盒子*/}
                            <div className={styles.title_box}>
                                <h1>登录</h1>
                            </div>
                            {/*输入框盒子*/}
                            <Form
                                size={"middle"}
                                onFinish={login}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    className={styles.input_box}
                                    name={"login_username"}
                                    rules={RULES.login_username}
                                >
                                    <Input
                                        prefix={<UserOutlined/>}
                                        className={styles.input}
                                        type="text"
                                        placeholder={"用户名"}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className={styles.input_box}
                                    name={"login_password"}
                                    rules={RULES.login_password}
                                >
                                    <Input
                                        prefix={<LockOutlined/>}
                                        className={styles.input}
                                        type="password"
                                        placeholder={"密码"}
                                    />
                                </Form.Item>
                                <Form.Item
                                    className={styles.btn_box}
                                >
                                    <Button className={styles.button}
                                            htmlType={"submit"}
                                    >登录</Button>
                                    {/*绑定点击事件*/}
                                    <p onClick={mySwitch}>没有账号？去注册</p>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;