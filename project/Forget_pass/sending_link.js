import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

export const sendResetLinkEmail = (email, token) => {
  const resetLink = `http://your-domain.com/reset-password?token=${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset Link',
    text: `Click the link to reset your password: ${resetLink}`
  };

  return transporter.sendMail(mailOptions);
};
