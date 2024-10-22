
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendPasswordResetMail = async (email, token, name) => {
  const resetLink = `http://localhost:5173/resetPassword?tokenResPassword=${token}`;

  let info = await transporter.sendMail({
    from: "Corinne <corinnemapetite@gmail.com>",
    to: email,
    subject: "Restablecimiento de contraseña",
    text: `Hola ${name}, para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
    html: `
      <p>Hola ${name},</p>
      <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};