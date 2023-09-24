const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Otp = require("../models/Otp");


router.post('/activate', async (req, res) => {
    const { email, code } = req.body;

    try {
        const otpRecord = await Otp.findOne({
            where: {
                userId: email,
                code,
            },
        });

        if (otpRecord) {
            // OTP code matched, update user status to "Active"
            await User.update({ status: 'Active' }, { where: { email } });

            // Delete the OTP record to prevent reuse
            await Otp.destroy({ where: { userId: email } });

            return res.json({ success: true, message: 'User activated successfully' });
        } else {
            return res.json({ success: false, message: 'Invalid activation code' });
        }
    } catch (error) {
        console.error('Error activating user:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;