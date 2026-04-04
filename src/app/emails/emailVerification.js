

export const emailVerification = (name,link) => {
 const html =`
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      text-align: center; /* ✅ Center everything */
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
   
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }
    img {
      max-width: 150px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- ✅ Logo / Image -->
    <img src="https://res.cloudinary.com/dai7bxu7b/image/upload/v1775235924/email_qxzzga.svg" alt="Trade Journal Logo" />

    <h1>Verify Your Email</h1>
    <p style="color:black;font-weight: bold">Hello,${name}</p>
    <p>Thank you for signing up to <strong style="color:blue">Trade Track</strong>. Please verify your email address to activate your account.</p>
    
    <!-- ✅ Verification Button -->
    <a href="${link}" 
   class="button" 
   style="display:inline-block;margin:20px auto;padding:12px 20px;
          background-color:#1a73e8;color:#ffffff !important;
          text-decoration:none;border-radius:50px;font-weight:bold;">
  Verify Email
</a>


    <!-- ✅ Fallback Link -->
    <table border="0" cellpadding="10" cellspacing="0" width="100%" role="presentation"
           style="mso-table-lspace:0pt; mso-table-rspace:0pt; word-break:break-word;">
      <tr>
        <td>
          <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
          <a href="${link}">${link}</a>
        </td>
      </tr>
    </table>

    <p>If you did not create this account, you can safely ignore this email.</p>
    
    <div class="footer">
      &copy; 2026 Trade Track. All rights reserved.
    </div>
  </div>
</body>
</html>  `

return html;
};
