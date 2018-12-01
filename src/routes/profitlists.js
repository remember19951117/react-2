import React, { Component } from 'react';
import { NavBar, Tabs, WhiteSpace, Modal, ImagePicker,Toast} from "antd-mobile";
import { StickyContainer, Sticky } from 'react-sticky';
// import IndexCSS from "../components/IndexCSS";
// import MyNavBar from "../components/Navbar";
import styles from "./styles/profit.css";
// import Navstyles from "./styles/nav.css";
// import ModalStyles from "./styles/IndexModal.css";
// import iconStyle from "./styles/font.css";
import HeadIcon from "../assets/images/icon.png";
// import copy from 'copy-to-clipboard';
import GoBack from "../assets/images/goback.png";
import store from 'store';
import * as fetchs from '../utils/fetch';
import $ from "jquery";
// const Item = List.Item;
function renderTabBar(props) {
    return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
const tabs = [
    { title: '购买' },
    { title: '出售' },

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
    constructor(props) {
        super(props);
        this.state = {
            selectBtn: 0,
            modal1: false,
            soledata:[],
            indexdata:[],
            buydata:[],
            files:[],
            multiple: false,
        };
       
    }
    // showModal = (key,obj) => (e,obj) => {
    //    //console.log(key);
    //     //console.log(obj);
    //     e.preventDefault(); // 修复 Android 上点击穿透
        
    //     this.setState({
    //         [key]: true,
    //     });
    // }

    showModal2(key,obj,e){
        store.set("buyid", obj)
        //console.log(key, obj);
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
    onChange = (files, type, index) => {
        //console.log(files, type, index);
        this.setState({
            files,
        });
    }
    componentDidMount(){
        var data ={
            page:1,
            size:10,
            seller_uid:store.get("userinfo").uid,
        }
        ////console.log("data",data)
        fetchs.creat_Token(fetchs.APIHost + "/sell/get", fetchs.getAuth("/sell/get"), JSON.stringify(data)).then(response => response.json())
        .then(json => {
            ////console.log(json)
            this.setState({ soledata: json.data.items})
        });

        var buydata={
            page: 1,
            size: 10,
            buy_uid: store.get("userinfo").uid,
        }
        fetchs.creat_Token(fetchs.APIHost + "/buy/get", fetchs.getAuth("/buy/get"), JSON.stringify(buydata)).then(response => response.json())
            .then(json => {
                //console.log("buydara",json)
                this.setState({ buydata: json.data.items })
        });

       
    }
    tapBtn(){
        ////console.log("0000____")
    }
    render() {
        const { history } = this.props;
        const _this=this;

        const alert = Modal.alert;
        const { files } = this.state;
        // const NavbarProps = {
        //     history
        // }
       // //console.log("reader",this.state.soledata)
        return (
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
                            width: 5.98rem;
                            height: 3.53rem;
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
                         height:2rem;
                     }
                     .am-modal-alert-content{
                         
                         font-size:.32rem;
                         margin-top:.2rem;
                         text-align:left;
                     }
                     .am-modal-button-group-v .am-modal-button{
                         font-size:.26rem;
                         background:#00a3f0;
                         color:#fff;
                         height:.7rem;
                         line-height:.7rem;
                     }
                     .am-image-picker-list .am-image-picker-upload-btn{
                         border:2px solid #00a3f0;
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
                        <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    }
                    onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        交易记录
                    </span>
                </NavBar>

                {/*main State*/}
                <div className={styles.main}>
                    <div style={{ width: '100%' }}>
                        <WhiteSpace />
                        <StickyContainer>
                            <Tabs tabs={tabs}
                                initalPage={'t2'}
                                renderTabBar={renderTabBar}
                            >
                                {/*买入*/}
                                <div>
                                   
                                    {/*充值 END*/}
                                    {/*购买 Start*/}
                                   
                                    <div className={styles.buybox}>
                                        {
                                            this.state.buydata.map(function (result,index) {
                                                return <div className={styles.buyLists}>
                                                            <div className={styles.buyListsTitle}>
                                                        订单号：{result.trade_no}
                                                            </div>
                                                            <div className={styles.buyListsCont}>
                                                        <p>出售人：<span>{result.seller.name}</span></p>
                                                        <p>出售金额：<span>{result.trade_num}</span></p>
                                                        <p>上架时间:<span>{result.create_time}</span></p>
                                                        <p>购买时间:<span>{result.update_time}</span></p>
                                                        <p><i>打款凭证：</i>
                                                            <span className={styles.pingzheng}>
                                                                <img src={result.buyer ? fetchs.APIHost + result.voucher : "暂无"} />
                                                            </span>
                                                        </p>
                                                            </div>
                                                         <div className={styles.buyListsBtn}>
                                                            <button onClick={_this.showModal2.bind(_this,"modal1",result.id)} dataid={result.id}
                                                        
                                                            >上传打款凭证</button>
                                                        </div>
                                                     </div>
                                            })
                                        }
                                    </div>
                                    {/**/}
                                </div>
                                {/*卖出*/}
                                <div>
                                    <div className={styles.buybox}>
                                        {/* <div className={styles.buyLists}>
                                            <div className={styles.buyListsTitle}>
                                                订单号：zs55101
                                        </div>
                                            <div className={styles.buyListsCont}>
                                                <p>
                                                    <i>出售人：</i>
                                                    <span>聚格科技</span>
                                                </p>
                                                <p>
                                                    <i>出售人：</i>
                                                    <span>聚格科技</span>
                                                    </p>
                                                <p>
                                                    <i>出售人：</i>
                                                    <span>1997-11-12</span>
                                                    </p>
                                                <p>
                                                    <i>出售人：</i>
                                                    <span>1997-11-12</span>
                                                </p>
                                            </div>
                                            <div className={styles.buyListsBtn}>
                                                <button onClick={this.showModal('modal1').bind(this)}>查看买家信息</button>
                                            </div>
                                        </div> */}
                                       {
                                        
                                        this.state.soledata.map(function (result ,index) {
                                            return <div className={styles.buyLists} key ={index}>
                                                        <div className={styles.buyListsTitle}>
                                                            订单号：{result.trade_no}
                                                        </div>
                                                        <div className={styles.buyListsCont}>
                                                            <p>
                                                                <i>出售人：</i>
                                                                <span>{result.seller.name}</span>
                                                            </p>
                                                            <p>
                                                                <i>出售金额：</i>
                                                                <span style={{ color: "red" }}>{result.trade_num}</span>
                                                            </p>
                                                            <p>
                                                                <i>挂卖时间：</i>
                                                                <span>{result.create_time}</span>
                                                            </p>
                                                            
                                                            <p>
                                                                <i>状态：</i>
                                                        <span style={{ color: "red" }}>{result.status == 0 ? "挂卖中" : result.status == 1 ? "待确认" : result.status == 2 ? "交易完成" : result.status == -1?"交易失败":"未知"}</span>
                                                            </p>
                                                            <p>
                                                                <i>提示:</i>
                                                                <span style={{color:"red"}}>订单被购买后显示买家信息</span>
                                                            </p>
                                                        </div>
                                                        {/* 订单挂卖完成 */}
                                                        <div className={styles.buyListsCont}>
                                                            <p>
                                                                <i>购买人：</i>
                                                                <span>{result.buyer ? result.buyer.name:"暂无"}</span>
                                                            </p>
                                                            <p>
                                                                <i>购买金额：</i>
                                                                <span>{result.buyer ? result.buyer.name : "暂无"}</span>
                                                            </p>
                                                            <p>
                                                                <i>购买时间：</i>
                                                                <span>{result.buyer ? result.update_time : "暂无"}</span>
                                                            </p>
                                                                <p><i>打款凭证：</i>
                                                                    <span className={styles.pingzheng}>
                                                                        <img src={result.buyer ? fetchs.APIHost + result.voucher : "暂无"} />
                                                                    </span>
                                                                </p>
                                                                
                                                        </div>
                                                        <div className={styles.buyListsBtn}>
                                                            <button onClick={() =>
                                                                     alert('确认收款', '请确认打款凭证并保证款项已经到达账户', [
                                                                    { text: '取消', onPress: () =>{
                                                                    } },
                                                                    { text: '确认', onPress: () =>{
                                                                        const data = {
                                                                            id: result.id
                                                                        }
                                                                        //console.log("post", data)
                                                                        fetchs.creat_Token(fetchs.APIHost + "/sell/confirm", fetchs.getAuth("/sell/confirm"), JSON.stringify(data)).then(response => response.json())
                                                                            .then(json => {
                                                                                //console.log("get", json)
                                                                                if (json.code == 1) {
                                                                                    Toast.success(json.msg, 2);

                                                                                } else {
                                                                                    Toast.fail(json.msg, 2);
                                                                                }
                                                                        });
                                                                    } },
                                                                ])}>确认收款
                                                            </button>
                                                        </div>
                                                    </div>
                                           })
                                       }
                                    </div>
                                    <Modal
                                        visible={this.state.modal1}
                                        transparent
                                        maskClosable={false}
                                        onClose={this.onClose('modal1')}
                                        title="上传打款凭证"
                                        footer={[{ text: '确认上传', onPress: () => { 
                                            //console.log('ok'); 
                                            this.onClose('modal1')();
                                            //console.log(this.state.files)
                                            const data ={
                                                id: store.get("buyid"),
                                                voucher: this.state.files[0].url
                                            }
                                            //console.log("post",data)
                                            fetchs.creat_Token(fetchs.APIHost + "/user/buy", fetchs.getAuth("/user/buy"), JSON.stringify(data)).then(response => response.json())
                                                .then(json => {
                                                    //console.log("get", json)
                                                    //this.setState({ buydata: json.data.items })
                                                    if (json.code == 1) {

                                                        Toast.success(json.msg, 2);

                                                    } else {
                                                        Toast.fail(json.msg, 2);
                                                    }
                                            });
                                            }
                                        }, {
                                            text: '取消', onPress: () => {
                                                //console.log('取消');
                                                this.onClose('modal1')();
                                            } }]}
                                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                                    >
                                        <div className={styles.saleinfo}>
                                            <ImagePicker
                                                files={files}
                                                onChange={this.onChange}
                                                onImageClick={(index, fs) => console.log(index, fs)}
                                                selectable={files.length < 1}
                                                multiple={this.state.multiple}
                                            />
                                        </div>
                                    </Modal>
                                    
                                </div>
                            </Tabs>
                        </StickyContainer>
                        <WhiteSpace />
                    </div>
                </div>
                {/*main End*/}
                {/* End*/}
                


            </div>
        )
    }
}