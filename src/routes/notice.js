import React,{Component} from 'react';
import { List ,InputItem,Toast,Modal,Pagination} from "antd-mobile";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/notice.css";
import ModalStyles from "./styles/IndexModal.css";

import HeadIcon from "../assets/images/icon.png";
import CancelIcon from "../assets/images/cancel.png";
import Tdetails from "../assets/images/tdetails.png";

const Item=List.Item;

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


export default class Notice extends Component {
    constructor() {  
        super();  
        this.state = {
            selectBtn:0,
            DetailModal:false
        };
      }
      showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        //console.log(key,e);
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
    
    render(){
        const {history} = this.props;
        const NavbarProps={
            history
        }
        return(
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

                        
                    `}
                </style>
                <MyNavBar  {...NavbarProps}/>
                
                <div className={styles.main}>
                    <div  className={styles.ProfitTop} >
                        
                    </div>


                    <div className={styles.PlateBodyD}>
                        <div className={styles.DItem} onClick={this.showModal("DetailModal")}>
                            <p className={styles.NoticeTitle}><span>2018.05.21</span><span>系统公告</span></p>
                            <div className={styles.NoticeInfo}>系统公告,恭喜阿萨德开始了打开三大撒啊断水断电洒洒的的萨阿德萨德萨苏打撒扩大恭喜阿萨德开始了打开三大撒啊断水断电洒洒的的萨阿德萨德萨苏打撒扩大</div>
                        </div>
                        <Pagination total={5}
                        className={styles.Pag}
                        current={1}
                        locale={{
                            prevText: (<span className="arrow-align">上一页</span>),
                            nextText: (<span className="arrow-align">下一页</span>),
                        }}
                        />
                    </div>
                    


                </div>

                {/*打款凭据弹窗*/}
                    <Modal
                    visible={this.state.DetailModal}
                    transparent
                    styles={{width:"6.3rem"}}
                    maskClosable={false}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                <div className={ModalStyles.Plate}>
                    <div className={ModalStyles.PlateTitle}>
                        <img className={ModalStyles.PlateTitleImg} src={Tdetails} />
                        <img className={ModalStyles.PlateTitleImg} src={CancelIcon} onClick={this.onClose('DetailModal')}/>
                    </div>
                    <div className={ModalStyles.Platebody}>
                        <p>恭喜阿萨德开始了打开三大撒啊断水断电洒洒的的萨阿德萨德萨苏打撒扩大恭喜阿萨德开始了打开三大撒啊断水断电洒洒的的萨阿德萨德萨苏打撒扩大</p>
                    </div>
                </div>
                </Modal>


            </div>
        )
    }
}