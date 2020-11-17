// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()

  try {
    await db.collection('goods_list')
    .where({
      _id:event.id
    })
    .remove()
    .then(res =>{
      console.log('删除了多少条数据')
      console.log(res)
    })
  } catch (e) {
    console.log(e)
  }

}