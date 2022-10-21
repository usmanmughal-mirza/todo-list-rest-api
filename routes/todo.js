const router=require("express").Router();
const {getAllTodos,createTodo,updateTodo,
deleteTodo} =require("../controllers/todo");

router.get("/todos",getAllTodos);
router.post("/todo",createTodo);
router.put("/todo/:id",updateTodo);
router.delete("/todo/:id",deleteTodo);



module.exports=router;