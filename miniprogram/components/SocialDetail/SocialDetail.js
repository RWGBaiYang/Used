// components/SocialDetail/SocialDetail.js
const app = getApp();
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
const escurl = require('../../_self/application.js').EscSetting.EscDomain;
const db = wx.cloud.database();
const timeutil = require('../../utils/TimeUtil.js');
const cwx = require('profunc.js');
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    id: '',
    circleitem: null,
    content: '',
    comments: [],
    liked: true
  },

  lifetimes:{
    created(){
      var that = this;
    // console.log(options.id)
    //console.log(app.globalData.userInfo)
    wx.getStorage({
      key: 'selcircle',
      success(res) {
        console.log(res)
        that.setData({
          circleitem: res.data
        }, () => {
          that.reqThumbs();
          that.reqComment();
        })
      }
    })
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
    ViewImage(e) {
      wx.previewImage({
        urls: e.currentTarget.dataset.imglist,
        current: e.currentTarget.dataset.url
      });
    },
    // pubcom(e) {
    //   console.log("开始")
    //   var that = this;
    //   wx.showLoading({
    //     title: '上传中',
    //     mask: true
    //   })
    //   console.log(e)
    //   that.setData({
    //     content:e.detail
    //   },()=>{
    //     cwx.AddRemarks(that.data).then(res => {
    //       console.log(res);
    //       that.reqComment();
    //       //调用组件中的方法
    //       this.commentBottom = this.selectComponent("#commentBottom");
    //       this.commentBottom.handleCloseInput();
    //     })
    //   })
      
    // },

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

    },
    reqComment() {
      var that = this;
        db.collection('remarks_list').where({
          circle_id: that.data.circleitem._id
        }).get().then(res => {
          console.log(res)
          console.log(that.data.circleitem.remarksnum)
          that.setData({
            comments: res.data,
            content: ''
        })
          wx.hideLoading();
        })

    },
    ilike() {
      console.log("开始")
      var that = this;
        wx.showLoading({})
        console.log(that.data)
        cwx.AddThumbs(that.data)
          console.log("已进入")
          // console.log(ans)
          var titem = that.data.circleitem;
          titem.thumbsnum = titem.thumbsnum + 1
          that.setData({
            liked: false,
            circleitem: titem
          })
          console.log("")
          wx.hideLoading()


        
        console.log("结束");
    },
    throwError(value) {
      // 抛出异常
      console.log("异常")
      throw new Error(value);
    },
    textAreaBlur(e) {
      //console.log(e)
      this.setData({
        content: e.detail.value
      })
    },
    reqThumbs() {
      //请求看看自己是否喜欢
      var that = this;
        db.collection('thumbs_list').where({
          userid: app.globalData.openid,
          circle_id: that.data.circleitem._id
        }).get().then(res => {
          console.log(res)
          if (res.data.length != 0) {
            that.setData({
              liked: false
            })
          }
        })

    }
  }
})
