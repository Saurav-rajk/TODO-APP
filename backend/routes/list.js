const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
//Create
router.post("/addTask",async (req,res)=>{
   try {
     const {title,body,id} = req.body;
    const existingUser = await User.findById(id);
    if(existingUser){
        const list = new List({title, body, user: existingUser});
        await list.save().then(()=>res.status(200).json({list}));
        existingUser.list.push(list);
        existingUser.save();
    }
   } catch (error) {
    console.log(error);
    
   }
})

//Updates
router.put('/updateTask/:id', async (req, res) => {
  const taskId = req.params.id;
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }

  try {
    const updatedTask = await List.findByIdAndUpdate(
      taskId,
      { title, body },
      { new: true } // returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// delete

// DELETE a task by ID
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await List.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while deleting task" });
  }
});


router.get("/getTasks/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("list");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ list: user.list });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;