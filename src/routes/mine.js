import React,{Component} from 'react';
import { NavBar, List, Modal, Toast } from "antd-mobile";
// import * as user from "../services/user";
import * as fetchs from '../utils/fetch';
import styles from "./styles/mine.css";
// import index, { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import Navstyles from "./styles/nav.css";
import iconStyle from "./styles/font.css";
// import HeadIcon from "../assets/images/icon.png";
import Shenqing from "../assets/images/user/shenqing.png";
import Bizhong from "../assets/images/user/bizhong.png";
import Code from "../assets/images/user/code.png";
import huiyuan from "../assets/images/user/tianjia.png";
import kefu from "../assets/images/user/kefu.png";
import jia from "../assets/images/user/jia.png";
import icon from "../assets/images/icon.png";
import jiao1 from "../assets/images/user/jiaoyijilu.png";
import jiao2 from "../assets/images/user/jiaoyiguanli.png";
import buytg from "../assets/images/buytg.png";
import sdl from "../assets/images/user/sdl.png";
import suser from "../assets/images/user/Suser.png";
import sme from "../assets/images/user/Sme.png";
import liuyan from "../assets/images/liuyan.png";

import gonggao from "../assets/images/gonggao.png";
import $ from "jquery";
import { APIHost } from '../utils/fetch';
var  Item = List.Item;
// const Brief = Item.Brief;
var alert = Modal.alert;
// const RadioItem = Radio.RadioItem;
// import IndexCSS from "../components/IndexCSS";
// const showAlert = () => {
//     const alertInstance = alert('Delete', 'Are you sure???', [
//         { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
//         { text: 'OK', onPress: () => console.log('ok') },
//     ]);
//     setTimeout(() => {
//         // 可以调用close方法以在外部close
//         console.log('auto close');
//         alertInstance.close();
//     }, 500000);
// };

function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
// @connect(state => ({
//     user: state.user
// }))
export default class Mine extends Component {
    constructor() {  
        super();  
        this.state = {
            modal1: true,
            is_agent:'',
            is_shop:'',
            userinfodetail:[],
            web:"",
        };
      }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        var pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    componentDidMount(){
        Toast.loading("加载中", 0);
        var that = this;
        fetchs.read_Token(fetchs.APIHost + '/user/get', fetchs.getAuth('/user/get')).then(response => response.json())
            .then(json => {
                Toast.hide();
               // this.setState({ usercode: json.data.is_agent })
               
                that.setState({
                    is_agent: json.data.is_agent,
                    is_shop: json.data.is_shop,
                    userinfodetail: json.data
                })
                if (json.data.is_agent === 1) {
                    $(".sdl").show()
                }
               //console.log(that.state.is_shop)
                if (json.data.is_shop === 1) {
                    $(".sme").show()
                }
                //请求客户联系方式
                fetchs.read(fetchs.APIHost + '/web').then(response => response.json())
                    .then(json => {
                   // console.log(json)
                    this.setState({web:json.data})   
                })
        });
        
        
        
        // if(){

        // }
    }
    addshop(){
        
        // var { history} = this.props;
        
        // var that = this;
        fetchs.read_Token(fetchs.APIHost + '/user/get', fetchs.getAuth('/user/get')).then(response => response.json())
            .then(json => {
               
                if (json.data.is_shop === 0) {
                    Toast.fail("你还不是商家,请点击申请商家", 2);
                } else {
                    //history.push("/mineshop")
                    alert("请登录商家后台","地址："+fetchs.APIHost+"/shop")

                }
            })
            
             
    }

    render(){
        
        var is_agent = this.state.is_agent;
        var {history} = this.props;
        var userinfo = this.state.userinfodetail;
       // console.log(111, userinfo)
       

        return(
            <div>
                <style>
                    {` p{
                        margin-bottom:0;
                    }
                        .am-list-body{
                            background:#f2f2f2;
                            margin-bottom:2rem;
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
                    style={{ height: "7vh", background: "#00a3f0"}}
                    mode="light"
                    rightContent={
                        [<div key={"1"}>
                            
                            <span style={{ fontSize: "0.3rem", lineHeight: '7vh', color: "#FFFFFF" }} onClick={() => history.push("/setting")}>设置</span>
                        </div>
                        ]
                    }
                >  
                <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        个人中心
                </span>
                </NavBar>
                
                <div className={styles.main}>
                    <div className={styles.topBG}></div>
                    <div className={styles.mineInfo}>
                        <div className={styles.userimg}>
                            <img src={userinfo.headimg ?APIHost + userinfo.headimg:icon} alt=""/>
                        </div>
                        <div className={styles.userdetail}>
                            <div className={styles.userdetailLeft}>
                                <p className={iconStyle.iconfont} style={{ fontSize: "0.32rem", color:"#059fe8" }}>&#xe60d;</p>
                                <p style={{ fontSize: "0.26rem" }}>{userinfo.name}</p>
                                <p style={{ fontSize: "0.32rem", color: "#b5b5b5"}}>
                                    <span className={iconStyle.iconfont} style={{ fontSize: "0.32rem"}}>&#xe621;</span>
                                    <span style={{ fontSize: "0.24rem" }}>{userinfo.tel}</span>
                                </p>
                            </div>
                            <div className={styles.userdetailRight}>
                                <p className={iconStyle.iconfont} style={{ fontSize: "0.32rem", color: "#059fe8" }}>&#xe674;</p>
                                <div style={{ fontSize: "0.24rem" }}>
                                    <img src={suser} className="suser" alt=""/>
                                    <img src={sme} style={{ margin: "0 0.1rem" ,display:"none"}}  alt="" className="sme"/>
                                    <img src={sdl} style={{ display: "none" }} className="sdl"  alt=""/>
                                    <div>
                                        <span 
                                        style={{ color: "#9c9c9c" }}
                                        
                                        >   用户</span>
                                        <span 
                                            style={{ color: "#009743", display: "none"}}
                                            className="sme"
                                        
                                        >   商家</span>
                                        <span style={{ color: "#a733a1", display: "none" }} className="sdl">   代理</span>    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.userBottom}>
                            <div>
                                <p>KR币</p>
                                <p>{userinfo.kr_coin}</p>
                            </div>
                            <div>
                                <p>糖果币</p>
                                {/* <p>{userinfo.tg_coin > 10000 ? userinfo.tg_coin / 10000 + "万" : userinfo.tg_coin}</p> */}
                                <p>{ userinfo.tg_coin}</p>
                            </div>
                            <div>
                                <p>回购币</p>
                                <p>{userinfo.hg_coin}</p>
                            </div>
                            <div>
                                <p>商城币</p>
                                <p>{ userinfo.sc_coin}</p>
                            </div>
                            
                        </div>
                    </div>
                    <div className={styles.meauwrap}>
                        <List>
                            
                            <Item
                                thumb={Shenqing}
                                arrow="horizontal"
                                onClick={() =>
                                    alert('商家申请', '确定支付1000KR币成为商家???', [
                                        { text: '取消', onPress: () => console.log('cancel') },
                                        { text: '确认', onPress: function() {
                                            return fetchs.read_Token(fetchs.APIHost + '/user/toshop', fetchs.getAuth('/user/toshop')).then(response => response.json())
                                                .then(json => {
                                                   // console.log("商家", json)
                                                    
                                                    if (json.code == 1) {
                                                        $(".sme").show()
                                                        Toast.success(json.msg, 2);
                                                        
                                                    } else {
                                                        Toast.fail(json.msg, 2);
                                                    }
                                                });
                                            }
                                        },
                                    ])
                                }
                            >商家申请</Item>
                            
                            <Item
                                thumb={jia}
                                onClick={this.addshop.bind(this)}
                                arrow="horizontal"
                            >
                               商家管理
                            </Item>
                            <Item
                                thumb={buytg}
                                onClick={() => history.push("/Change")}
                                arrow="horizontal"
                            >
                                购买糖果机
                            </Item>
                            <Item
                                thumb={Bizhong}
                                onClick={() => history.push("/bzChange")}
                                arrow="horizontal"
                            >
                                币种转换
                            </Item>
                            <Item
                                thumb={jiao1}
                                onClick={() => history.push("/jilu")}
                                arrow="horizontal"
                            >
                                交易记录<span style={{fontSize:".24rem",marginLeft:".2rem"}}>(出售和买入的记录)</span>
                            </Item>
                            <Item
                                thumb={jiao1}
                                onClick={() => history.push("/recordbuyuser")}
                                arrow="horizontal"
                            >
                                转账记录<span style={{ fontSize: ".24rem", marginLeft: ".2rem" }}>(向代理转账的记录)</span>
                            </Item>
                            <Item
                                thumb={jiao1}
                                onClick={() => history.push("/userorderlists")}
                                arrow="horizontal"
                            >
                                订单记录<span style={{ fontSize: ".24rem", marginLeft: ".2rem" }}>(用户订单记录)</span>
                            </Item>
                            <Item
                                thumb={jiao1}
                                onClick={() => history.push("/gerenmingxi")}
                                arrow="horizontal"
                            >
                                个人明细<span style={{ fontSize: ".24rem", marginLeft: ".2rem" }}>(个人余额变动记录)</span>
                            </Item>
                            <Item
                                thumb={jiao2}
                                onClick={() => {
                                    is_agent == 1 ? history.push("/minedl") : alert('提示', '你还不是代理',)
                                }}
                            arrow="horizontal"
                        >
                            代理管理
                            </Item>
                            <Item
                                thumb={Code}
                                
                                onClick={() => history.push("/Code")}
                                arrow="horizontal"
                            >
                                二维码推广
                            </Item>
                            <Item
                                thumb={huiyuan}
                                onClick={() => history.push("/Reg")}
                                
                                arrow="horizontal"
                            >
                               注册新会员
                            </Item>
                            <Item
                                thumb={kefu}
                                onClick={() => { }}
                                arrow="horizontal"
                            >
                                <span>联系客服</span><span style={{ marginLeft: "3.2rem", fontSize: '.28rem', color: "#ddd" }}>{this.state.web.cs_phone}</span>
                            </Item>
                            <Item
                                thumb={liuyan}
                                onClick={() => history.push("/liuyan")}
                                arrow="horizontal"
                            >
                                <span>系统留言</span>
                            </Item>
                            <Item
                                thumb={gonggao}
                                onClick={() => history.push("/xitong")}
                                arrow="horizontal"
                            >
                                <span>系统公告</span>
                            </Item>
                            <Item
                                thumb={jiao1}
                                onClick={() => history.push("/")}
                                arrow="horizontal"
                            >
                                退出登录
                            </Item>
                        </List>
                    </div>
                </div>

                {/*nav START*/}
                <div className={Navstyles.nav} style={{zIndex:"100"}}>
                    <ul className={Navstyles.navlists}>
                        <li onClick={() => history.push("/index")}>
                            <p className={iconStyle.iconfont} style={{}}>&#xe626;</p>
                            <p>首页</p>
                        </li>
                        <li onClick={() => history.push("/ShopIndex")} >
                            <p className={iconStyle.iconfont} style={{}}>&#xe624;</p>
                            <p>商城</p>
                        </li>
                        <li onClick={() => history.push("/Team")}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe61c;</p>
                            <p>团队</p>
                        </li>
                        <li onClick={() => history.push("/Profit")} >
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.44rem" }}>&#xe757;</p>
                            <p>转账</p>
                        </li>
                        <li onClick={() => history.push("/Mine")} className={Navstyles.active}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe60d;</p>
                            <p>我的</p>
                        </li>
                    </ul>
                </div>
               {/* 商家申请 */}
               
            </div>
        )
    }
}