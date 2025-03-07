const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWTSECRETKEY;
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/userModel/userModel');
const client = new OAuth2Client(CLIENT_ID);




const googleAuth = async (req, res) => {
  console.log('hello');
  const  {token}  = req.body;
console.log(token);
  try {
    // Verify the token using Google API
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log(ticket);
    console.log(payload);
    const {  email, name, picture } = payload;
      const user = await User.findOne({ email })
      if(user){
        const tokenSecret = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwtToken', tokenSecret, {
      httpOnly: false, 
      maxAge: 3600000, 
    });
        return res.status(200).json({ message: 'User already exists' ,user:{
          userId: user._id,
          name: user.name,
          email: user.email,
          profilePicture: user.picture
        } });
      }
  const newUser =  User({
      email, name, picture
    })
   newUser.save()
   
    const tokenSecret = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwtToken', tokenSecret, {
      httpOnly: false, 
      maxAge: 3600000, 
    });
    res.json({ success: true , user:{
      userId: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.picture
    } });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

module.exports = {googleAuth}