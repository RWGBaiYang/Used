const util = require('../../utils/util')
Page({
  data:{
      Label:null,
      logs:[]
  },
  liuyan:function(e){
    this.data.Label=e.detail.value;
  },
  getlogs:function(){
    const that = this
    const ui = wx.getStorageSync("userinfo")
    if(!ui.openid)
    {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
    else{
      wx.cloud.callFunction({
        name:"getlogs",
        success:res=>{
          
          that.setData({
            logs:res.result.data.map(log=>{
              var date = util.formatTime(new Date(log.date))
              log.date=date
              return log
            })
          })
        },
        fail:res=>{
          console.log("res",res)
        }
      })
    }
    
  },
  addLabel(){
    
    const that=this
    var a = that.data.Label
    const ui = wx.getStorageSync('userinfo')
    if(!ui.openid){
      wx.switchTab({
        url: '/pages/home/home',//如果没有授权则跳转至授权页面
      })
    }
    else{
      wx.cloud.callFunction({
        name:"creatlog",
        data:{
          label:a,
          date:Date.now(),
          openid:ui.openid,
          name:ui.nickName,
          avatar:ui.avatarUrl
        }
      })
      that.onShow();
    }
    
  }, 
  onLoad:function(){
    
  },
  onShow: function () {
    this.getlogs()
    } 
  })
