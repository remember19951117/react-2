import React, { Component } from 'react';
import {  NavBar } from "antd-mobile";
// import Titleing from "../assets/images/title.png";
// import $ from "jquery";
// import ReactDOM from 'react-dom';


// import { Tree } from 'antd';
import styles from "./styles/shopIndex.css";
import iconStyle from "./styles/font.css";
import * as fetchs from '../utils/fetch';

import store from "store";

export default class Teme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
            goodsdata:[],
        };
    }


    componentDidMount() {
        var userdata ={
            pid:store.get("userinfo").uid,
        }
       // console.log("Post", userdata)
        fetchs.creat_Token(fetchs.APIHost + "/user/index", fetchs.getAuth("/user/index"), JSON.stringify(userdata)).then(response => response.json())
            .then(json => {
                console.log("推荐人", json.data)
                this.setState({ goodsdata: json.data.items })
        });
    


    }


    render() {
        const { history } = this.props;
        // const NavbarProps = {
        //     history
        // }
        var goodsdata = this.state.goodsdata;
        //console.log(goodsdata)
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
                    style={{ height: "7vh", background: "#00a3f0"}}
                    mode="light"
                //    rightContent={
                //         [<div>
                //             <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem" }}>
                //                 &#xe757;
                //             </span>
                //            <span style={{ fontSize: "0.3rem", lineHeight: '7vh' }} onClick={() => history.push("/Teamlists")}>收益记录</span>
                //         </div>
                //         ]
                //     }
                >


                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        团队
                    </span>
                </NavBar>
                {/*main Start*/}
                <div className={styles.remTitle}>
                    点击姓名可以看会员直推，你的直推有<span style={{ color: "#00a3f0", margin: "0 0.2rem" }}>{goodsdata ? goodsdata.length:0}</span>人.
                </div>
                <div className={styles.remCont}>
                    <table  className={styles.remTab}>
                        <tr>
                            <th>姓名</th>
                            <th>账号</th>
                            <th>直推日期</th>
                            {/* <th>收益</th> */}
                        </tr>
                        {/* <tr>
                            <td onClick={() => history.push("/come")}>聚格</td>
                            <td>JUge</td>
                            <td>2017.17.12</td>
                            <td>100糖果币</td>
                        </tr> */}
                        {/* <tr onClick={() => history.push("/come")}>
                            <td>聚格</td>
                            <td>JUge</td>
                            <td>2017.17.12</td>
                            <td>100糖果币</td>
                        </tr> */}
                        {
                            goodsdata.length > 0 ? goodsdata.map(i=>{
                                return <tr onClick={() => history.push("/come?pid=" + i.uid)} key={i.pid}>
                                   <td>{i.name}</td>
                                   <td>{i.tel}</td>
                                   <td>{i.update_time}</td>
                                    {/* <td>100糖果币</td> */}
                                </tr>
                            }):""
                        }
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