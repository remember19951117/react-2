import React, { Component } from 'react';
import { NavBar, Result, Icon } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/shopresult.css";
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

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
export default class Change extends Component {
    constructor() {
        super();
        this.state = {

        };
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
                        .am-result{
                            margin-top:.4rem;

                            height:1.6rem;

                        }
                        .am-result img{
                            height:100%;
                            width:1.03rem;
                        }
                        .am-result .am-result-title, .am-result .am-result-message{
                            font-size:.32rem;
                        }
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    // icon={
                    //     <img src={GoBack} style={{ height: ".38rem" }}></img>
                    // }
                    // onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        支付页
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <Result
                        // img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                        title="支付成功"
                        // message={<div>998.00元</div>}
                    />
                    <div className={styles.changego}>
                        <div onClick={() => { history.push("/userorderlists")}}>
                            查看订单列表
                        </div>
                        <div style={{ height: "2%", lineHeight: "2.4rem", textAlign: "center",float:"left"}}>|</div>
                        <div onClick={() => { history.push("/ShopIndex") }}>
                            返回商品首页
                    </div>
                    </div>
                </div>
                
            </div>
        )
    }
}