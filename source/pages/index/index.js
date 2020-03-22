Page({

  /**
   * 页面的初始数据
   */
  data: {
    TopButtonList: ["+","-","清空","合并","计算"],
    totalPay: 0,
    payMemberList:[{name:"",price:0 ,pay:0}],
    // calData:[]
    navListData:[],
    p:0.2
  },

  getppp:function (){
      this.p=0.5
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
      default:break;
    }
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

  getNavListData(){
    wx.request({
      url:"wanggang.store",
      success(res){
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发起请求
    this.getNavListData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})