import React, { Component } from 'react';
import { NavBar, Toast } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/shopend.css";
import store from "store";
import iconStyle from "./styles/font.css";
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
// import GoodsImg2 from "../assets/images/shopImages/goodimg01.png";

export default class Change extends Component {
    constructor() {
        super();
        this.state = {
            orderdata:'',
            userinfo:''
        };
    }
    sure(){
        const {history} = this.props;
         const data ={
             orderid: store.get("orderid"),
             note: this.refs.note.value,
         }
        //console.log("post",data)
        fetchs.creat_Token(fetchs.APIHost + "/order/pay", fetchs.getAuth("/order/pay"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                 //this.setState({ orderdata: json.data.detail })
                //console.log("订单", json)
                if (json.code == 1) {
			
                    Toast.success(json.msg, 2);
                    history.push("/shopresult");
                    } else {
                    Toast.fail(json.msg, 2);
                    }
            });
        
    }
    componentDidMount(){
        //请求订单数据
        const data ={
            orderid: store.get("orderid")
        }
        //console.log("post", data)
        fetchs.creat_Token(fetchs.APIHost + "/order/get", fetchs.getAuth("/order/get"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                 //console.log("订单", json.data)
                this.setState({ orderdata: json.data.detail})
               
            });
        //请求用户信息
        fetchs.read_Token(fetchs.APIHost + '/user/get', fetchs.getAuth('/user/get')).then(response => response.json())
            .then(json => {
                ////console.log("地址", json)
                this.setState({ userinfo: json.data })
        });
    }
    render() {
        const { history } = this.props;
        const orderdata = this.state.orderdata;
        ////console.log("商品信息", orderdata)
        var goodsinfo= store.get("all")
       // //console.log("goodsinfo", goodsinfo)
        var userinfo = this.state.userinfo;
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
                        <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    }
                    onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        确认订单
                    </span>
                </NavBar>

                <div className={styles.addresstop}>
                    <p>
                        <span>收货人:</span>
                        <span>{userinfo.name}</span>
                    </p>
                    <p>
                        <span>{userinfo.tel}</span>
                    </p>
                </div>
                <div className={styles.addresscenter}>
                    <div>
                        <span className={iconStyle.iconfont}>&#xe633;</span>
                    </div>
                    <div className={styles.addresscenter} style={{textAlign:"left"}}>
                        {/* 深圳市南山区科技园南区R2-B三楼步步高duyidan(收) */}
                        {
                            "详细地址："+userinfo.area_name + userinfo.address
                        }
                    </div>
                </div>
                {/* <div className={styles.addressbottom} onClick={() => history.push("/changeaddress")}>
                    <span>修改地址   ></span>
                </div> */}
                <div style={{ height: "0.15rem" }}>

                </div>
               
                {
                    orderdata.length > 0 ? orderdata.map(i=>{
                     return   <div className={styles.goodsdetail}>
                            <div style={{ height: "0.15rem", background: "#ffffff" }}>

                            </div>
                            <div className={styles.goodsimgwrap}>
                                <img
                                    src={fetchs.APIHost + i.goods_pic}
                                    alt=""
                                />
                            </div>
                            <div className={styles.goodsinfo}>
                                <p>
                                    {/* 成真1:32宝马M3奥迪R8LMS赛车 仿真声光开门回力合金汽车模型玩具 */}
                                    {i.goods_name}
                                </p>
                                <p>
                                    <span>选择:   </span>
                                    <span>
                                        {/* 黑色 F */}
                                        {i.sku_name}
                                    </span>
                                </p>
                                <p>
                                    <span>￥:</span><span>
                                        {i.sku_price}
                                    </span>
                                    <span style={{ marginLeft: "3.18rem", color: "#333333" }}>×</span><span style={{ color: "#333333" }}>
                                        {i.goods_num}
                                    </span>
                                </p>
                            </div>
                        </div>
                    }):""
                }


                <div style={{ height: "0.15rem"}}>

                </div>
                <div className={styles.song}>
                    <span>配送方式</span>
                    <span>包邮</span>
                </div>
                <div style={{ height: "0.15rem"}}>

                </div>
                <div className={styles.liuyan}>
                    <span>留言:</span>
                    <input placeholder="给商家留言" ref="note"/>
                </div>
                <div style={{ height: "0.15rem"}}>

                </div>
                <div className={styles.suerorder}>
                    <div>
                        <span>总计：</span>
                        <span style={{ color: "red" }}>{goodsinfo}</span>
                        <span style={{ color: "red" }}>商城币</span>
                    </div>
                    <div onClick={this.sure.bind(this)}>
                        <span>结算</span>
                    </div>
                </div>
            </div>
        )
    }
}