import nodemailer from "nodemailer";
 
 
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendMail = async (email, token, name) => {
  const verificationLink = `http://localhost:5173/shop?tokenEmail=${token}`;
 
  let info =  await transporter.sendMail(
    {
    from: "Corinne <corinnemapetite@gmail.com",
    to: email,
    subject: "Verificación de cuenta",
    text: `Hola ${name}, por favor verifica tu cuenta usando el siguiente enlace: ${verificationLink}`,
    html: `
      <p>Hola ${name},</p>
      <p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  });
};
 

