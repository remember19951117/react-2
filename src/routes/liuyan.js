import React, { Component } from 'react';
import { NavBar, Toast } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/liuyan.css";
import * as fetchs from '../utils/fetch';
import iconStyle from "./styles/font.css";

export default class Change extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    tap(){
        //console.log(this.refs.title.value)
        var title = this.refs.title.value;
        var content = this.refs.cont.value
        const {history} = this.props;
        //console.log(this.refs.cont.value)
        if (title === "") {
            Toast.fail("标题不能为空", 2)
            return;
        }
        if (content === "") {
            Toast.fail("内容不能为空", 2)
            return;
        }
        const data ={
            title,
            content,

        }
        //console.log("post",data)
        fetchs.creat_Token(fetchs.APIHost + "/msg/add", fetchs.getAuth("/msg/add"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                ////console.log(json)
                if (json.code == 1) {
                    Toast.success(json.msg, 2);
                    this.refs.title.value = '';
                    this.refs.cont.value ='';
                    history.goBack();
                } else {
                    Toast.fail(json.msg, 2);
                }
            });

    }
    render() {
        const { history } = this.props;
        // const NavbarProps = {
        //     history
        // }
        return (
            <div>
                <style>
                    {`
                       .am-toast-text-info{
                    font-size:.26rem;
                    line-height:.52rem;
                }
                .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                    border-radius: .15rem;
                    padding: .25rem .15rem ;
                }
                 
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    icon={
                        <img src={GoBack} style={{ height: ".38rem" }}  alt=""></img>
                    }
                    onLeftClick={() => history.goBack()}
                    rightContent={
                        [<div onClick={() => history.push("/liuyanjilu")} key={"3"}>
                            <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem",color:'#ffffff'}}>
                                &#xe757;
                            </span>
                            <span style={{ fontSize: "0.3rem", lineHeight: '7vh', color: '#ffffff'}}>留言记录</span>
                        </div>
                        ]
                    }
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        留言
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.title}>
                        标题
                    </div>
                    <div className={styles.titleipt}>
                        <input placeholder="请输入标题、关键字" ref="title"/>
                    </div>
                    <div className={styles.title}>
                        内容
                    </div>
                    <div className={styles.titleipt2}>
                        <textarea  placeholder="请输入内容" ref="cont"/>
                    </div>
                    
                        <button onClick={this.tap.bind(this)} className={styles.BTN}>留言</button>
                    
                </div>
            </div>
        )
    }
}