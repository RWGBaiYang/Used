const app = getApp();
const db = wx.cloud.database();
const ContentSafe = require('../../_self/application.js').ModeConfig.ContentSafe;
const cloud = require('../../_self/cloud.js');
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
const escurl = require('../../_self/application.js').EscSetting.EscDomain
const timeutil = require('../../utils/TimeUtil.js');
const cwx = require('../SocialDetail/profunc.js');
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    commentid: {
      type: 'String',
      observer: function (newVal, oldVal) {
        //数值刷新处理方式
        var _  = this;
        //更新值，并且刷新评论列表
        console.log('评论盒子已锁定文章id')
        _.setData({
          replyid:newVal
        })
      }
    },
    commentnum:{
      type:'Number',
      observer:function(newVal,oldVal){
        var _ = this;
        //刷新数据
        console.log(newVal)
        _.setData({
          commentNum:newVal
        })
      }
    },
    parisenum:{
      type:'Number',
      observer:function(newVal,oldVal){
        var _ = this;
        //刷新数据
        //console.log(newVal)
        _.setData({
          pariseNum:newVal
        })
      }
    }
  },
  data: {
    replyid:'',
    commentText: "",
    commentNum:0,
    pariseNum:0,
    textarea: false,
    commentVisible: false,
    commentVisibles: false,
    circleitem: null,
    content: '',
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
    handleOpenInput(e, replyId = '') {
      if (app.globalData.openid=='') {
        wx.navigateTo({
          url: '/pages/Door/Auth/Auth',
        })
        return;
      }
      this.setData({
        commentVisible: true,
        commentVisibles: true,
      })
      setTimeout(() => {
        this.setData({
          textarea: true
        })
      }, 400)
    },
    handleCloseInput() {
      this.setData({
        textarea: false,
        commentVisibles: false
      })
      setTimeout(() => {
        this.setData({
          commentVisible: false
        })
      }, 400)
    },
    taInput(e) {
      this.setData({
        commentText: e.detail.value.trim()
      })
    },
    /**
     * 发表评论
     */
    async handleSend() {
      console.log("开始发布")
      wx.showLoading({
        title: '发布中...',
      })
      //上传评论数据
      var _ = this;
      const commentText = _.data.commentText;//获取评论内容
      if(ContentSafe){
        //开启敏感文字校验
        wx.cloud.callFunction({
          name:'openapi',
          data:{
            action:'msgSecCheck',
            content:commentText
          }
        }).then(res=>{
          //打印
          if(res.result.errCode==0){
            //正常
            _.writetoDB(commentText)
          }else{
            wx.hideLoading();
            wx.showModal({
              title:'提醒',
              content:'请注意评论内容！'
            })
          }
         // wx.hideLoading()
         console.log(res)
        
        })
      }else{
        //关闭敏感文字校验
        _.writetoDB(commentText);
      }
      console.log("A")
      console.log(this.data.replyid)
      this.remarkadd(this.data.replyid)
      console.log("B")
    },
    remarkadd(e) {
      console.log("开始")
      return new Promise(function (resolve, reject) {
        wx.cloud.callFunction({
          name: 'transfunc',
          data: {
            opr: 'incremark',
            id: e,
          },
          success(ans) {
            resolve(ans)
          },
          fail(ans) {
            reject('call fail')
          }
        })
      })
    },
    writetoDB(text){
      var _ = this;
      const wxuserinfo = wx.getStorageSync('wxuserinfo') || 0
     // this.triggerEvent('pubcom',text);
      if(usecloud){
        wx.cloud.callFunction({
          name:'clouddb',
          data:{
            opr:'add',
            tablename: 'remarks_list',
            data:{
              create_time: timeutil.TimeCode(new Date()),
              update_time: timeutil.TimeCode(new Date()),
              content:text,
              nickname: app.globalData.userInfo.nickName,
              avatar: app.globalData.userInfo.avatarUrl,
              circle_id:_.data.replyid,
              userid:app.globalData.openid
            }
          }
        }).then(res=>{
          this.handleCloseInput();
          wx.hideLoading();
          cloud.CallCloudFunc('transfunc',{
            oprobj:'incremark',
            docid:_.data.replyid,
          }).then(_res=>{
            console.log(_res)
          })
        })
      }else{

      }
      /*
      
      */
    },
    /**
     * 点赞和取消点赞
     */
    async handlePraise() {
      const detail = this.data.detail
      const subid = detail._id;
      const uid = wx.getStorageSync('uid') || 0;

      wx.cloud.callFunction({
        name: 'praise',
        data: {
          uid,
          subid
        }
      }).then(res => {
        detail.isPraise = res.result.isPraise
        detail.praise = res.result.praise
        this.setData({
          detail
        })
      })
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
    catchtap() {},
    catchtouchmove() {}
  }
})