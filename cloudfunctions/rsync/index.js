// 云函数入口文件
const cloud = require('wx-server-sdk')
var request = require('request')
cloud.init({
  env:'kindear-fd77cd'
})

// 云函数入口函数
exports.main = async (event, context) => {
  return new Promise((resolve, reject) => {
    request({
      url: event.url,
      method: "GET",
      json: true,
      headers: {
        "content-type": "application/json",
      },
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        try {
          resolve(body)
        } catch (e) {
          reject()
        }
      }
    })
  })
}