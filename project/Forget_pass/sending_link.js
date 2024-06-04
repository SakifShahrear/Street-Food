import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hemalhemal787@gmail.com',
    pass: 'cidenssaryqoutbf'
  }
});

export const sendResetLinkEmail = (email, token) => {
  const resetLink = `http://localhost:3000/forget/reset-password?token=${token}`;

  const mailOptions = {
    from: 'hemalhemal787@gmail.com',
    to: email,
    subject: 'Password Reset Link',
    text: `Click the link to reset your password: ${resetLink}`
  };

  return transporter.sendMail(mailOptions);
};
