const mongoose = require("mongoose");

const conn = async (req,res)=>{
  try {
    await mongoose.connect("mongodb+srv://user:saurav123@cluster0.hu60fo7.mongodb.net/").then(()=>{
    console.log("Connected");
    
  });
  } catch (error) {
    res.status(400).json({message: "Not Connected"});
  }
};
conn();
