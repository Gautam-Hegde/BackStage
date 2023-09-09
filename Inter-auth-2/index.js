const express=require('express');
const app=express();
const jwt = require('jsonwebtoken');
const fs = require('fs');

app.use(express.json());
let ADMINS = [];
let USERS = [];
let COURSES = [];


try {
    ADMINS = JSON.parse(fs.readFileSync('admins.json', 'utf8'));
    USERS = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    COURSES = JSON.parse(fs.readFileSync('courses.json', 'utf8'));
} catch {
    ADMINS = [];
    USERS = [];
    COURSES = [];
}

const secretKey='zoro';

const generateJwt=(user)=>{
    const payload = { username: user.username,}; //user.username = gautamhegde
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //auth header is like bearer(whitespace)token 
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        console.log("inside middleware1: "+req.user);//[object object]
        next();
      });
    } else {
      res.sendStatus(401);//forbidden
    }
  };

// admin routes signup login create update getall 
app.post('/admin/signup',(req,res)=>{
    const {username,password}=req.body;
    const admin=ADMINS.find((a)=>{
        return a.username===username;
    })
    if(admin){
        res.status(403).json({message:'Admin already exists'});
    }
    else{
        const newAdmin={username,password};
        ADMINS.push(newAdmin);
        fs.writeFileSync('admins.json',JSON.stringify(ADMINS));
        const token = generateJwt(newAdmin);
        res.json({message:'Admin created successfully',token});
    }

});


app.post('/admin/login',(req,res)=>{
    const { username, password } = req.headers;
    const admin = ADMINS.find(a => a.username === username && a.password === password);
    if (admin) {
      const token = generateJwt(admin);
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
});


app.post('/admin/courses',(req,res)=>{
    const course=req.body;
    course.id=COURSE.length+1;
    COURSES.push(course);
    fs.writeFileSync('courses.json',JSON.stringify(COURSES));
    res.json({message:'Course Created successfully',courseId:course.id});

});

app.put('/admin/courses/:courseId',(req,res)=>{

});

app.get('/admin/courses',(req,res)=>{

});

//user routes signup login getallcourse purchase getpurchased

app.post('/user/signup',(req,res)=>{

});


app.post('/user/login',(req,res)=>{

});

app.get('/user/courses/',(req,res)=>{

});

app.post('/user/courses/:courseId',(req,res)=>{

});
app.get('/user/purchasedCourses',(req,res)=>{

});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });