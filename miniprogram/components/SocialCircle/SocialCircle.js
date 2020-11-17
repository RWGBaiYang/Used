// components/SocialCircle/SocialCircle.js
const app = getApp();
const cwx = require('profunc.js')
const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    oprvalue: {
      type: 'String',
      observer: function (newVal, oldVal) {
        var _ = this;
        if (newVal == 'rb') {
          
          _.ReqData();
        } else if (newVal == 'pr') {
          _.setData({
            lists: []
          }, () => {
            _.ReqData();
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: []
  },

  //生命周期 (会导致内容可能出现两次)
  // lifetimes: {
  //   created() {
  //     var that = this;
  //     that.ReqData();

  //   },

  // },
  /**
   * 组件的方法列表
   */
  methods: {
    todetail(e) {
      var tid = e.currentTarget.dataset.id;
      // console.log(tid)
      wx.setStorage({
        key: 'selcircle',
        data: this.data.lists[tid]
      })
      this.triggerEvent('transinfo', this.data.lists[tid])
    },
    ReqData() {
      wx.showLoading({
        title: '加载中~',
      })
      var that = this;
      var len = that.data.lists.length;
      console.log(len)
      //封装获取请求，使用云开发和非云开发使用同一种方式请求
      cwx.QueryCircleInfo(len).then(res => {
        console.log(res)
        if (res.data != 'request fail') {
          that.setData({
            lists: that.data.lists.concat(res.data)
          })
        }
        wx.stopPullDownRefresh();
        wx.hideLoading();
      })
    },

    ViewImage(e) {
      wx.previewImage({
        urls: e.currentTarget.dataset.imglist,
        current: e.currentTarget.dataset.url
      });
    },
    topub(e) {
      if (e.detail.errMsg == "getUserInfo:ok") {
        console.log('获得授权成功')
        app.globalData.userInfo = e.detail.userInfo;
        wx.setStorageSync('wxuserinfo', e.detail.userInfo)
        //console.log(e.detail.userInfo)
        this.triggerEvent('topub', 'helloworld')
      } else {
        console.log('获得授权失败')
      }

    }
  }

})