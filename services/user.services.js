const UserModel = require('../models/user.model');
const CounterModel = require("../models/counter.model");
const jwt = require('jsonwebtoken');

class UserService {
    
    static async registerUser(email, password, name, type, status) {
        try {
          let counter = await CounterModel.findOne({ id: "empId" });
      
          let seqId;
          if (!counter) {
            const newCounter = new CounterModel({ id: "empId", seq: 1 });
            await newCounter.save();
            seqId = "EMP" + newCounter.seq.toString().padStart(4, "0");
          } else {
            counter.seq += 1;
            await counter.save();
            seqId = "EMP" + counter.seq.toString().padStart(4, "0");
          }
      
          const createUser = new UserModel({
            email: email,
            password: password,
            empID: seqId,
            name: name,
            type: type,
            status: status,
          });
          return await createUser.save();
        } catch (err) {
          throw err;
        }
      }
      

    static async checkuser(email) {
        try {
            return await UserModel.findOne({ email });
        } catch (error) {
            throw error
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }
}

module.exports = UserService;

