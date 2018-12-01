import React, { Component } from 'react';
import { NavBar, ImagePicker, Picker, List, Toast} from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/msshop.css";
import iconStyle from "./styles/font.css";
import { district } from 'antd-mobile-demo-data';
import arrayTreeFilter from 'array-tree-filter';
import * as user from "../services/user";
import * as fetchs from '../utils/fetch';
import store from 'store';
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

// const CustomChildren = props => (
//     <div
//         onClick={props.onClick}
//         style={{ backgroundColor: '#fff', paddingLeft: 15 }}
//     >
//         <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
//             <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
//             <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
//         </div>
//     </div>
// );
export default class Sjshop extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            multiple: false, 
            data: [],
            cols: 1,
            pickerValue: [],
            asyncValue: [],
            sValue: ['2013', '春'],
            visible: false,
            goodsclassArr:[],
        };
    }
    onChange = (files, type, index) => {
        //console.log(files, type, index);
        this.setState({
            files,
        });
    }
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }
    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    
    onClick = () => {
        
    };
    onPickerChange = (val) => {
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
    };
    getSel() {
        const value = this.state.pickerValue;
        if (!value) {
            return '';
        }
        const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
        return treeChildren.map(v => v.label).join(',');
    }
    componentDidMount(){
        var that = this;
        fetchs.read_Token(fetchs.APIHost + "/goods/cate", fetchs.getAuth("/goods/cate")).then(response => response.json())
        .then(json => { 
            var goodsclassArr =[];
            //console.log(json)
            json.data.map(function(res,index){
            var classObj = {
                label: res.cate_name,
                value: res.id,
                key:index+"keys",
            }
            goodsclassArr.push(classObj)
            })
            that.setState({
                data: goodsclassArr,
            });
        });

        
    }
    //添加商品
    async addshopSure(){
        const { history } = this.props;
        //console.log("2", this.state.files)
        //商品名字
        const goodsname = this.refs.goodsname.value;

        //商品原价
        const goodsoldPrice = this.refs.goodsoldPrice.value;

        //商品现价
        const goodsnewPrice = this.refs.goodsnewPrice.value;
        //商品规格
        const goodshuige = this.refs.goodshuige.value;

        //商品类别
        const goodsclass = this.state.asyncValue.toString();
        //商品描述
        const goodsde = this.refs.goodsde.value;
        //商品图片
        const goodsimg = this.state.files;
        const goodsimgarr =[];
        goodsimg.map(function (res) {
            const obj = { url: res.url}
            goodsimgarr.push(obj)
        })
        
        var data ={
            goodsname: goodsname,
            goodsoldPrice: goodsoldPrice,
            goodsnewPrice: goodsnewPrice,
            goodsguige: goodshuige,
            goodsclass: goodsclass,
            goodsde: goodsde,
            goodsimg: goodsimgarr,
            shopid:store.get("userinfo").uid,

        }
        //console.log("darta", JSON.stringify(data))
        var goodsResult =  await user.addshop(data);
        //console.log("goodsResult", goodsResult)
        if (goodsResult.code == 1) {
            Toast.success(goodsResult.meg, 2);
            history.push("./sjShopLists")
        } else {
            Toast.fail(goodsResult.msg, 2);
        }
    }
    render() {
        const { history } = this.props;
        const { files } = this.state;
        
        return (
            <div>
                <style>
                    {`
                        .am-image-picker-list .am-image-picker-upload-btn{
                            border:2px dashed #00a3f0;
                        }
                        .am-image-picker-list .am-image-picker-upload-btn:before, .am-image-picker-list .am-image-picker-upload-btn:after{
                            background:#00a3f0;
                        }
                        .am-list-item{
                            border:0 none;
                            border: 1px solid #a7a8aa;
                            height: 0.6rem;
                            width: 5rem;
                            line-height: 0.6rem;
                            margin-left: .5rem;
                        }
                        .am-list-item .am-list-line .am-list-content{
                            font-size: .22rem;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            color:#ddd;
                        }
                        .am-list-item .am-list-line .am-list-extra{
                            font-size: .22rem;
                            height: 0.6rem;
                            line-height: 0.6rem;
                        }
                        .am-picker-popup-header{
                            font-size: .22rem;
                            height: 0.6rem;
                            line-height: 0.6rem;
                        }
                        .am-picker-popup-item{
                            font-size: .22rem;
                            height: 0.6rem;
                            line-height: 0.6rem;
                        }
                        .am-picker-col-item {
                            font-size:0.26rem;
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
                    rightContent={
                        [<div>
                            <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem", color: "#FFFFFF" }}>
                                &#xe757;
                            </span>
                            <span style={{ fontSize: "0.3rem", lineHeight: '7vh', color: "#FFFFFF" }} onClick={() => history.push("/sjShopLists")}>上传记录</span>
                        </div>
                        ]
                    }
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        添加商品
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.addShopinput}>
                        <span>商品名称</span>
                        <input placeholder="请输入商品名称" ref="goodsname"/>
                    </div>
                    <div className={styles.addShopinput}>
                        <span>原价</span>
                        <input placeholder="请输入商品原价" ref="goodsoldPrice"/>
                    </div>
                    <div className={styles.addShopinput}>
                        <span>现价</span>
                        <input placeholder="请输入商品现价" ref="goodsnewPrice"/>
                    </div>
                    <div className={styles.addShopinput}>
                        <span>规格</span>
                        <input placeholder="请输入商品规格（如：绿色,1件）" ref="goodshuige"/>
                    </div>
                    <div className={styles.addShopinput}>
                        <span>请选择商品类别</span>
                        {
                            this.state.data.length>1?(<Picker
                            data={this.state.data}
                            cols={this.state.cols}
                            value={this.state.asyncValue}
                            onPickerChange={this.onPickerChange}
                            onOk={v => console.log(v)}
                        >
                            <List.Item  arrow="horizontal" onClick={this.onClick}>选择的类别</List.Item>
                        </Picker>):""
                        }
                    </div>
                    <div className={styles.addShopinput}>
                        <span>商品描述</span>
                        <input placeholder="请输入商品描述" ref="goodsde"/>
                    </div>
                    <div className={styles.addShopinput2}>
                        <span style={{width:"100%"}}>商品图片(可最多上传3张图片)</span>
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 3}
                            multiple={this.state.multiple}
                        />
                    </div>
                    
                    <div className={styles.mssure}>
                        <button onClick={this.addshopSure.bind(this)}>确认添加</button>
                    </div>
                </div>
            </div>
        )
    }
}