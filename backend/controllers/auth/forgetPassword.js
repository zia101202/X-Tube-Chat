const User=require('../../models/userModel/userModel');
const nodemailer = require("nodemailer");
const Otp = require("../../models/otp/otp")
const forgetPassword=async (req,res)=>{

    const email = req.body.email;
   req.session.data = req.body.email;
   console.log(req.session.data);
   console.log('helo');

   req.session.save((err) => {
    if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Session error" });
    }
    console.log("Session saved successfully:", req.session.data);
});
         const user=  await  User.findOne({email})


         if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          

         const otpNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

         const transporter = nodemailer.createTransport({
            service: 'gmail',  
            auth: {
              user: 'ziaurrehman666666@gmail.com',  
              pass: 'qrts rtxh aapf owau',  
            },
          });
         const otp = new Otp({
            email: req.body.email,
            otp: otpNumber,

          })
          await otp.save();
    
           const mailOptions = {
            from: "ziaurrehman666666@gmail.com",
            to: email,
            subject: "Email Verification",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                <h2 style="color: #4CAF50; text-align: center;">Email Verification</h2>
                <p style="font-size: 16px; color: #333;">
                  Hello,
                </p>
                <p style="font-size: 16px; color: #333;">
                  Thank you for signing up! Use the OTP below to verify your email address. This OTP will expire in <strong>5 minutes</strong>.
                </p>
                <div style="text-align: center; margin: 20px 0;">
                  <span style="font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px dashed #4CAF50; border-radius: 4px; background-color: #e8f5e9;">
                    ${otpNumber}
                  </span>
                </div>
                <p style="font-size: 16px; color: #333;">
                  If you did not request this, please ignore this email.
                </p>
                <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
                  &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
                </footer>
              </div>
            `,
          };
          
          try {
            await transporter.sendMail(mailOptions);
    
            res.status(200).json({ message: 'Verification email sent successfully',  data:req.session });
          } catch (error) {
            console.error('Error sending verification email:', error);
            res.status(500).json({ message: 'Error sending verification email' });
          }


}
module.exports={forgetPassword}