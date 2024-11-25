const nodemailer = require('nodemailer');

const emailTransport = async () => {
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'luis@ethereal.email',
      pass: 'askdfjasfk'
    }
  });
};

module.exports.enviaEmailNoCadastro = async (event) => {
  const body = JSON.parse(event.Records[0].body);
  const transport = await emailTransport();
  await transport.sendMail({
    from: 'luis@ethereal.email',
    to: body.to, 
    subject: body.subject, 
    text: body.text});
};