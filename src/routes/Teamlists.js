import React, { Component } from 'react';
import { NavBar } from "antd-mobile";
// import Titleing from "../assets/images/title.png";
// import $ from "jquery";
// import ReactDOM from 'react-dom';
import GoBack from "../assets/images/goback.png";


import styles from "./styles/shopIndex.css";
import iconStyle from "./styles/font.css";




export default class Teme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
        };
    }


    componentDidMount() {
       
    


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
                        .am-pull-to-refresh-indicator{
                            font-size:.26rem;
                        }
                        .am-pull-to-refresh-content-wrapper{
                            margin-bottom:2rem;
                        }
                        .am-navbar-left-icon{
                            color:#FFFFFF;
                        }
                        .am-navbar-right{
                            color:#FFFFFF;
                        }
                    `}
                </style>
               
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    icon={
                        <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    }
                    onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        收益记录
                    </span>
                </NavBar>
                {/*main Start*/}
                <div style={{height:"0.1rem"}}>
                    
                </div>
                <div className={styles.remCont}>
                    <table  className={styles.remTab}>
                        <tr>
                            <th>姓名</th>
                            <th>账号</th>
                            <th>收益类型</th>
                            <th>收益</th>
                        </tr>
                        
                    </table>
                </div> 
                {/*main End*/}
                <div className={styles.nav}>
                    <ul className={styles.navlists}>
                        <li onClick={() => history.push("/index")}>
                            <p className={iconStyle.iconfont} style={{}}>&#xe626;</p>
                            <p>首页</p>
                        </li>
                        <li onClick={() => history.push("/ShopIndex")} >
                            <p className={iconStyle.iconfont} style={{}}>&#xe624;</p>
                            <p>商城</p>
                        </li>
                        <li onClick={() => history.push("/Team")} className={styles.active}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe61c;</p>
                            <p>团队</p>
                        </li>
                        <li onClick={() => history.push("/Profit")}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.44rem" }}>&#xe757;</p>
                            <p>转账</p>
                        </li>
                        <li onClick={() => history.push("/Mine")}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe60d;</p>
                            <p>我的</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}