//app.js
const cloudsets = require('_self/application.js').CloudSetting;
const cloud = require('_self/cloud.js');
App({
  globalData:{
    openid:'',
    userInfo:null,
    ne:[],
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'xmyj-ctim5',
        traceUser: true,
      })
    }

    this.globalData = {}

    if (wx.getStorageSync('openid') != undefined){
      this.globalData.openid = wx.getStorageSync('openid')
    }
    console.log(this.globalData.openid)
    
    this.InitCloud();
    this.ModeServer();
  },
  InitCloud() {
    var that = this;
    wx.getStorage({
      key: 'userinfo',
      success: function (res) {
        that.globalData.userInfo = res.data
      },
    })
    if (cloudsets.UseCloud) {
      console.log('* 云开发 * √' + ' 服务器:' + cloudsets.CloudId)
      if (!wx.cloud) {
        console.log(' -- 不支持云开发 -- ')
      } else {
        wx.cloud.init({
          env: cloudsets.CloudId,
          traceUser: cloudsets.TraceUser
        })
        //缓存信息
        cloud.CallCloudFuncAndSetStorge('openapi', cloudsets.AdaptStorge, 'userinfo',{action:'getOpenData'}).then(function (res) {
          if (res != 'callfuncfail') {
            //console.log(res)
            that.globalData.openid = res //给全局变量 openid 赋值
          }
        })

      }
    } else {
      console.log('* 云开发 * X')

    }
  },
  ModeServer(){
    var that = this;
    //模式验证函数,检验是否是管理员 用户 / 黑名单用户
      wx.cloud.callFunction({
        name: 'getAdmin',
        data: {
        },
        success: function(res) {
          console.log(res) 
        },
        fail: console.error
      })

      console.log(that.globalData.ne)
  }
})
