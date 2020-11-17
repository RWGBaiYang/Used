/**
 * @DESC 服务于全局的配置文件
 * @TIPS 如果UseCloud 和 UseEsc 同时允许, 优先使用 云开发服务器
 */
var CloudSetting = {
  UseCloud: true,           //是否使用云开发服务器
  CloudId:'xmyj-ctim5',     //云开发环境id
  TraceUser:true,           //记录用户访问日志
  AdaptStorge:true,         //允许缓存用户数据
}
var EscSetting = {
  UseEsc:false,           //是否使用自己的服务器
  EscDomain:'https://www.chinafish.club:8081/',//服务器的域名
  AdaptStorge: true,         //允许缓存用户数据
}
var LogConfig = {
  //日志打印控制器
  StorgeLog:true,         //缓存成功日志
}
var ModeConfig = {
  //模式配置文件
  AdminMode: true, //特权用户模式是否开启
  AdminList:[
    'oDBAx5alKdCvTcl3oQEbZBXPHbgY'
  ],
  BanMode: true,    //黑名单模式是否开启
}
var SafeConfig = {
  ContentSafe: true,   //敏感文字检验模式
  ContentSafeFunc:'',  //敏感文字对应检验函数
  ImageSafe: false,    //图片敏感检验模式
  ImageSafeFunc:'',    //图片敏感检验函数
}
var ScopeConfig = {
  UserInfo:true,        // 需要请求用户信息
  Location:false,       // 请求用户位置信息
}
module.exports = {
  CloudSetting: CloudSetting,
  EscSetting:EscSetting,
  ModeConfig: ModeConfig,
  SafeConfig: SafeConfig,
  LogConfig: LogConfig,
  ScopeConfig: ScopeConfig
}