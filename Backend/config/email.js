const nodemailer = require("nodemailer");

const hasCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;

if (!hasCredentials) {
    console.warn(" Email credentials missing. Outbound emails are disabled.");
}

const transporter = hasCredentials
    ? nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT || 465),
            secure: process.env.SMTP_SECURE !== "false",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            pool: true,
            connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 15000),
            socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 20000),
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
