const transporter = require("../config/email");

const loginAlert = async ({ email, name, ip, device }) => {
  if (!transporter) {
    console.warn("⚠️ Login alert skipped: email transport not configured.");
    return;
  }
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
module.exports = loginAlert;
