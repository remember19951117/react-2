
import React, { Component } from 'react';
import { NavBar } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/xitong.css";
import * as fetchs from '../utils/fetch';
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


export default class Change extends Component {
    constructor() {
        super();
        this.state = {
            gg:""
        };
    }
    componentDidMount(){
        const id = this.props.location.search.replace("?id=", "");
        const goodsdetaildata = {
            id: id
        }
        
        fetchs.creat_Token(fetchs.APIHost + '/notice/get', fetchs.getAuth('/notice/get'), JSON.stringify(goodsdetaildata)).then(response => response.json())
            .then(json => {
                
                this.setState({gg:json.data})
        })
    }
    render() {
        const { history } = this.props;
        const NavbarProps = {
            history
        }
        //console.log(22222, this.state.gg);
        

        return (
            <div>
                <style>
                    {`
                        
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
                       公告详情
                    </span>
                </NavBar>

                <div className={styles.xitongcont}>
                    <h3> {this.state.gg ? this.state.gg.n_title : ""}</h3>
                    <p>
                        
                        <span dangerouslySetInnerHTML={{
                            __html:  this.state.gg ? this.state.gg.n_message : "" 
                        }} />
                    </p>
                </div>
            </div>
        )
    }
}