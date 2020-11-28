const interfaces = require('os').networkInterfaces()

/// 获取本机 IP
let IPAdress = '';
for(var devName in interfaces){  
  var iface = interfaces[devName];  
  for(var i=0;i<iface.length;i++){  
        var alias = iface[i];  
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
              IPAdress = alias.address;  
        }  
  }  
}

// config 
const config = {
    port: 9090,
    host: IPAdress,
    database: {
        DATABASE: 'fallLove',
        USERNAME: 'root',
        PASSWORD: 'gao129231wei',
        PORT: '3306',
        HOST: '127.0.0.1'
    },
    token: {
        tokenExpiresTime: 1000 * 60 * 60 * 24 * 7,
        jwtSecret: 'jwtSecret',
    },
    oss: { // 阿里云oss对象存储
        region: 'oss-cn-hangzhou',  // 阿里云对象存储域名
        accessKeyId: '*********', // api 接口id
        accessKeySecret: '*******', // api 接口密码
        bucket: 'registiation', // bucket 名称
        url: 'https://registiation.oss-cn-hangzhou.aliyuncs.com/images/'
    },
    wx: {
        appId: '*******',
        appSecret: '************'
    },
    // 配置七牛云
    accessKey: '',
    secretKey: '',
}

module.exports = config