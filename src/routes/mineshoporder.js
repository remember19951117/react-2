import React, { Component } from 'react';
import { List, InputItem, Toast, Modal, ImagePicker, NavBar } from "antd-mobile";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/record.css";
import ModalStyles from "./styles/recordModal.css";
import GoBack from "../assets/images/goback.png";
import HeadIcon from "../assets/images/icon.png";
import store from 'store';
import * as fetchs from '../utils/fetch';

import Tdetails from "../assets/images/tdetails.png";
import Tpassword from "../assets/images/tpassword.png";
import TeambtnBG from "../assets/images/teambtnBG.png";
import CancelIcon from "../assets/images/cancel.png";
import PingZheng from "../assets/images/loginBG.png";



const Item = List.Item;
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



export default class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoModal: false,
            selectBtn: 1,
            PwdModal: false,
            ImgModal: false,
            files: [],
            jiludata: [],
            selectInfo: [],
            pwd: "",
            voucher: ''
        };
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        //console.log(key, e);
        this.setState({
            [key]: true,
        });
    }
    showInfo = (i) => {

        this.setState({
            infoModal: true,
            selectInfo: i,
        })
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
        if (files.length > 0) {
            //console.log("tupiamn", files[0].url)
            this.setState({ voucher: files[0].url })
        } else {
            this.setState({ voucher: '' })
        }

    }
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }
    btnChg = (i) => {
        this.setState({ selectBtn: i }, () => {
            ////console.log("选中的值",this.state.selectBtn)
            //获取出售记录
            if (this.state.selectBtn === 0) {
                var data = {
                    page: 1,
                    size: 10,
                    seller_uid: store.get("userinfo").uid,
                }
                ////console.log("data",data)
                fetchs.creat_Token(fetchs.APIHost + "/sell/get", fetchs.getAuth("/sell/get"), JSON.stringify(data)).then(response => response.json())
                    .then(json => {
                        //console.log("出售记录", json)
                        this.setState({ jiludata: json.data.items })
                    });
            }
            //获取购买记录
            else if (this.state.selectBtn === 1) {
                var buydata = {
                    page: 1,
                    size: 10,
                    buy_uid: store.get("userinfo").uid,
                }
                fetchs.creat_Token(fetchs.APIHost + "/buy/get", fetchs.getAuth("/buy/get"), JSON.stringify(buydata)).then(response => response.json())
                    .then(json => {
                        //console.log("购买记录", json)
                        this.setState({ jiludata: json.data.items })
                    });
            }
            //获取转账记录
            else if (this.state.selectBtn === 2) {
                var buydata = {
                    page: 1,
                    size: 10,
                    // buy_uid: store.get("userinfo").uid,
                }
                fetchs.creat_Token(fetchs.APIHost + "/user/transList", fetchs.getAuth("/user/transList"), JSON.stringify(buydata)).then(response => response.json())
                    .then(json => {
                        //console.log("转账记录", json)
                        this.setState({ jiludata: json.data.items })
                    });
            }
        })
    }
    componentDidMount() {
        var buydata = {
            page: 1,
            size: 10,
            shop_id: store.get("userinfo").uid,
            
        }
        //console.log("post", buydata)
        fetchs.creat_Token(fetchs.APIHost + "/order", fetchs.getAuth("/order"), JSON.stringify(buydata)).then(response => response.json())
            .then(json => {
                //console.log("商家订单记录", json)
                this.setState({ jiludata: json.data.items })
            });
    }
    inputPwd = (value) => {
        this.setState({
            pwd: value
        })
    }
    gosure() {
        if (this.state.selectBtn == 0) {
            const data = {
                id: this.state.selectInfo.id,
                s_pwd: this.state.pwd
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
        } else {
            //console.log(this.state.voucher)
            if (this.state.voucher == '') {
                Toast.fail("打款凭据未上传", 1)
                return false;
            }
            const data = {
                id: this.state.selectInfo.id,
                buyer_uid: store.get("userinfo").uid,
                voucher: this.state.voucher,
                s_pwd: this.state.pwd
            }
            //console.log("post", data)
            fetchs.creat_Token(fetchs.APIHost + "/user/buy", fetchs.getAuth("/user/buy"), JSON.stringify(data)).then(response => response.json())
                .then(json => {
                    //console.log("上传图片成功", json)
                    //this.setState({ buydata: json.data.items })
                    if (json.code == 1) {

                        Toast.success(json.msg, 2);

                    } else {
                        Toast.fail(json.msg, 2);
                    }
                });
        }
    }
    render() {
        const { history } = this.props;
        const { files } = this.state;
        const selectInfo = this.state.selectInfo
        //console.log("代理记录", this.state.selectInfo)
        const NavbarProps = {
            history
        }
        const that = this;

        return (
            <div>
                <style>
                    {`
                        .am-navbar-title{
                            font-size:.28rem;
                        }

                        /*调整input外观*/
                        .am-list-item.am-input-item {
                            height: .87rem;
                            padding-left: 0 !important;
                        }
                        .am-list-item{
                            height: auto;
                            min-height:.87rem;
                            padding:0;
                        }
                        
                        .am-flexbox-item{
                            height:1rem;
                            width:1rem; 
                        }
                        .am-image-picker-list .am-image-picker-item .am-image-picker-item-content{
                            width:1rem;
                        }
                        .am-image-picker-list .am-image-picker-upload-btn{
                            width:1rem;
                            height:1rem;
                        }
                        .am-image-picker-list .am-flexbox .am-flexbox-item:after{
                            width:1rem;
                            height:1rem;
                        }



                        .am-list-content{
                            font-size: .26rem !important;
                            color:#333333 !important;
                            margin-right: .30rem !important;
                            line-height:.87rem;
                        }
                        .am-input-label{
                            font-size: .26rem !important;
                            color:#333333 !important;
                            margin-right: .30rem !important;
                            line-height:.87rem;
                        }
                        .am-list-item .am-input-control input{
                            font-size: .26rem !important;
                            line-height:.87rem;
                        }
                        .am-input-label {
                            width:1.7rem !important;
                        }
                        .am-list-item .am-list-line .am-list-extra{
                            flex-basis: 60%;
                            font-size: .26rem;
                        }
                        .am-image-picker-list .am-image-picker-item .am-image-picker-item-remove{
                            width:.25rem;
                            height:.25rem;
                            background-size: 100% 100%;
                        }
                        .am-list-body::after{
                                visibility: hidden;
                        }
                        .am-list-item .am-list-line .am-list-arrow{
                            height:.35rem;
                        }





                        .am-icon{
                            width:.50rem;
                            height:.50rem;
                        }
                        .am-toast-text-info{
                            font-size:.26rem;
                            line-height:.52rem;
                        }
                        .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                            border-radius: .15rem;
                            padding: .25rem .15rem ;
                        }



                        .am-modal-transparent{
                            width:auto;
                          }
                          .am-modal-transparent .am-modal-content .am-modal-body {
                            padding: 0 ;
                          }
                          .am-modal-transparent .am-modal-content {
                            border-radius: 7px;
                            padding-top: 0;
                          }
                        .am-flexbox .am-flexbox-item{
                              flex:0 0 1rem;
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
                        订单管理
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.RecordTop} >

                    </div>
                    <div className={styles.ChgBtnBox} >
                        <div className={this.state.selectBtn == 1 ? styles.selectBtn : ""}>转账记录</div>

                    </div>
                    <div className={styles.PlateBodyD}>
                        <div className={styles.DItem} onClick={this.showModal('infoModal')}>
                            <div className={styles.DItemLeft}>
                                <p><span className={styles.DInfoName}>商品</span><span>苹果</span></p>
                                <p><span className={styles.DInfoName}>收货人</span><span>聚格</span></p>
                                <p><span className={styles.DInfoName}>交易状态</span><span>代发货</span></p>
                                <p><span className={styles.DInfoName}>交易时间</span><span>2018-5-05 12:30</span></p>
                            </div>
                            <div  className={styles.DItemRight}>
                                <p>金额</p>
                                <p>2000.00</p>
                            </div>
                        </div>
                        {
                            // this.state.jiludata.length > 0 ? this.state.jiludata.map(function (result, index) {
                            //     return <div className={styles.DItem} onClick={() => that.showInfo(result)} key={index}>
                            //         <div className={styles.DItemLeft}>
                            //             {/* <p>
                            //                 <span className={styles.DInfoName}>订单号</span>
                            //                 <span>{that.state.selectBtn == 0 ? "出售" : that.state.selectBtn == 1 ? "购买" : that.state.selectBtn == 2?"转账":"未知"}</span>
                            //             </p> */}
                            //             <p>
                            //                 <span className={styles.DInfoName}>申请人</span>
                            //                 <span>{result.user.tel}</span>
                            //             </p>
                            //             <p><span className={styles.DInfoName}>交易状态</span><span>{result.status == 0 ? "待处理" : result.status == 1 ? "待确认" : result.status == 2 ? "交易完成" : result.status == -1 ? "交易失败" : "未知"}</span></p>
                            //             <p><span className={styles.DInfoName}>交易时间</span><span>{result.create_time}</span></p>
                            //             <p><span className={styles.DInfoName}>更新时间</span><span>{result.update_time}</span></p>
                            //         </div>
                            //         <div className={styles.DItemRight}>
                            //             <p>金额</p>
                            //             <p>{result.trade_num}</p>
                            //         </div>
                            //     </div>
                            // }) : ""
                        }
                    </div>
                </div>


                {/*信息弹窗*/}
                <Modal
                    visible={this.state.infoModal}
                    transparent
                    styles={{ width: "6.3rem" }}
                    maskClosable={false}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >{
                        selectInfo == "" ? "" :
                            <div className={ModalStyles.Plate}>
                                <div className={ModalStyles.PlateTitle}>
                                    <img className={ModalStyles.PlateTitleImg} src={Tdetails} />
                                    <img className={ModalStyles.PlateTitleImg} src={CancelIcon} onClick={this.onClose('infoModal')} />
                                </div>
                                <div className={ModalStyles.Platebody}>
                                    <p>
                                        <span>商品信息:</span>
                                        <span>
                                            {selectInfo.user.tel}
                                        </span>
                                    </p>
                                    <p><span>购买人:</span><span>
                                        {selectInfo.user.name}
                                    </span></p>

                                    <p><span>订单状态:</span><span>
                                        {selectInfo.status == 2 ? "是" : "否"}
                                    </span></p>
                                    {/* <Item  className={ModalStyles.ImgUpload} onClick={this.showModal('ImgModal')} extra={<img style={{height:"1rem",width:"1rem"}} src={PingZheng} />}>打款凭证</Item>
            <Item  className={ModalStyles.ImgUpload} extra={<ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => //console.log(index, fs)}
                selectable={files.length < 1}
            />}>打款凭证</Item> */}
                                    {
                                        <Item className={ModalStyles.ImgUpload} extra={<ImagePicker
                                            files={files}
                                            onChange={this.onChange}
                                            onImageClick={(index, fs) => console.log(index, fs)}
                                            selectable={files.length < 1}
                                        />}>打款凭证</Item>
                                    }

                                    <div className={ModalStyles.PlateBodyBBtnDiv}>
                                        <div className={ModalStyles.PlateBodyBBtn} onClick={this.showModal('PwdModal')}>
                                            确认打款
                                            </div>


                                        {/* <div className={ModalStyles.PlateBodyBBtn}  onClick={this.showModal('PwdModal')}>
                    确认收款 
                </div> */}
                                        {/* <div className={ModalStyles.PlateBodyBBtn}>
                    投诉   
                </div> */}
                                    </div>
                                </div>
                            </div>
                    }


                </Modal>


                {/*密码输入弹窗*/}
                <Modal
                    visible={this.state.PwdModal}
                    transparent
                    styles={{ width: "6.3rem" }}
                    maskClosable={false}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className={ModalStyles.Plate}>
                        <div className={ModalStyles.PlateTitle}>
                            <img className={ModalStyles.PlateTitleImg} src={Tpassword} />
                            <img className={ModalStyles.PlateTitleImg} src={CancelIcon} onClick={this.onClose('PwdModal')} />
                        </div>
                        <div className={ModalStyles.Platebody}>
                            <List className={ModalStyles.PlateBodyBList}>
                                <InputItem
                                    className={ModalStyles.ListItem}
                                    clear
                                    type='password'
                                    placeholder="请输入支付密码"
                                    ref={el => this.customFocusInst = el}
                                    onChange={this.inputPwd.bind(this)}
                                >密码</InputItem>
                            </List>
                            <div className={ModalStyles.PlateBodyBBtnDiv}>
                                <a className={ModalStyles.PlateBodyBBtn} onClick={this.gosure.bind(this)}>确定</a>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/*打款凭据弹窗*/}
                <Modal
                    visible={this.state.ImgModal}
                    transparent
                    styles={{ width: "6.3rem" }}
                    maskClosable={false}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className={ModalStyles.Plate}>
                        <div className={ModalStyles.PlateTitle}>
                            <img className={ModalStyles.PlateTitleImg} src={Tdetails} />
                            <img className={ModalStyles.PlateTitleImg} src={CancelIcon} onClick={this.onClose('ImgModal')} />
                        </div>
                        <img src={fetchs.APIHost + selectInfo.voucher} alt="" />
                    </div>
                </Modal>
            </div>
        )
    }
}