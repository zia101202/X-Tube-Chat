const logout = async (req, res) => {
    res.clearCookie("jwtToken", {
      httpOnly: false,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  };
  
  module.exports = { logout };
  