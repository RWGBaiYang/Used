// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  
  db.collection('admin_list').get({
    //如果查询成功的话
    success(res) {
      //将获得的数据集加入到原来的数据集中
      app.globalData.ne.push(res.data)
      //调试一下，是否加入
      //这里需要多多注意一下，数据加入后都是在下标1里面的
       console.log(app.globalData.ne)
    },
  })


  Page({
    /**
     * 页面的初始数据
     */
    data: {
      //这里可以直接用全局变量赋值
      ne: app.globalData.ne
    },
    //…………其他各个函数
  })

}