import React,{Component} from 'react';
import { Modal, NavBar, Tabs, WhiteSpace, Icon, Toast} from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
// import IndexCSS from "../components/IndexCSS";
// import MyNavBar from "../components/Navbar";
import styles from "./styles/profit.css";
import Navstyles from "./styles/nav.css";
// import ModalStyles from "./styles/IndexModal.css";
import iconStyle from "./styles/font.css";
import store from "store";
// import HeadIcon from "../assets/images/icon.png";
// import copy from 'copy-to-clipboard';
import * as user from "../services/user";
import * as fetchs from '../utils/fetch';
// import TeambtnBG from "../assets/images/teambtnBG.png";
// const Item=List.Item;
function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
const tabs = [
    { title: '买入' },
    { title: '卖出' },
    
];
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}



export default class Teamlists extends Component {
    constructor() {  
        super();  
        this.state = {
            selectBtn:0,
            modal1: false,
            modal2: false,
            indexdata:'',
            usercode:'',
        };
      }
    showModal = key => (e,index) => {
        //console.log("111",index)
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
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    async sale(){
        
        const solenum = this.refs.solenum.value;
        const s_pwd = this.refs.s_pwd.value;
        if (!solenum) { Toast.fail("出售数量不能为空"); return; }
        if (solenum <= 0) { Toast.fail("出售数量需要大于0"); return; }
        if (!s_pwd) { Toast.fail("支付密码不能为空"); return; }
        Toast.loading("loading", 0);
        const data = {
            from:2,
            num: Number(solenum),
            s_pwd: s_pwd
        }
        const sever = await user.saletg(data)
        //console.log('sever', sever)
        Toast.hide();
        if (sever.code == 1) {
            Toast.success(sever.msg, 2);
            this.refs.solenum.value = '';
            this.refs.s_pwd.value = '';
        } else {
            Toast.fail(sever.msg, 2);
        }
    }
    componentDidMount(){
        //请求用户信息
        fetchs.read_Token(fetchs.APIHost + '/user/get', fetchs.getAuth('/user/get')).then(response => response.json())
            .then(json => {
               
                this.setState({ usercode: json.data.is_agent })
        });
        
        //请求订单数据
        Toast.loading("loading", 0);
        var indexdata = {
            page: 1,
            size: 10,
            
        }
        //console.log("indexdata", indexdata)
        fetchs.creat_Token(fetchs.APIHost + "/sell/get", fetchs.getAuth("/sell/get"), JSON.stringify(indexdata)).then(response => response.json())
            .then(json => {
                Toast.hide();
                //console.log("shoutye", json)
                this.setState({ indexdata: json.data.items })
            });
       
    }
    //搜索订单
    tap(){
        const data = {
            trade_no: this.refs.search.value,
        }
        
        Toast.loading("loading", 0);
        fetchs.creat_Token(fetchs.APIHost + "/sell/get", fetchs.getAuth("/sell/get"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                Toast.hide();
                //console.log("shoutye", json)
                this.setState({ indexdata: json.data.items })
                if (json.code == 1) {
                    Toast.success("查找订单成功", 2);

                } else {
                    Toast.fail(json.msg, 2);
                }
        });
    }
    dailipay(){
        
        const dluser = this.refs.daliliusername.value;
        const dlgold = this.refs.dailiGold.value;
        const dlpsw = this.refs.dailipsw.value;
        const data ={
            agent_id: dluser,
            num: dlgold,
            s_pwd: dlpsw
        }
        if (!dluser) { Toast.fail("代理账号不能为空"); return; }
        if (dlgold <= 0) { Toast.fail("转增数量需要大于0"); return; }
        if (!dlgold) { Toast.fail("转帐金额不能为空"); return; }
        if (!dlpsw) { Toast.fail("支付密码不能为空"); return; }
        Toast.loading("loading", 0);
        //console.log("post",data)
        fetchs.creat_Token(fetchs.APIHost + "/user/agent", fetchs.getAuth("/user/agent"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                Toast.hide(); 
                console.log("sever", json)
                this.setState({ indexdata: json.data.items })
                if (json.code == 1) {
                    Toast.success(json.msg, 2);
                    this.refs.daliliusername.value = '';
                    this.refs.dailiGold.value ='';
                    this.refs.dailipsw.value = '';
                } else {
                    Toast.fail(json.msg, 2);
                }
        });

    }
    render(){
        const {history} = this.props;
        // const NavbarProps={
        //     history
        // }
        const alert = Modal.alert;
         const that = this;
        const usercode = this.state.usercode;
        
       
        return(
            <div>
                <style>
                    {`
                       .am-tabs-default-bar-tab{
                           font-size:0.32rem;
                           height:0.89rem;
                           line-height:0.89rem;
                           background:#f2f2f2;
                       }
                       .am-modal-transparent{
                           width:6.98rem;
                           height:4.53rem;
                       }
                    .am-modal-title{
                        height:.77rem;
                        line-height:.77rem;
                        font-size:.28rem;
                        text-align:center;
                        background:#00a3f0;
                        color:#fff;
                    }
                    
                     .am-modal-transparent .am-modal-content{
                         border-radius:.15rem;
                         padding:0;
                     }   
                     .am-modal-header{
                         padding:0;
                     } 
                     .am-modal-body{
                         height:3.1rem;
                     }
                     .am-modal-button-group-h .am-modal-button{
                          background:#00a3f0;
                           color:#fff;
                           font-size:.26rem;
                     }
                     .am-modal-button-group-h .am-modal-button:first-child{
                         color:#fff;
                         font-size:.26rem;
                     }
                     .am-modal-button-group-v .am-modal-button{
                         font-size:.26rem;
                         background:#00a3f0;
                         color:#fff;
                         height:.7rem;
                         line-height:.7rem;
                     }
                     .am-toast-text-info{
                            font-size:.26rem;
                            line-height:.52rem;
                        }
                        .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                            border-radius: .15rem;
                            padding: .25rem .15rem ;
                        }
                        .am-modal-alert-content{
                            font-size:.32rem;
                            text-align:left;
                        }
                        p{
                            margin-bottom:0!important;
                        }
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    // rightContent={
                    //     [<div>
                    //         <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem", color: "#FFFFFF"}}>
                    //             &#xe757;
                    //         </span>
                    //         <span style={{ fontSize: "0.3rem", lineHeight: '7vh', color: "#FFFFFF" }} onClick={() => {
                    //             history.push("/recordbuyuser")
                    //         }}>转账记录</span>
                    //     </div>
                    //     ]
                    // }
                >


                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        交易大厅
                    </span>
                </NavBar>
                {/*main State*/}
                <div className={styles.main}>
                    <div style={{width:'100%'}}>
                        <WhiteSpace />
                        <StickyContainer>
                            <Tabs tabs={tabs}
                                initalPage={'t2'}
                                renderTabBar={renderTabBar}
                            >   
                            {/*买入*/}
                                <div>
                                    {/* <div className={styles.KRTitle}>KR币充值</div>
                                    <div className={styles.KRcont}>
                                        <ul className={styles.KRlists}>
                                           <li>
                                               <p>充值金额</p>
                                               <input placeholder="请输入充值金额"/>
                                           </li>
                                            <li style={{marginTop:".2rem"}}>
                                                <p>二级密码</p>
                                                <input placeholder="****" type="password"/>
                                            </li>
                                       </ul>
                                        <div className={styles.KRBottom}>
                                            <button onClick={this.pay.bind(this)}>充值</button>
                                        </div>
                                    </div> */}
                                    {/*充值 END*/}
                                    {/*购买 Start*/}
                                    <div className={styles.buyTitle}>
                                        <span>会员购买</span>
                                        <div className={styles.buySearch}>
                                            <input placeholder="请输入订单编号" ref="search"/>
                                            <Icon type="search" size='lg' className={styles.buySearchIcon} onClick={this.tap.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className={styles.buybox}>
                                        {/* <div className={styles.buyLists}>
                                                <div className={styles.buyListsTitle}>
                                                    订单号：zs55102
                                            </div>
                                                <div className={styles.buyListsCont}>
                                                    <p>出售人：<span>聚格科技</span></p>
                                                    <p>出售金额：<span>聚格科技</span></p>
                                                    <p>上架时间<span>1997-11-12</span></p>
                                                </div>
                                            <div className={styles.buyListsBtn}>
                                                <button onClick={this.showModal('modal1').bind(this)}>查看订单</button>
                                                <button onClick={this.showModal('modal2').bind(this)}>购买</button>
                                            </div>
                                        </div>
                                     */}
                                        {
                                            this.state.indexdata.length>0? this.state.indexdata.map(function (result,index) {
                                                return <div className={styles.buyLists}>
                                                            <div className={styles.buyListsTitle}>
                                                            订单号：{result.trade_no}
                                                            </div>
                                                            <div className={styles.buyListsCont}>
                                                        <p>出售人：<span>{result.seller.name}</span></p>
                                                        <p>出售金额：<span>{result.trade_num}</span></p>
                                                        <p>上架时间：<span>{result.create_time}</span></p>
                                                                <p>状态：<span>挂买中....</span></p>
                                                            </div>
                                                            <div className={styles.buyListsBtn}>
                                                                {/* <button onClick={that.showModal('modal1').bind(this)}>查看订单</button> */}
                                                                <button onClick={() =>
                                                                    alert('确认购买', '请仔细查看订单信息,确认购买后需去交易记录上传打款凭证', [
                                                                        { text: '取消', onPress: () => console.log('cancel') },
                                                                        { text: '确认', onPress: () => {
                                                                            //console.log(result.id)
                                                                            const data ={
                                                                                id: result.id,
                                                                                buyer_uid:store.get("userinfo").uid,
                                                                            }
                                                                            //console.log("buy",data)
                                                                            fetchs.creat_Token(fetchs.APIHost + "/user/buy", fetchs.getAuth("/user/buy"), JSON.stringify(data)).then(response => response.json())
                                                                                .then(json => {
                                                                                    //console.log("龟卖", json)
                                                                                    if (json.code == 1) {
                                                                                        Toast.success(json.msg, 2);
                                                                                         history.push("/jilu")           
                                                                                    } else {
                                                                                        Toast.fail(json.msg, 2);
                                                                                    }
                                                                                });
                                                                         } },
                                                                    ])}>确认购买
                                                                </button>
                                                            </div>
                                                        </div>
                                                    
                                            }):""
                                        }
                                        </div>
                                    {/**/}
                                   
                                    <Modal
                                        visible={this.state.modal1}
                                        transparent
                                        maskClosable={false}
                                        onClose={this.onClose('modal1')}
                                        title="查看信息"
                                        footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                        <div style={{ minHeight: 100}} className={styles.buyModleCont}>
                                            <p>
                                                <span>
                                                    订单号
                                                </span>
                                                <span>
                                                    8cs456465
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    出售人
                                                </span>
                                                <span>
                                                    8cs456465
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    出售金额
                                                </span>
                                                <span>
                                                    8cs456465
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    挂卖时间
                                                </span>
                                                <span>
                                                    8cs456465
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    真实姓名
                                                </span>
                                                <span>
                                                    8cs456465
                                                </span>
                                            </p>
                                            <p>
                                                <span>
                                                    订单号
                                                </span>
                                                <span>
                                                    8cs456465
                                                </span>
                                            </p>
                                        </div>
                                    </Modal>
                                    {/* <Modal
                                        visible={this.state.modal2}
                                        transparent
                                        maskClosable={false}
                                        onClose={this.onClose('modal2')}
                                        title="输入二级密码"
                                        footer={[{ text: '购买', onPress: () => { //console.log('ok'); this.onClose('modal2')(); } }]}
                                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                        <div className={styles.buyModleCont2}>
                                           <input placeholder="请输入二级密码"/>
                                        </div>
                                    </Modal> */}
                                </div>
                            {/*卖出*/}
                                <div>
                                    <div className={styles.KRTitle}>代理转账</div>
                                    <div className={styles.KRcont2}>
                                        <ul className={styles.KRlists2}>
                                            <li>
                                                <p>代理账号</p>
                                                <input placeholder="请输入代理账号" ref="daliliusername"/>
                                            </li>
                                            <li>
                                                <p>出售金额</p>
                                                <input placeholder="请输入出售金额" ref="dailiGold"/>
                                            </li>
                                            <li style={{ marginTop: ".2rem" }}>
                                                <p>支付密码</p>
                                                <input placeholder="请输入支付密码" type="password" ref="dailipsw"/>
                                            </li>
                                        </ul>
                                        <div className={styles.KRBottom}>
                                            <button onClick={this.dailipay.bind(this)}>充值</button>
                                        </div>
                                    </div>
                                    {/*提现 END*/}
                                    <div className={styles.KRTitle}>会员出售</div>
                                    <div className={styles.KRcont}>
                                        <ul className={styles.KRlists}>
                                            <li>
                                                <p>出售金额</p>
                                                <input placeholder="请输入出售的糖果币金额" ref="solenum"/>
                                            </li>
                                            <li style={{ marginTop: ".2rem" }}>
                                                <p>二级密码</p>
                                                <input placeholder="请输入支付密码" type="password" ref="s_pwd"/>
                                            </li>
                                        </ul>
                                        <div className={styles.KRBottom}>
                                            <button onClick={this.sale.bind(this)}>出售</button>
                                        </div>
                                    </div>
                                </div>
                                
                            </Tabs>
                        </StickyContainer>
                        <WhiteSpace />
                        <div style={{marginBottom:"1.4rem"}}></div>
                    </div>
                </div>
                {/*main End*/}
                <div className={Navstyles.nav}>
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
                        <li onClick={() => history.push("/Profit")} className={Navstyles.active}>
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