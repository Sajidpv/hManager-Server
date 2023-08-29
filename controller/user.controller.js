const UserModel = require("../models/user.model");

const UserService = require("../services/user.services");

exports.register = async (req, res, next) => {
    try {
     
               const { email, password, name, type, status } = req.body;
               const item = await UserService.checkuser(email);

               if(item){
                res.json({ status: false, message: "User already exist " });
               }else{
                const successRes = await UserService.registerUser(email, password, name, type, status);
       
               res.json({ status: true, message: "User Registered Succefully" });
               }

    } catch (error) {
        if (error.code === 11000) {
            res.json({ message: 'User already exist', status: false });
        } else {
            console.log(error);
            res.json(error);
        }
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserService.checkuser(email);

        if (user) {
            const isMatched = await user.comparePassword(password);

            if (isMatched === false) {
                throw new Error('Invalid Credentials');
            }

            let tokenData = { _id: user._id, email: user.email, type: user.type, status: user.status };

            const token = await UserService.generateToken(tokenData, 'secretKey', '1h');

            res.status(200).json({ status: true, token: token, message: "Logged in Succefully" });

        } else {
            throw new Error('User doesnot exist')
        }



    } catch (error) {
        console.log(error);
        res.json(error);

    }
}


exports.getEmployee = async (req, res) => {
    try {
        // app.get("/api/get_employee/:id", async (req, res) => {    - to get data by id

        let data = await UserModel.find();
        // let data = await Employee.findById(req.params.id);    - to get data by id
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getEmployeeById = async (req, res) => {
    try {
        let data = await UserModel.findById(req.params.id);
      
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message)
    }
}



exports.updateStatus = async (req, res) => {
    
    let id =req.params.id;
    let options = { new: true };
    const item = await UserModel.findById(id);
if(item){
    
  try {
        const data = await UserModel.findByIdAndUpdate(id,{ status:req.body.status}, options);
        res.json({ status: true,message: 'Update status'});
    } catch (error) {
        res.send(error.message);

    }

}else{
    res.json({ status: false,message: " No employee found" });
}
  
}

exports.deleteUser = async (req, res) => {
    try {
        let data;
        data = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted Succesfully');
    } catch (error) {
        res.status(500).json(error.message);
    }

}








