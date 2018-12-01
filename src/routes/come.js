import React, { Component } from 'react';
import { NavBar } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
// import Titleing from "../assets/images/title.png";
// import $ from "jquery";
// import ReactDOM from 'react-dom';
import * as fetchs from '../utils/fetch';

// import { Tree } from 'antd';
import styles from "./styles/shopIndex.css";
// import iconStyle from "./styles/font.css";




export default class Teme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
            goodsdata:[]
        };
    }


    componentDidMount() {
        const goodsid = this.props.location.search.replace("?pid=", "");
        var userdata = {
            pid: goodsid,
        }
        //console.log("Post", userdata)
        fetchs.creat_Token(fetchs.APIHost + "/user/team", fetchs.getAuth("/user/team"), JSON.stringify(userdata)).then(response => response.json())
            .then(json => {
                //console.log("推荐人", json)
                this.setState({ goodsdata: json.data.items })
            });
    }

    tap(res){
        //console.log(res)
        var userdata = {
            pid: res,
        }
        //console.log("Post", userdata)
        fetchs.creat_Token(fetchs.APIHost + "/user/team", fetchs.getAuth("/user/team"), JSON.stringify(userdata)).then(response => response.json())
            .then(json => {
                //console.log("推荐人", json)
                this.setState({ goodsdata: json.data.items })
        });
    }
    render() {
        const { history } = this.props;
        // const NavbarProps = {
        //     history
        // }
        var goodsdata = this.state.goodsdata
        //console.log("goodsdata", goodsdata)
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
                    style={{ height: "7vh", background: "#00a3f0" }}
                    mode="light"
                    icon={
                       <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    }
                     onLeftClick={() => history.goBack()}
                    // rightContent={
                    //     [<div>
                    //         <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem" }}>
                    //             &#xe757;
                    //         </span>
                    //         <span style={{ fontSize: "0.3rem", lineHeight: '7vh' }} onClick={() => history.push("/Teamlists")}>收益记录</span>
                    //     </div>
                    //     ]
                    // }
                >


                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        直推列表
                    </span>
                </NavBar>
                {/*main Start*/}
                <div className={styles.remTitle}>
                    点击姓名可以看会员直推，<span style={{ color: "#00a3f0", margin: "0 0.2rem" }}>
                    
                   
                        {goodsdata.length > 0?goodsdata[0].user_parent.name:"他"}
                    </span>的直推有<span style={{ color: "#00a3f0", margin: "0 0.2rem" }}>{goodsdata.length}</span>人.
                </div>
                <div className={styles.remCont}>
                    <table className={styles.remTab}>
                        <tr>
                            <th>姓名</th>
                            <th>账号</th>
                            <th>直推日期</th>
                            {/* <th>收益</th> */}
                        </tr>
                        {
                            goodsdata.length > 0 ? goodsdata.map(i => {
                                return <tr onClick={() => this.tap(i.uid)} key={i.pid}>
                                    <td>{i.name}</td>
                                    <td>{i.tel}</td>
                                    <td>{i.create_time}</td>
                                    {/* <td>100糖果币</td> */}
                                </tr>
                            }) : ""
                        }
                    </table>
                </div>
                {/*main End*/}
                
            </div>
        )
    }
}