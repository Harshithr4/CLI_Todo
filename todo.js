//add , list , delete , and done 

const fs = require("fs")
const path = require("path")
const db_file = path.join(__dirname,"tasks.json") 

//functions of loadtask and save task 

function loadTasks(){
     try{
          const data = fs.readFileSync(db_file,"utf8")
          return JSON.parse(data)
     }catch(err){
          return []
     }
}

function saveTasks(tasks){
     fs.writeFileSync(db_file,JSON.stringify(tasks,null,2))
}

//commands and inputs 
const commands = process.argv[2] 
const input = process.argv.slice(3).join(" ")
const tasks  = loadTasks()

if (commands === "add"){
     if (!input){
          console.log("Enter some input like node todo.js add Learning nodejs ")

     }else{
          tasks.push({task:input,done:false})
          saveTasks(tasks)
          console.log(`Added successfull : ${input}`)
     }
}

else if (commands === "list"){
     if (tasks.length === 0){
          console.log("List is empty !! consider adding Tasks")
          process.exit(1)
     }else{
          console.log("Tasks")
          tasks.forEach((t,index)=>{
               console.log(`${index+1}. ${t.task} ${t.done? "TASK COMPLETED":"PENDING TASK"}`)
          })
     }
}

else if (commands === "done"){
     const index = parseInt(input-1)
     if (!tasks[index]){
          console.log("Task Not Found")
     }else{
          tasks[index].done = true 
          saveTasks(tasks) 
          console.log(`${tasks[index].task} marked done`)
     }
}

else if (commands === "delete"){
     const index = parseInt(input)-1 
     if (!tasks[index]){
          console.log("Task Not Found")
     }else{
          const removed = tasks.splice(index,1)
          saveTasks(tasks)
          console.log(`${removed[0].task} REMOVED`)
     }
}