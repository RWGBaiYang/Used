// pages/circle/circle.js
let globalData = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opr: ''
  },
  transinfo(e) {
    var tid = e.detail; //传递数据
    console.log(tid);
    wx.navigateTo({
      url: '../detail/detail',
      success:res=>{
       // res.eventChannel.emit('channeldata', {name:'kindear'})
      }
    })
  },
  topub() {
    wx.navigateTo({
      url: '../pub/pub',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.sc = this.selectComponent("#sc");
    
  },
  onReady() {},
  onShow(){
    this.onPullDownRefresh();
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  onReachBottom() {
    console.log('触底函数')
    var _ = this;
    _.setData({
      opr: 'rb'
    },()=>{
      _.setData({
        opr:''
      })
    })
  },
  onPullDownRefresh() {
    var _ = this;
    _.setData({
      opr: 'pr'
    },()=>{
      _.setData({
        opr:''
      })
    })
  }
})