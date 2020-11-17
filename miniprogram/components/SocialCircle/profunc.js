const db = wx.cloud.database();
const app = getApp();
const usecloud = require('../../_self/application.js').CloudSetting.UseCloud;
const escurl = require('../../_self/application.js').EscSetting.EscDomain
/**这是社交圈查询部分 */
function QueryCircleInfo(skipstep){
  if(usecloud){
    return new Promise(function(resolve,reject){
      db.collection('circles_list').skip(skipstep).orderBy('update_time', 'desc').get({
        success(res){
          resolve(res)
        },fail(res){
          reject('request fail')
        }
      })
    })
  }else{
    return new Promise(function(resolve,reject){
      wx.request({
        url: escurl+'/circle',
        method:'GET',
        data:{
          page:parseInt(skipstep/3)
        },
        success:res=>{
          //console.log(res.data)
          var tdata = res.data;
          tdata.forEach(element => {
            element.images = element.images.split(',')
          });
          console.log(tdata)
          resolve(tdata)
        },fail:res=>{
          reject('request fail')
        }
      })
    })
    
  }
  
}

module.exports = {

  QueryCircleInfo: QueryCircleInfo
}