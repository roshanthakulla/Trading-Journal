

export const otpEmail = (name,otp) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OTP Verification</title>
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
    .otp-box {
      display: inline-block;
      margin: 20px auto;
      padding: 15px 25px;
      background-color: #1a73e8;
      color: white;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      border-radius: 6px;
    }
    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }
    img {
      max-width: 120px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- ✅ Logo / Image -->
   <img src="https://res.cloudinary.com/dai7bxu7b/image/upload/v1766574839/OTP.png"
     alt="Trade Journal Logo"/>



    <h1>Email Verification</h1>
    <p>Hello,${name}</p>
    <p>Use the following OTP to verify your email address for <strong style="color: blue">Trade Track</strong>:</p>
    
    <!-- ✅ OTP Box --> 
    <div class="otp-box">${otp}</div>

    <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>

    <p>If you did not request this, you can safely ignore this email.</p>
    
    <div class="footer">
      &copy; 2026 Trade Track. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
return html;
}