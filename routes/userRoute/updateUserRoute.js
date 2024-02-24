const express = require("express");
const router = express.Router();
const User = require("../../model/user");

// Update product from the database by Id....route
router.put("/updateUser/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userToUpdate = req.body;
    console.log(userToUpdate);
    console.log(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, userToUpdate, {
      new: true,
    });

    res.status(200).json(updatedUser);
    // console.log(updatedUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update user", message: err.message });
  }
});

// Export router
module.exports = router;
