const interfaces = require('os').networkInterfaces()

/// 获取本机 IP
let IPAdress = ''
for (var devName in interfaces) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
        var alias = iface[i]
        if (
            alias.family === 'IPv4' &&
            alias.address !== '127.0.0.1' &&
            !alias.internal
        ) {
            IPAdress = alias.address
        }
    }
}

// config
const config = {
    port: 9090,
    host: IPAdress,
    database: {
        DATABASE: 'menstrual',
        USERNAME: 'gaowei',
        PASSWORD: '*Gao129231wei*',
        PORT: '3306',
        HOST: 'rm-bp1s504lsy6224fa94m.mysql.rds.aliyuncs.com',
    },
    redisbase: {
        DB: 'menstrual',
        PORT: 6379,
        HOST: '39.99.241.232'
    },
    oss: {
        // 阿里云oss对象存储
        region: 'oss-cn-hangzhou', // 阿里云对象存储域名
        accessKeyId: '*********', // api 接口id
        accessKeySecret: '*******', // api 接口密码
        bucket: 'registiation', // bucket 名称
        url: 'https://registiation.oss-cn-hangzhou.aliyuncs.com/images/',
    },
    wx: {
        appId: '*******',
        appSecret: '************',
    },
    // 配置七牛云
    accessKey: '',
    secretKey: '',
}

module.exports = config
