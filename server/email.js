const nodemailer = require('nodemailer')
const {promisify} = require('util')

const mailTransport = nodemailer.createTransport({
  host: 'smtp.qq.com',
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  port: 465, // SMTP 端口
  auth: {
    user: '438522434@qq.com', // 账号
    pass: 'axtogktkugynbiie' // 密码
  }
})

const mailTransportSendMail = promisify(mailTransport.sendMail)

exports.generateIdentifyingCode = function (){
    const code = Array.from({length:6}).map(v => {
      return Math.floor(Math.random() * 10)
    })
    return code.join('')
}

exports.sendEmail = async function (email, identifyingCode) {
  // 设置邮件内容
  const mailOptions = {
    from: '438522434@qq.com',
    to: email, // 收件列表
    subject: '注册验证码', // 标题
    html: `验证码${identifyingCode}`
  }

  // 发送邮件
  const res = await mailTransport.sendMail(mailOptions)
  mailTransport.close()
 return res
}



