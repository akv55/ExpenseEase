const transporter = require("../config/email.js");
require("dotenv").config();

const APP_NAME = process.env.APP_NAME || "ExpenseEase";
const EMAIL_FROM = process.env.EMAIL_FROM || process.env.EMAIL_USER;

const SUBJECTS = {
  verify: `${APP_NAME} - Your verification code`,
  reset: `${APP_NAME} - Reset password code`,
  twofactor: `${APP_NAME} - Login security code`,
};

const templates = {
  verify: (otp) => `
    <div style="font-family: Arial, sans-serif; padding: 16px; color: #1f2937;">
      <h2 style="color:#0f766e;">${APP_NAME} Verification Code</h2>
      <p>Use the verification code below to complete your sign up. The code expires in 5 minutes.</p>
      <div style="font-size: 32px; letter-spacing: 8px; font-weight: 700; background:#f0fdfa; color:#0f766e; padding: 12px 16px; text-align:center; border-radius: 12px; margin: 16px 0;">
        ${otp}
      </div>
      <p>If you did not request this, please ignore this email.</p>
      <p style="margin-top:24px;">— The ${APP_NAME} Team</p>
    </div>
  `,
  reset: (otp) => `
    <div style="font-family: Arial, sans-serif; padding: 16px; color: #1f2937;">
      <h2 style="color:#0f766e;">Reset your ${APP_NAME} password</h2>
      <p>Enter the code below within 5 minutes to set a new password.</p>
      <div style="font-size: 32px; letter-spacing: 8px; font-weight: 700; background:#f0fdfa; color:#0f766e; padding: 12px 16px; text-align:center; border-radius: 12px; margin: 16px 0;">
        ${otp}
      </div>
      <p>If you didn’t request a password reset, you can safely ignore this email.</p>
      <p style="margin-top:24px;">— The ${APP_NAME} Team</p>
    </div>
  `,
  twofactor: (otp) => `
    <div style="font-family: Arial, sans-serif; padding: 16px; color: #1f2937;">
      <h2 style="color:#0f766e;">${APP_NAME} Login Verification</h2>
      <p>Enter this one-time code to finish signing in. It expires in 5 minutes.</p>
      <div style="font-size: 32px; letter-spacing: 8px; font-weight: 700; background:#ecfeff; color:#0f766e; padding: 12px 16px; text-align:center; border-radius: 12px; margin: 16px 0;">
        ${otp}
      </div>
      <p>If you did not try to log in, secure your account immediately.</p>
      <p style="margin-top:24px;">— The ${APP_NAME} Team</p>
    </div>
  `,
};

const sendOTP = async (email, otp, purpose = "verify") => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required to send verification code");
  }

  const sanitizedPurpose = templates[purpose] ? purpose : "verify";

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: SUBJECTS[sanitizedPurpose],
    html: templates[sanitizedPurpose](otp),
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
