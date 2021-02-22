import nodemailer from "nodemailer";
// import mailGun  from "nodemailer-mailgun-transport";
// const DOMAIN = "sandbox688be0974401453b81a99003848c7a2e.mailgun.org";

// const auth = {
//     auth:{
//         apiKey: "006d12460ef0824747d6aae827d71d37-d32d817f-9beff6d3", 
//         domain: DOMAIN,
//     },
// }

// const transporter = nodemailer.createTransport(mailGun(auth));
// const sendMail = (email,subject,text,cb) =>{
//     const mailOption = {
//         from: '	devkahar99@gmail.com',
//         to: email,
//         subject: subject,
//         text: text,
//     };

//     transporter.sendMail(mailOption,function (error,data){
//         if(error){
//             return cb(error,null);
//         }
//         return cb(null,data)
//     })
// }

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        },
        tls:{
            rejectUnauthorized: false,
        }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `<${account.user}>`, // sender address
      to: "devkahar99@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  

export default main

