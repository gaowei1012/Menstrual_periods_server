const users = `
    create table if not exists users(
        id INT NOT NULL AUTO_INCREMENT,
        user_id VARCHAR(100) NOT NULL COMMENT '用户id',
        username VARCHAR(100) NOT NULL COMMENT '用户名',
        password VARCHAR(100) NOT NULL COMMENT '用户密码',
        create_at VARCHAR(100) NOT NULL COMMENT '用户创建时间',
        PRIMARY KEY(id)
    ) character set = utf8;
`

const article_pregnancy = `
    create tableif not exists article_pregnancy(
        id INT NOT NULL AUTO_INCREMENT,
        article_id VARCHAR(100) NOT NULL COMMENT '文章id',
        title VARCHAR(100) NOT NULL COMMENT '文章名称',
        content VARCHAR(255) NOT NULL COMMENT '文章内容',
        create_at VARCHAR(100) NOT NULL COMMENT '用户创建时间',
    ) character set = utf8;
`

module.exports = {
    users,
    article_pregnancy,
}
