import React, { Component } from 'react';
import { NavBar, Toast } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/profit.css";
import * as fetchs from '../utils/fetch';
// import Navstyles from "./styles/nav.css";
// import iconStyle from "./styles/font.css";
// import HeadIcon from "../assets/images/icon.png";
// import Shenqing from "../assets/images/user/shenqing.png";
// import Bizhong from "../assets/images/user/bizhong.png";
// import Code from "../assets/images/user/code.png";
// import huiyuan from "../assets/images/user/tianjia.png";
// import kefu from "../assets/images/user/kefu.png";
// import jia from "../assets/images/user/jia.png";
// import GoBack from "../assets/images/goback.png";
// import IndexCSS from "../components/IndexCSS";


export default class Change extends Component {
    constructor() {
        super();
        this.state = {

        };
    }
    pay(){
        const username = this.refs.username.value;
        const yue = this.refs.yue.value;
        const password = this.refs.password.value;
        var that = this;
        if (username == "") {
            Toast.offline("充值账户不能为空!", 2);
            return;
        }
        if (yue == "") {
            Toast.offline("数量不能为空!", 2);
            return;
        }
        if (yue<0) {
            Toast.offline("数量不能为负!", 2);
            return;
        }
        if (password == "") {
            Toast.offline("支付密码不能为空!", 2);
            return;
        }
        const data={
            tel: username,
            num :yue,
            s_pwd: password
        }
        //console.log("post",data)
        fetchs.creat_Token(fetchs.APIHost + "/agent/user", fetchs.getAuth("/agent/user"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                //console.log("出售记录", json)
                if (json.code == 1) {
                    Toast.success(json.msg, 2);
                    
                    that.refs.username.value = ''
                    that.refs.yue.value = ''
                    that.refs.password.value = ''
                } else {
                    Toast.fail(json.msg, 2);
                }
        });
    }
    render() {
        const { history } = this.props;
        const NavbarProps = {
            history
        }
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
                        <img src={GoBack} style={{ height: ".38rem" }}></img>
                    }
                    onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        用户充值
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.KRTitle}>KR币充值</div>
                                    <div className={styles.KRcont} style={{height:"5.2rem"}}>
                                        <ul className={styles.KRlists}>
                                           <li>
                                               <p>充值账户</p>
                                                <input placeholder="请输入充值账户手机号" ref="username"/>
                                           </li>
                                            <li style={{marginTop:".2rem"}}>
                                                <p>数量</p>
                                                <input placeholder="请输入数量"  ref="yue"/>
                                            </li>
                                            <li style={{ marginTop: ".2rem" }}>
                                                <p>支付密码</p>
                                                <input placeholder="请输入二级密码" type="password" ref="password"/>
                                            </li>
                                       </ul>
                                        <div className={styles.KRBottom} style={{ marginTop: "1.2rem" }}>
                                            <button onClick={this.pay.bind(this)}>充值</button>
                                        </div>
                     </div>
                </div>
            </div>
        )
    }
}