const nodemailer = require("nodemailer");

const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

if (!hasCredentials) {
    console.warn("Email credentials missing. Outbound emails are disabled.");
}

const transporter = hasCredentials
    ? nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT || 587),
            secure: false, // ALWAYS false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
    : null;

if (transporter) {
    transporter
        .verify()
        .then(() => console.log("Email transport ready"))
        .catch((err) =>
            console.error("Email transport verification failed:", err.message)
        );
}

module.exports = transporter;