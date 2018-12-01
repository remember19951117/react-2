import React, { Component } from 'react';
import { NavBar, List } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/mine.css";
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
const Item = List.Item;
// const Brief = Item.Brief;

export default class Change extends Component {
    constructor() {
        super();
        this.state = {

        };
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
                       .am-list-item{
                           height:0.89rem;
                           margin-top:.3rem;
                          
                       }
                       .am-list-body{
                            background-color:#f2f2f2;
                       }
                       .am-list-item .am-list-line .am-list-content{
                        font-size:.32rem;
                       }
                       .am-list-item .am-list-line .am-list-arrow{
                           width：.3rem;
                           height:.3rem;
                       }
                        .am-toast-text-info{
		                    font-size:.26rem;
		                    line-height:.52rem;
		                }
		                .am-toast-notice-content .am-toast-text.am-toast-text-icon {
		                    border-radius: .15rem;
		                    padding: .25rem .15rem ;
		                }
		                .am-toast-notice-content .am-toast-text{
                            width:1.5rem;
                            height:2rem;
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
                        个人设置
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <List  className="my-list">
                        <Item arrow="horizontal" multipleLine onClick={() => history.push("/settingpsw")}>
                            修改密码 
                        </Item>
                        
                        <Item arrow="horizontal" multipleLine onClick={() => history.push("/settingtwopsw")}>
                            修改支付密码
                        </Item>
                       
                        <Item arrow="horizontal" multipleLine onClick={() => history.push("/settingzfb")}>
                            修改支付宝账号
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => history.push("/settingwx")}>
                            修改微信账号
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => history.push("/settingbank")}>
                            修改银行卡
                        </Item>
                        <Item arrow="horizontal" multipleLine onClick={() => history.push("/settingheaderimg")}>
                            修改头像
                        </Item>
                    </List>
                </div>
            </div>
        )
    }
}