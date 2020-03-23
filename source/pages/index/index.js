const app = getApp();
var shareTicket
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // shareData: {
    //   title: "转发账单",
    //   desc: "巴拉巴拉",
    //   path: "/pages/index/index?name=alan"
    // },
    TopButtonList: ["+","-","清空","合并","计算"],
    totalPay: 0,
    payMemberList:[{name:"",price:0 ,pay:0}],
    // calData:[]
    navListData:[]
  },

  onShareAppMessage: function(res) {
    let totalPay = this.data.totalPay
    let totalPayJson = JSON.stringify(totalPay)
    let listData = this.data.payMemberList
    let listJson = JSON.stringify(listData)
    // listData.encode
    return {
      title: "转发账单",
      desc: "alan出版",
      path: "/pages/index/index?sharedList=" + listJson + "&totalPay=" + totalPayJson
      
    };
  },


  topItemClick: function(e) {
    let cid = e.currentTarget.id;
    switch (cid) {
      case "+": this.addAction();
      break;
      case "-": this.subAction();
      break;
      case "清空": this.clearAction();
      break;
      case "合并": this.mergeAction();
      break;
      case "计算": this.calAction();
      break;
      case "转发": this.shareAction();
      break;
      default:break;
    }
  },

  shareAction: function() {
   wx.showShareMenu({
      withShareTicket: true,
      success: (res) => {
        console.log('showShareMenu----onload---success', res);
      },
      fail: () => {
        console.log('fail')
      }
    })
  },

  addAction: function() { 
    let payMemberList = this.data.payMemberList
    payMemberList.push({name:"",price:0 ,pay:0})
    this.setData({
      payMemberList: payMemberList
    })
  },
  subAction: function() {
    let payMemberList = this.data.payMemberList
    payMemberList.pop()
    this.setData({
      payMemberList: payMemberList
    })
  },

  clearAction: function() {
    this.setData({
      payMemberList: []
    })
  },

  assertName: function(name) {
    if (name == null || name == "") {
      wx.showToast({
        title: "空的名字"
      });
      return false
    }
    return true
  },

  assertPrice: function(price) {
    if (price == null || price == "") {
      wx.showToast({
        title: "空的价格"
      });
      return false
    }
    return true
  },

  mergeAction: function() {
    let mergedMap = [];
    let payMemberList = this.data.payMemberList;
    
    payMemberList.forEach((value,index,array)=>{
      if (mergedMap[value.name] != null & mergedMap[value.name] != {}) {
        let pay =  Number(mergedMap[value.name].pay) + Number(value.pay);
        mergedMap[value.name].pay = pay.toFixed(2);
        mergedMap[value.name].price += value.price;
        value.pay = 0;
        value.price = 0;
        console.log(1)
      } else {
        console.log(2)
        mergedMap[value.name] = value;
      }
    })
    payMemberList = payMemberList.filter((value)=>{ return value.name != '' & value.price != 0 });
    this.setData({
      payMemberList: payMemberList
    });
  },
  calAction: function() {
    let totalPay = this.data.totalPay;
    if (totalPay <= 0) {return};
    let payMemberList = this.data.payMemberList;
    let sum = payMemberList.filter((value)=>{
      return value.name != null 
      & value.name != ""
      & value.price != 0
      & value.price != null;}).reduce((pre,cur)=>{
      return cur.price + pre;;
     }, 0);
     payMemberList.forEach((value, index, array)=>{
        if (array[index].name != null & array[index].price != null
          &array[index].name != "" & array[index].price != 0){
          array[index].pay = ((value.price/sum)*totalPay).toFixed(2);
        } else {
          array[index].pay = 0;
        }
     })
     this.setData({
       payMemberList: payMemberList
     });
  },

  bindblurActualTotal: function(e) {
    let totalPay = e.detail.value;
    this.setData({
      totalPay: ~~totalPay
    })
  },

  bindblurName: function(e) {
    let payMemberList = this.data.payMemberList;
    let index = e.currentTarget.id;
    payMemberList[index].name = e.detail.value;
    this.setData({
      payMemberList: payMemberList
    })
  },
  bindblurPrice: function(e) {
    let payMemberList = this.data.payMemberList;
    let index = e.currentTarget.id;
    payMemberList[index].price = Number(e.detail.value);
    this.setData({
      payMemberList: payMemberList
    })
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    let sharedList = options.sharedList
    let totalPay = options.totalPay
    if (sharedList != null) {
      let sharedListObj = JSON.parse(sharedList)
      let totalPayObj = JSON.parse(totalPay)
      this.setData({
        totalPay: totalPayObj,
        payMemberList: sharedListObj
      })
    }
  },
  

})