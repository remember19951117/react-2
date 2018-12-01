import React, { Component } from 'react';
import styles from "./styles/login.css";
import store from "store";
import { routerRedux } from 'dva/router';
import { login } from '../utils/fetch';
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
//import Chgstyles from "./styles/login.css";
import LOGO from "../assets/images/LOGO.png";
import iconStyle from "./styles/font.css";
import { Toast,NavBar } from 'antd-mobile';
import GoBack from "../assets/images/goback.png";
import * as user from "../services/user";
export default class ChgPWD extends Component {
    constructor() {
        super();
        this.state = {
            mobbile: '',
            code: '',
            psw: '',
            twoPsw: '',
            codeVal: "获取验证码",
            bgcol: "#00a3f0"
        };
    }
    componentDidMount() {
       
        this.setState({ mobbile: store.get("user").username })
    }
    //    onChange = (files, type, index) => {
    //      //console.log(files, type, index);
    //      this.setState({
    //        files,
    //      });
    //    }
    //    onSegChange = (e) => {
    //      const index = e.nativeEvent.selectedSegmentIndex;
    //      this.setState({
    //        multiple: index === 1,
    //      });
    //    }
    //    GetCode=()=>{
    //        const _this=this;
    //        let num=60;
    //        let Countdown=setInterval(function() {
    //            num=num-1;
    //            if (num>=0) {
    //              _this.setState({codeVal:num});
    //              return;
    //            }
    //            _this.setState({codeVal:'获取验证码'});
    //            clearInterval(Countdown);
    //        },1000)
    // async changeMobbile(event) {
    //     this.setState({ mobbile: event.target.value });
    // }
    async changeCode(event) {
        this.setState({ code: event.target.value });
    }

    async changePsw(event) {
        this.setState({ psw: event.target.value });
    }
    async changeTwoPsw(event) {
        this.setState({ twoPsw: event.target.value });
    }
    //提交数据
    async SurePswBtn() {
        const {
            dispatch,history
        } = this.props;
        
        let code = this.state.code;
        let psw = this.state.psw;
        let twoPsw = this.state.twoPsw;
       
        if (code == "") {
            Toast.offline("验证码不能为空!", 2);
            return;
        }
        if (psw == "") {
            Toast.offline("密码不能为空!", 2);
            return;
        }
        if (twoPsw !== psw) {
            Toast.offline("密码输入不一致!", 2);
            return;
        }
        //		if(codeinput !== this.state.code) {
        //			Toast.offline("验证码错误!", 2);
        //			return;
        //		}
        Toast.loading("正在修改", 0);
        const data  = {
            pwd:psw,
            //code:"111",
            iscode:1,
            mobile: this.refs.mobbile.value
        }
        const value = await user.change(data)
        
        Toast.hide();
        //console.log("login", value)
        		if(value.code == 1) {
                    Toast.success(value.msg, 2);
               // login(this.refs.mobbile.value, this.state.psw);
                    history.goBack()
               
        		} else {
        			Toast.fail(value.msg, 2);
                }
              
    }
    //发送验证码
    async onClickYzm() {
        ////console.log()
        var mobile = this.refs.mobbile.value;
        var code = await user.smscode({ mobile: mobile });
        //console.log(code)
        this.setState({ bgcol: "#c4c4c4" })
        const _this = this;
        let num = 60;
        let Countdown = setInterval(function () {
            num = num - 1;
            if (num >= 0) {
                _this.setState({ codeVal: num });
                return;
            }
            _this.setState({ codeVal: '获取验证码' });
            _this.setState({ bgcol: "#00a3f0" })
            clearInterval(Countdown);
            }, 1000)
        
    }
  



    render() {

        //      const { files } = this.state;
        const { history } = this.props;
        const chgType = this.props.match.params.type;
        const NavbarProps = {
            history,
            name: '忘记密码'
        }
        return (
            <div>
                <style>
                    {`
		                .am-list-item.am-input-item{
		                    height:.57rem;
		                    margin-bottom:10px;
		                    background:rgba(0,0,0,0);
		                    padding-left: .55rem;
		                    border:0;
		                  
		
		                }
		                  .am-input-label{
		                    font-size: .28rem !important;
		                    color:#FFFFFF !important;
		                    margin-right: .30rem !important;
		                  }
		                  .am-list-item .am-input-control input{
		                    font-size: .36rem !important;
		                    color: #919191;
		
		                  }
		                  .am-list-body::before{
		                    visibility: hidden;
		                  }
		                  .am-list-line{
		                    border-bottom: 1px solid #000000 !important;
		                  }
		                  .am-list-line::after{
		                    visibility: hidden;
		                  }
		                  .am-list-body{
		                    border: none !important;
		                    background: none;
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
                        修改密码
                    </span>
                </NavBar>
                <div className={styles.Pswmain}>
                    <img className={styles.Pswlogo} src={LOGO} alt="" />
                    <p className={styles.name}>KR-糖果网</p>
                    <p className={styles.englishName}>KR-CANDY COIN</p>
                    <div className={styles.inputList}>
                        <ul>
                            <li>
                                <div className={styles.iconWrap}>
                                    <span className={iconStyle.iconfont} style={{ "color": "#00a3f0" }}>&#xe621;</span>
                                </div>
                                <div className={styles.inputwrap2}>
                                    <input placeholder="请输入手机号" value={this.state.mobbile} disabled ref="mobbile"/>
                                </div>
                                <div className={styles.codewrap}>
                                    <button
                                        className={styles.codeSend}
                                        onClick={this.onClickYzm.bind(this)}
                                        disabled={false}
                                        style={{ background: this.state.bgcol }}
                                    >{this.state.codeVal}</button>
                                </div>
                            </li>
                            <li>
                                <div className={styles.iconWrap}>
                                    <span className={iconStyle.iconfont} style={{ "color": "#00a3f0" }}>&#xe656;</span>
                                </div>
                                <div className={styles.inputwrap}>
                                    <input placeholder="请输入验证码" onChange={this.changeCode.bind(this)} />
                                </div>
                            </li>
                            <li>
                                <div className={styles.iconWrap}>
                                    <span className={iconStyle.iconfont} style={{ "color": "#00a3f0" }}>&#xe6e6;</span>
                                </div>
                                <div className={styles.inputwrap}>
                                    <input placeholder="请输入新密码" onChange={this.changePsw.bind(this)} />
                                </div>
                            </li>
                            <li>
                                <div className={styles.iconWrap}>
                                    <span className={iconStyle.iconfont} style={{ "color": "#00a3f0" }}>&#xe6e6;</span>
                                </div>
                                <div className={styles.inputwrap}>
                                    <input placeholder="请确认新密码" onChange={this.changeTwoPsw.bind(this)} />
                                </div>
                            </li>

                        </ul>
                        <div className={styles.forgetPsw}>

                        </div>
                        <div className={styles.SurePswBtn} onClick={this.SurePswBtn.bind(this)}>  重   置   </div>
                    </div>
                    {/* <p className={styles.infoList}>
                  
                  <span>忘记密码?</span>
                </p>

                
				*/}
                </div>
            </div>
        )

    }
}