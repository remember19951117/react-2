import React, {Component} from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import store from "store";
import {Toast } from 'antd-mobile';
// const Item = List.Item;
// const Brief = Item.Brief;
import styles from "./styles/login.css";
import * as user from '../services/user';
import { login } from '../utils/fetch';
import { APIHost } from '../utils/fetch';
import LOGO from "../assets/images/LOGO.png";
import iconStyle from "./styles/font.css";

// import usernameimg from "../assets/images/username.png";
// import GoBack from "../assets/images/goback.png";
@connect(state => ({
  user: state.user
}))

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			buyModal: false,
			selectPay: 1,
			username: "",
			password: "",
			disabled: false,
			img: 0,
			code:'3981',
			codeinput:'',
		};
	}

	async loginClick() {
		const {
			dispatch
		} = this.props;
		let username = this.state.username;
		let password = this.state.password;
		let codeinput = this.state.codeinput;
		
		
		////console.log(username,password)
		
		
		
		if(username === "" || password === "") {
			Toast.offline("帐号和密码不能为空!", 2);
			return;
		}
		
		Toast.loading("正在登录", 0);
		const value = await user.login({
			username: username,
			password: password
		});
		console.log(value)
		
		login(this.state.username, this.state.password);
		Toast.hide();
		if(value.code == 1) {
			//console.log(value)
			store.set("userinfo", value.data)
			store.remove('gg') 
			dispatch(routerRedux.push({
				pathname: '/index'
			}));
			Toast.success('登录成功!', 2);

		} else {
			Toast.fail(value.msg, 2);
		}
	}
	// async onClickYzm(){
		
	// 	 var Arr = ['3981', '6316', '0940', '9716', '1321', '9033', '1321', '0851', '4280', '0606',
	// 	    '8397', '8487', '8546', '8897', '8907', '0349', '0778', '6786', '5796', '6998',
	// 	    '6838', '3588', '3697', '8537', '0687', '0507', '8496', '8873', '3596', '7780',
	// 	    '2586', '8979', '5048', '6080', '0488', '2580', '3547', '4587', '6580', '0587',
	// 	    '3586', '3888', '3347', '3480', '9580', '9668', '9308', '2387', '1859', '1769',]
	// 	  var index = Math.floor((Math.random() * Arr.length));
	// 	  this.setState({ code: Arr[index], img: index });
		  
	// }
	async changeUser(event){
		 this.setState({username: event.target.value});
	}
	async changepsw(event){
		 this.setState({password: event.target.value});
	}
	
	// async changeCode(event){
	// 	this.setState({codeinput: event.target.value});
	// }
	godown(){
		window.location.href = APIHost+"/kr.apk";
	}
	render() {
		const {
			history
		} = this.props;
		return(
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
                <div className={styles.main}>
				<img 
				className={styles.logo} 
				src={LOGO}
				alt=""
				/>
                <p className={styles.name}>KR-糖果网</p>
                <p className={styles.englishName}>KR-CANDY COIN</p>
                <div className={styles.inputList}>
                	<ul>
                		<li>
                			<div className={styles.iconWrap}>
		                  		<span className={iconStyle.iconfont} style={{"color":"#00a3f0"}}>&#xe621;</span>
		                  	</div>
                			<div >
									<input placeholder="输入用户号" onChange={this.changeUser.bind(this)} className={styles.inputwrap}/>
                			</div>
                		</li>
                		<li>
                			<div className={styles.iconWrap}>
		                  		<span className={iconStyle.iconfont} style={{"color":"#00a3f0"}}>&#xe6e6;</span>
		                  	</div>
                			<div >
									<input placeholder="输入密码" onChange={this.changepsw.bind(this)} type="password" className={styles.inputwrap}/>
                			</div>
                		</li>
                		{/* <li>
                			<div className={styles.iconWrap}>
		                  		<span className={iconStyle.iconfont} style={{"color":"#00a3f0"}}>&#xe656;</span>
		                  	</div>
                			<div>
									<input placeholder="输入验证码" onChange={this.changeCode.bind(this)} className={styles.inputwrap2}/>
                			</div>
                			<div className={styles.codewrap} onClick={this.onClickYzm.bind(this)}>
                				<img src= {require("../assets/images/verify" + this.state.img + ".png")} alt=""/>
                			</div>
                		</li> */}
                	</ul>
                	<div className={styles.forgetPsw}>
						<a onClick={this.godown.bind(this)}>App下载></a>
						<span onClick={() => history.push("/chgpwd")}>忘记密码?</span>
                	</div>
						
                	<div className={styles.SureBtn} onClick={()=>this.loginClick()}>登                           录</div>
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