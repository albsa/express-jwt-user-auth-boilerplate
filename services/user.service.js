const { User } = require('../db');

const createUser = async(data) => {
  try {
    return await User.create(data);
  } catch(e) {
    return e;
  }
}

const deleteUser = async(id) => {
  try {
    return await User.deleteOne(id);
  } catch (e) {
    return e;
  }
}

const findUserByEmail = async(email) => {
  return await User.findOne({email});
};

const findUserById = async(id) => {
  return await User.findById(id);
}



module.exports = {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById
}
