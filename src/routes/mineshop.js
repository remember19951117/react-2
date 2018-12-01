import React, { Component } from 'react';
import { NavBar, List } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/mine.css";
import jiao1 from "../assets/images/user/jiaoyijilu.png";
import jia from "../assets/images/user/jia.png";
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
                        p{
                        margin-bottom:0;
                    }
                        .am-list-body{
                            background:#f2f2f2;
                        }
                        .am-list-item{
                           height:.89rem;
                           margin-top:0.18rem;
                        } 
                        .am-list-item img{
                           width:.32rem;
                           height:.32rem;
                        }
                        .am-list-item .am-list-line .am-list-content{
                           font-size:.32rem;
                        }
                        .am-list-item .am-list-line .am-list-arrow{
                        width:.34rem;
                        height:.34rem;    
                        }
                        .am-modal-transparent .am-modal-content{
                            padding:0;
                             border-radius:.2rem;
                        }
                        .am-modal-transparent{
                            width:700px;
                        }
                        .am-modal-header{
                            padding:0;
                            height:.75rem;
                            color：#FFF;
                            
                            background:#00a3f0;
                        }
                        .am-modal-title{
                            line-height:.75rem;
                            color: #FFF;
                            font-size:.28rem;
                        }
                        .am-modal-body{
                            height:2.1rem;
                            line-height:2.1rem;
                            font-size:.26rem;
                            color:#000000;
                        }
                        .am-modal-button-group-h .am-modal-button{
                            height:0.8rem;
                            line-height:0.8rem;
                            background:#00a3f0;
                            width:2.88rem;
                            color:#FFF;
                            font-size:.26rem;
                        }
                        .am-modal-button-group-h .am-modal-button:first-child{
                            color:#FFF;
                        }
                        .am-radio{
                            width:.28rem;
                            height:.28rem;
                            border:1px solid #00a3f0;
                            border-radius:50%;
                        }
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
                        商家管理
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.shopmeauwrap}>
                        <List>
                           
                            <Item
                                thumb={jia}
                                
                                onClick={() => history.push("/sjshop")}
                                arrow="horizontal"
                            >
                                添加商品
                            </Item>
                            <Item
                                thumb={jiao1}
                                onClick={() => history.push("/mineshoporder")}
                                arrow="horizontal"
                            >
                                订单管理
                            </Item>
                            
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}