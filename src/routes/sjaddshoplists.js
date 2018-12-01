import React, { Component } from 'react';
import { NavBar, Toast } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/sjshoplists.css";
// import Navstyles from "./styles/nav.css";
// import iconStyle from "./styles/font.css";
// import HeadIcon from "../assets/images/icon.png";
import Shenqing from "../assets/images/shopImages/goodimg01.png";
// import Bizhong from "../assets/images/user/bizhong.png";
// import Code from "../assets/images/user/code.png";
// import huiyuan from "../assets/images/user/tianjia.png";
// import kefu from "../assets/images/user/kefu.png";
// import jia from "../assets/images/user/jia.png";
// import GoBack from "../assets/images/goback.png";
// import IndexCSS from "../components/IndexCSS";
import * as fetchs from '../utils/fetch';
import store from "store";
export default class sjShopLists extends Component {
    constructor() {
        super();
        this.state = {
            sjlistSever:[]
        };
    }
    componentDidMount(){
        var page= 1;
        var data = {
            page:1,
            size:10,
            shopuid:store.get("userinfo").uid
        }
        ////console.log(data)
        fetchs.creat_Token(fetchs.APIHost + '/goods', fetchs.getAuth('/goods'), JSON.stringify(data)).then(response => response.json())
            .then(json => {
            ////console.log(json)
                if (json.code == 1) {
                    //Toast.success(json.msg, 2);
                   
                    if (json.data.items.length < 1){
                        Toast.fail("暂无记录", 2); 
                        return false;
                    }
                    this.setState({ sjlistSever: json.data.items })
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
        //console.log(this.state.sjlistSever)
        return (
            
            <div>
                <style>
                    {`
                        
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
                        上传记录
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <ul className={styles.sjShopLists}>
                       
                        {/* <li>
                            <p className={styles.sjShopLists1}>
                                <span>苹 果</span>
                                <span>2018-01-02</span>
                            </p>
                            <p className={styles.sjShopLists2}>
                                <span>产 品 名</span>

                            </p>
                            <p className={styles.sjShopLists3}>
                                <span>售价</span>
                                <span>     201</span>
                            </p>
                            <p className={styles.sjShopLists4}>
                                <img src={Shenqing} alt=""/>
                                <img src={Shenqing} alt=""/>
                                <img src={Shenqing} alt=""/>
                            </p>
                            <p className={styles.sjShopLists5}>
                                <span>审 核 结 果：</span><span>失败</span>
                               
                            </p>
                            <p style={{ fontSize:".24rem"}}>
                                <span>失败原因：</span>
                                <span style={{ color: "#fa8080" }}>失败</span>
                            </p>
                        </li> */}
                        {
                            this.state.sjlistSever.length > 0 ? this.state.sjlistSever.map(function(res,index){
                                
                                return <li key={index}>
                                    <p className={styles.sjShopLists1}>
                                        <span>{res.goods_name}</span>
                                        <span>{res.update_time}</span>
                                    </p>
                                    <p className={styles.sjShopLists2}>
                                        <span>描述：</span>
                                        <span>{res.goods_note}</span>

                                    </p>
                                    <p className={styles.sjShopLists3}>
                                        
                                        <span >现价:</span>
                                        <span style={{ color: "red" }}>￥     {res.sales}</span>
                                    </p>
                                    <p className={styles.sjShopLists4}>
                                        
                                        <img src={fetchs.APIHost + res.goods_pic} alt="" />
                                        
                                        

                                    </p>
                                    <p className={styles.sjShopLists5}>
                                        <span>审 核 结 果：</span><span style={{ color: "green" }}>{
                                            
                                            res.status == 1 ? "审核成功" : res.status == -2 ? "系统驳回" : res.status == -1 ? "产品下架" : res.status == 0 ?"审核中":"无状态"
                                        }</span>

                                    </p>
                                    <p style={{ fontSize: ".24rem", color: "#fa8080" }}>
                                        {res.status == -2 ? res.note:""}
                                        
                                    </p>
                                </li>
                            }):""
                        }


                    </ul>
                </div>
            </div>
        )
    }
}