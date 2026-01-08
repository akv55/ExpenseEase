const nodemailer = require("nodemailer");

const loginAlert = async ({ email, name, ip, device }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 5000,
    socketTimeout: 5000,
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

  try {
    await transporter.sendMail(mailOptions);
    console.log("Login alert email sent successfully to:", email);
  } catch (error) {
    console.error("Login alert email failed:", {
      email,
      message: error.message,
      code: error.code,
      response: error.response,
    });
    throw error;
  }
};

module.exports = loginAlert;module.exports = loginAlert;
