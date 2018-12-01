import React, { Component } from 'react';
import styles from "./styles/login.css";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import * as user from "../services/user";
import store from "store";
//import Chgstyles from "./styles/login.css";
import LOGO from "../assets/images/LOGO.png";
import iconStyle from "./styles/font.css";
import { Toast, NavBar ,ImagePicker} from 'antd-mobile';
import GoBack from "../assets/images/goback.png";
import icon from "../assets/images/icon.png";
export default class ChgPWD extends Component {
    constructor() {
        super();
        this.state = {
            mobbile: '',
            code: '',
            psw: '',
            twoPsw: '',
            codeVal: "获取验证码",
            bgcol: "#00a3f0",
            files: [],
            multiple: false,
            headerimg: icon,
        };
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
    // async changeCode(event) {
    //     this.setState({ code: event.target.value });
    // }

    // async changePsw(event) {
    //     this.setState({ psw: event.target.value });
    // }
    // async changeTwoPsw(event) {
    //     this.setState({ twoPsw: event.target.value });
    // }
    //提交数据
    async SurePswBtn() {

        const {
            dispatch,
            history
        } = this.props;
        let headerimg = this.state.headerimg;
        //console.log(headerimg)
        
        if (headerimg ==="static/icon.b83fdbb5.png"){
            Toast.offline("请提交新的头像!", 2);
            return false;
        }
        store.set("headerimg", headerimg)
        //alert(2)
        Toast.loading("正在修改", 0);
        const data = {
            headimg: headerimg,
            code: "111",
            iscode: 0,
            //mobile: this.refs.mobbile.value
        }
        const value = await user.change(data)
        ////console.log(value)
        Toast.hide();
        //console.log("login", value)
        if (value.code == 1) {
            Toast.success(value.msg, 2);
            history.goBack()

        } else {
            Toast.fail(value.msg, 2);
        }


        //		if(codeinput !== this.state.code) {
        //			Toast.offline("验证码错误!", 2);
        //			return;
        //		}
        //Toast.loading("正在登录", 0);
        //		const value = await user.login({
        //			username: username,
        //			password: password
        //		});
        //		Toast.hide();
        //		//console.log("login", value)
        //		if(value.code == 1) {
        //			dispatch({
        //				type: 'user/getUser',
        //				payload: {
        //					user: value.data
        //				}
        //			});
        //			Toast.success('登录成功!', 2);
        //			dispatch(routerRedux.push({
        //				pathname: '/'
        //			}));
        //			login(this.state.username, this.state.password);
        //		} else {
        //			Toast.fail(value.msg, 2);
        //		}
    }
    //发送验证码
    // async onClickYzm() {

    //     this.setState({ bgcol: "#c4c4c4" })
    //     const _this = this;
    //     let num = 60;
    //     let Countdown = setInterval(function () {
    //         num = num - 1;
    //         if (num >= 0) {
    //             _this.setState({ codeVal: num });
    //             return;
    //         }
    //         _this.setState({ codeVal: '获取验证码' });
    //         _this.setState({ bgcol: "#00a3f0" })
    //         clearInterval(Countdown);
    //     }, 100)
    // }
    componentDidMount() {
        var storeheaderImg = store.get("headerimg")
        if (storeheaderImg){
            this.setState({
                headerimg: storeheaderImg 
            });
        }
        
    }
    onChange = (files, type, index) => {
        //console.log(files, type, index);
        this.setState({
            files,
        });
       
        this.setState({
            headerimg: files[0].url ? files[0].url : icon
        });
       
    }


    render() {

        //      const { files } = this.state;
        const { history } = this.props;
        const { files } = this.state;
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
                        .am-image-picker-list .am-image-picker-upload-btn{
                            border:2px dashed #00a3f0;
                            
                        }
                        .am-image-picker-list .am-image-picker-upload-btn:before, .am-image-picker-list .am-image-picker-upload-btn:after{
                            background:#00a3f0;
                        }
		                .am-image-picker-list .am-image-picker-item .am-image-picker-item-remove{
                            display:none;
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
                        修改头像
                    </span>
                </NavBar>
                <div className={styles.Pswmain}>
                    <img className={styles.Pswlogo} src={LOGO} alt="" />
                    <p className={styles.name}>KR-糖果网</p>
                    <p className={styles.englishName}>KR-CANDY COIN</p>
                    <div className={styles.inputList}>
                        <span style={{ width: "100%", fontSize: ".26rem", color:"#00a3f0"}} >点击加号上传头像</span>
                        <div className={styles.headimgwrap}>
                            <img src={this.state.headerimg} alt="" className={styles.headimgcont}/>
                            <ImagePicker
                                files={files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={files.length < 1}
                                multiple={this.state.multiple}
                                className={styles.headimgjia}
                            />
                        </div>
                       
                        <div className={styles.forgetPsw}>

                        </div>
                        <div className={styles.SurePswBtn} onClick={this.SurePswBtn.bind(this)}>  修   改   </div>
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