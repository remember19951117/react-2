import React, { Component } from 'react';
import { List, InputItem, Toast, NavBar } from "antd-mobile";
import { Cascader } from 'antd';

import * as fetchs from '../utils/fetch';
import GoBack from "../assets/images/goback.png";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/reg.css";
import * as user from "../services/user";
import backdata from "./back.json"
// let Item = List.Item;
// let _this = this;


// let options2 = [{
//     value: '中国工商银行',
//     label: '中国工商银行',
//     isLeaf: false,
//     key: '中国工商银行'
// }, {
//     value: '中国农业银行',
//     label: '中国农业银行',
//     isLeaf: false,
//     }, {
//         value: '中国银行',
//         label: '中国银行',
//         isLeaf: false,
//     }, {
//         value: '中国建设银行',
//         label: '中国建设银行',
//         isLeaf: false,
//     }, {
//         value: '中国农业银行',
//         label: '中国农业银行',
//         isLeaf: false,
//     }, {
//         value: '交通银行',
//         label: '交通银行',
//         isLeaf: false,
//     }, {
//         value: '中国邮政储蓄银行',
//         label: '中国邮政储蓄银行',
//         isLeaf: false,
//     }
// ];
var bankdata = [];


Object.keys(backdata).forEach(function (key) {
    var data = {
        value: backdata[key],
        label: backdata[key],
        key: backdata,
        isLeaf: false,
    }
    bankdata.push(data)
});


export default class Reg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            multiple: false,
            codeVal: "获取验证码",
            tel: this.props.match.params.mobile,
            ptel: "",
            real_name: "",
            mobile: "",
            password: "",
            safe_password: "",
            alipay: "",
            wechat: "",
            id_card: "",
            id_card_fan: "",
            code: "",
            backImg: [],
            value: null,

            provincedata: "",
            inputdiqu: "",
            province: '',
            city: '',
            bank: '',
            inputbacknum: "",
            cometel: "",
            cityData: ""
        };
    }

    onSegChange = (e) => {
        let index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }
    // 获取验证码
    async GetCode() {
        if (this.state.codeVal != "获取验证码") {
            return;
        }
        if (this.state.mobile.length < 11) {
            Toast.fail("手机格式错误", 2)
            return;
        }
        let value = await user.smscode({ mobile: this.state.mobile });
        if (value.code == 1) {
            Toast.success("获取成功", 2)
        }
        let _this = this;
        let num = 60;
        let Countdown = setInterval(function () {
            num = num - 1;
            if (num >= 0) {
                _this.setState({ codeVal: num + "" });
                return;
            }
            _this.setState({ codeVal: '获取验证码' });
            clearInterval(Countdown);
        }, 1000)
    }

    // 获取验证码
    async GoReg() {
        
       

        // let { history } = this.props;
        let ptel = this.state.cometel;
        let real_name = this.state.real_name;
        let mobile = this.state.mobile;
        let password = this.state.password;
        let safe_password = this.state.safe_password;
        let alipay = this.state.alipay;
        let wechat = this.state.wechat;
        let inputdiqu = this.state.inputdiqu;
        // let id_card = this.state.id_card;
        // let id_card_fan = this.state.id_card_fan;
        let code = this.state.code;
        let province = this.state.province;
        let city = this.state.city;
        let bank = this.state.bank;

        let inputbacknum = this.state.inputbacknum;


        if (inputbacknum == "" || real_name == "" || mobile == "" || password == "" || safe_password == "" || alipay == "" || wechat == "" || code == "" || province == "" || city == "" || inputdiqu == "" || bank.toString() == "") {
            Toast.fail("有空白项", 2);
            return;
        }
        var data = {
            //推荐人手机号
            p_tel: ptel,
            //姓名
            name: real_name,
            //手机号
            tel: mobile,
            //登录密码
            pwd: password,
            //支付密码
            s_pwd: safe_password,
            //支付宝
            alipay: alipay,
            //微信
            wechat: wechat,
            //验证码
            code: code,
            //省 市 区 
            province: province,
            city: city,
            //收货地址 
            address: inputdiqu,
            //银行
            bank: bank.toString(),
            //银行卡号
            banknum: inputbacknum
        }
        console.log(data)
        let value = await user.reg(data);

        let Provider = await user.getProvinceLists()

        if (value.code == 1) {
            Toast.success(value.msg, 2)
            Toast.loading("正在跳转到登录页面", 3);
            setTimeout(() => {
                window.location.href = 'http://mmf89.cn'; 
            }, 2000);
             
        } else {
            Toast.fail(value.msg, 2)
        }

    }

    inputPtel = (value) => {
        this.setState({
            ptel: value
        })
    }
    inputReal_name = (value) => {
        this.setState({
            real_name: value
        })
    }
    inputMobile = (value) => {
        this.setState({
            mobile: value
        })
    }
    inputPassword = (value) => {
        this.setState({
            password: value
        })
    }
    inputSafe_password = (value) => {
        this.setState({
            safe_password: value
        })
    }
    inputAlipay = (value) => {
        this.setState({
            alipay: value
        })
    }
    inputWechat = (value) => {
        this.setState({
            wechat: value
        })
    }
    inputCode = (value) => {
        this.setState({
            code: value
        })
    }

    inputdiqu = (value) => {
        this.setState({
            inputdiqu: value
        })
    }

    inputbacknum = (value) => {
        this.setState({
            inputbacknum: value
        })
    }
    componentDidMount() {
        // //是否有参数
         let cometel = this.props.location.search.replace("?id=", "");
        
        this.setState({cometel: cometel})
        Toast.loading("加载中", 0);
        fetchs.read(fetchs.APIHost + "/province").then(response => response.json())
            .then(json => {
                Toast.hide();
                var provincedataarr = []
                json.data.length > 0 ? json.data.map(function (result, index) {
                    let data = {
                        value: result.p_code,
                        label: result.name,

                    }
                    provincedataarr.push(data)
                }) : ""
                this.setState({ provincedata: provincedataarr })

            });

    }
    onProvChange = (value, selectedOptions) => {
        Toast.loading("加载中", 0);
        var changeP = selectedOptions[0].value;
        this.setState({
            province: changeP,
        })

        let data = {
            p_code: value[0]
        }
        // console.log("post", data)
        fetchs.creat_Token(fetchs.APIHost + "/city", fetchs.getAuth("/city"), JSON.stringify(data)).then(response => response.json())
            .then(json => {
                // console.log(json)
                var citydataarr = []
                json.data.length > 0 ? json.data.map(function (result, index) {
                    let data = {
                        value: result.c_code,
                        label: result.name,
                    }
                    citydataarr.push(data)
                }) : ""
                this.setState({ cityData: citydataarr })
                Toast.hide();
            })
    }
    onCityChange = (value, selectedOptions) => {

        this.setState({
            city: value[0],
        })
    }
    onbankChange(value) {
        this.setState({ bank: value })
    }
    tapcity() {

        if (this.state.cityData === '') {
            Toast.fail("请先选择省", 2)
        }

    }


    render() {
        let { files } = this.state;
        let { history } = this.props;
        let cometel = this.state.cometel;
        console.log("推荐人",cometel)
        let NavbarProps = {
            history
        }
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
                            padding:0;
                        }
                        
                        .am-image-picker-list .am-flexbox{
                            height:2rem;   
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
                        }
                        .am-image-picker-list .am-image-picker-item .am-image-picker-item-remove{
                            width:.25rem;
                            height:.25rem;
                            background-size: 100% 100%;
                        }
                        .am-list-body::after{
                                visibility: hidden;
                        }
                        .am-input-extra{
                            font-size: .26rem !important;
                            max-height: .87rem !important;
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
                        .am-image-picker-item-remove{
                            display:none !important;
                        }
                        .ant-cascader-picker{
                            display: inline-block;
                            width:3.1rem;
                            font-size: .26rem !important;
                        }
                        .ant-input{
                            height:.87rem;
                           width:3.1rem;
                             font-size: .26rem !important;
                            
                        }
                        .ant-cascader-menu-item{
                            font-size:.26rem !important;
                            line-height:.57rem;
                        }
                        .ant-cascader-picker-label{
                             height:.87rem;
                             display: inline-block;
                             font-size:.26rem !important;
                            overflow: visible;
                            margin-top:-0.1rem;
                        }
                        .ant-input:focus{
                            border:0 none;
                        }
                        .ant-cascader-input.ant-input{
                            border:0 none;
                        }
                        .ant-cascader-menu{
                            height:3rem;
                        }
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    // icon={
                    //     <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    // }
                    // onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        注册新会员
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.mainList}>
                        <List className={styles.PlateBodyBList}>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                //editable={cometel === ""}
                                placeholder="请输入手机号(没有可不填)"
                                value={cometel}
                                disabled
                                
                            >推荐人手机号
                            </InputItem>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                placeholder="请输入真实姓名"
                                onChange={this.inputReal_name.bind(this)}
                            >真实姓名
                            </InputItem>

                            <div className={styles.providerChange}>
                                <span className={styles.providerChangespan}>
                                    所属省
                                </span>

                                <Cascader
                                    options={this.state.provincedata}
                                    onChange={this.onProvChange.bind(this)}
                                    changeOnSelect
                                    placeholder="请选择省份" />
                            </div>
                            <div className={styles.providerChange}>
                                <span className={styles.providerChangespan}>
                                    所属市
                                </span>
                                <Cascader
                                    options={this.state.cityData}
                                    onChange={this.onCityChange.bind(this)}
                                    onClick={this.tapcity.bind(this)}
                                    changeOnSelect
                                    placeholder="请选择市" />
                            </div>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                placeholder="详细地区"
                                onChange={this.inputdiqu.bind(this)}
                            >详细地区
                            </InputItem>


                            <InputItem
                                className={styles.ListItem}

                                clear
                                placeholder="注册手机号"
                                onChange={this.inputMobile.bind(this)}
                            >手机号
                            </InputItem>
                            <InputItem
                                className={styles.ListItem}
                                extra={this.state.codeVal}
                                onExtraClick={() => this.state.codeVal == "获取验证码" ? this.GetCode() : ""}
                                clear
                                placeholder="验证码"
                                onChange={this.inputCode.bind(this)}
                            >验证码
                            </InputItem>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                type="password"
                                placeholder="登录密码"
                                onChange={this.inputPassword.bind(this)}
                            >登录密码
                            </InputItem>
                            <InputItem
                                className={styles.ListItem}
                                type="password"
                                clear
                                placeholder="支付密码"
                                onChange={this.inputSafe_password.bind(this)}
                            >支付密码
                            </InputItem>
                            <div className={styles.providerChange}>
                                <span className={styles.providerChangespan}>
                                    所属银行
                                </span>
                                <Cascader
                                    options={bankdata}
                                    onChange={this.onbankChange.bind(this)}
                                    placeholder="请选择银行账户"
                                />
                            </div>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                placeholder="银行卡号"
                                onChange={this.inputbacknum.bind(this)}
                            >银行卡号
                            </InputItem>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                placeholder="支付宝帐号"
                                onChange={this.inputAlipay.bind(this)}
                            >支付宝
                            </InputItem>
                            <InputItem
                                className={styles.ListItem}
                                clear
                                placeholder="微信帐号"
                                onChange={this.inputWechat.bind(this)}
                            >微信
                            </InputItem>
                        </List>
                        <div className={styles.PlateBodyBBtnDiv}>
                            <a className={styles.PlateBodyBBtn} onClick={() => this.GoReg()}>确定</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}