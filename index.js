const app=require('./app');
const db=require('./config/db');
const UserModel=require('./models/user.model');

const port=80

app.get ('/',(req,res)=>{
    res.send('Welcome to HManager.. \n Contact on teamhaash.com for enquiries.')
})

app.listen(port,()=>{
    console.log('Server Listening on Port: http://localhost:80')});