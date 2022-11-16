// import emailSMTPVerificator from 'email-smtp-verificator';
// import validate from 'deep-email-validator';
// import validate from 'email-validator';
// import { verifyEmail } from '@devmehq/email-validator-js';
import { transporter } from '../../nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';


//attach the plugin to the nodemailer transporter
// transporter.use('compile', hbs(options));
// //send mail with options


export const config = {
  api: { externalResolver: true },
};

function subtractHours(date, minutes) {
  date.setMinutes(date.getMinutes() - minutes);
  return date;
}


export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.send(true);

    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('./templates'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./templates'),
      extName: '.handlebars',
    };

    transporter.use('compile', hbs(handlebarOptions));



      let date = new Date();
      let newDate = subtractHours(date, 20);
      console.log(newDate.toUTCString())


    var mailOptions = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      replyTo: req.body.replyTo,
      template: req.body.template,
      html:req.body.html,
      context: {
        text: req.body.html,
        datetime: newDate.toUTCString(),
        // datetime: "Monday, November 7, at 6:57 PM (PDT).",
        targetName:req.body.targetName
      },
    };




    return new Promise((resolve, reject) => {
      transporter
          .sendMail(mailOptions)
          .then((info) => {
            // console.log(req.body);
            console.log('Email sent: ' + info.response);
            resolve(info);
          })
          .catch((e) => {
            reject(e.response);
          });
    });
  }
}
