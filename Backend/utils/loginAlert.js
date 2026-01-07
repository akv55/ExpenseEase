const nodemailer = require("nodemailer");

const loginAlert = async ({ email, name, ip, device }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Security Alert" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 New Login Alert",
    html: `
      <h3>Hello ${name},</h3>
      <p>A new login was detected on your account.</p>
      <ul>
        <li><b>IP Address:</b> ${ip}</li>
        <li><b>Device:</b> ${device}</li>
        <li><b>Time:</b> ${new Date().toLocaleString()}</li>
      </ul>
      <p>If this wasn't you, please reset your password immediately.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = loginAlert;
