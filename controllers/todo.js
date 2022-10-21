const Todo=require("../model/todomodel");



// GET ALL / COMPLETED / UNCOMPLETED TODOS --------------------------

const getAllTodos =async(req,res) =>{
const {todostate}=req.query;
let todos=[];

try {
 
    if(todostate=== "completed"){
       todos=await Todo.aggregate([
            {$match:{completed:true}}
        ])
}
   else if(todostate==="uncompleted"){
     todos=await Todo.aggregate([
            {$match:{completed:false}}
        ])
   }
     else {
    todos=await Todo.find();
     }
    return res.status(200).json(todos);
} catch (error) {
    return res.status(500).json({message:error.message})
}
}

// CREATE TODO --------------------------------------
const createTodo =async(req,res) =>{
const data=req.body;

const todo=new Todo(data);

try {
    await todo.save();
    return res.status(201).json(todo);    
} catch (error) {
    return res.status(500).json({message:error.message})
}
}

// UPDATE TODO TEXT -------------------------------
const updateTodo =async(req,res) =>{
const data=req.body;
const {id}=req.params;

try {
    const updatedTodo=await Todo.findByIdAndUpdate(id,data,{
        new:true
    })
    return res.status(200).json(updatedTodo);
} catch (error) {
  return res.status(500).json({message:error.message})   
}
}

// DELETE TODO ---------------------------------
const deleteTodo =async(req,res) =>{
const {id}=req.params;

try {
    await Todo.findByIdAndDelete(id);
    return res.status(200).send("todo deleted")
} catch (error) {
     return res.status(500).json({message:error.message}) 
}
}



module.exports={
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo
}


