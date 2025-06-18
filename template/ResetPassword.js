const resetPasswordTemplate = (resetLink) => {
  return (`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Reset Your Password</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #bfcc94;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #8DAA63;
        padding: 20px;
        text-align: center;
        color: #ffffff;
        font-size: 24px;
      }
      .content {
        padding: 30px;
        text-align: left;
        color: #333333;
      }
      .button {
        display: inline-block;
        background-color: #4A7C59;
        color: #ffffff !important;
        padding: 12px 20px;
        margin: 20px 0;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      }
      .footer {
        font-size: 12px;
        color: #777777;
        text-align: center;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        Grass - Reset Your Password
      </div>
      <div class="content">
        <p>Hi there,</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>

        <a href="${resetLink}" class="button">
          Reset Password
        </a>

        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p>
          <a href="${resetLink}">${resetLink}</a>
        </p>

        <p>If you didn’t request a password reset, you can safely ignore this email.</p>
        <p>– The Grass Team</p>
      </div>
      <div class="footer">
        © 2025 Grass. All rights reserved.
      </div>
    </div>
  </body>
</html>`)
}

module.exports = { resetPasswordTemplate }
