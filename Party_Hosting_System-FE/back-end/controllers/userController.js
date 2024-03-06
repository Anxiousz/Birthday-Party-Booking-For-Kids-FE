import User from "../models/User.js";

// create new User
export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (err) {
    const savedUser = await newUser.save();
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

// delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to deleted",
    });
  }
};

// update  User
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to updated",
    });
  }
};

// get Single User
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const User = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "Successfully found",
      data: User,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

// getAll User
export const getAllUser = async (req, res) => {
  // for pagination
  const page = parseInt(req.query.page);

  try {
    const Users = await User.find({});

    res.status(200).json({
      success: true,
      count: Users.length,
      message: "Successfully found",
      data: Users,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};
