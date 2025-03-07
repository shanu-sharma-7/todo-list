
import { useEffect, useState } from 'react'


function App() {

  const[task , settask] = useState('');
  const[date , setdate] = useState('');  
  const [ authenticated , setauthenticated] = useState(false);
  const [ username , setusername] = useState('');
  const [password , setpassword] = useState('');
  const [priority , setpriority] = useState('medium');

  
  const[tasks , settasks] = useState(()=>{

const saved = localStorage.getItem('tasks')
  return saved ? JSON.parse(saved) : [];
  });

  useEffect(()=>{

    localStorage.setItem('tasks' , JSON.stringify(tasks));
  }, [tasks])


  const completetask =( index) =>{

    settasks(tasks.map((t ,i) => i===index ? {...t , complete : !t.complete} : t))
  }

const addtask = () =>{
  if(task && date){
    const newtask = {task , date , priority};
    settasks([...tasks , newtask]);
    settask('');
    setdate('');
    setpriority('medium');
  }
  else{
    alert('please fill box')
  }
}


const deletetask =(index) =>{
settasks(tasks.filter((_,i) => i !== index))

}


const edittask = (index) =>{

  const updatetask = prompt('enter your task' , tasks[index].task);
  const updatedate = prompt('enter your date' , tasks[index].date);
  const updatepriority = prompt('enter your priority' , tasks[index].priority)

  if (updatedate && updatetask && updatepriority){
    const updatedtasks = [...tasks];
    updatedtasks[index] = {...updatedtasks[index] , task : updatetask , date :updatedate , priority :updatepriority};
    settasks(updatedtasks);
  }
}

const login = () =>{
  if(username && password){
    setauthenticated(true);
    
  } else{
    alert('Enter details')
  }
}

const logout = () =>{
  setauthenticated(false);
  setusername('');
  setpassword('');
}


  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 flex item-center justify-center p-8'>
    
    <div className=' border-2 mt-5 rounded-xl bg-gray-200 sm:w-2/6 w-80 text-center' >
    <div className=' flex sm:justify-between gap-5 text-3xl italic font-bold underline  mt-5 pl-10 pr-2'>
      TODO-LIST
      {authenticated && (
      <button className='border-2 bg-black pl-5 pr-5 text-xs text-white rounded-full' onClick={logout}>Logout</button>
      )}
      </div>
    

   {!authenticated ? (
    <div>
      <div className='flex flex-col gap-5 mt-10 '>

      <input className='w-4/6 ml-10 border-2 border-black rounded-xl pb-1 pt-1 pl-4' placeholder='Enter username' type='text' value={username} onChange={(e) => setusername(e.target.value)}></input>
      <input className='w-4/6 ml-10 border-2 border-black rounded-xl pb-1 pt-1 pl-4' placeholder='Enter password' type='password' value={password} onChange={(e) => setpassword(e.target.value)}></input>
      </div>
    <button className='mt-5 text-2xl border-2 bg-black text-white pl-10 pr-10 rounded-full mr-10 ' onClick = {login} >
      login
    </button>
    </div>
   ) : (
    
   

     
      <div>
        
     <p className='text-2xl mt-5'>Welcome, {username}!</p>
     
    <div className='mt-7'>

      <input onChange={(e) => settask(e.target.value)} className='border-2 rounded-full p-2 w-4/5 mb-5' type="text" placeholder='Enter your task' value={task} />
      <input onChange={(e) => setdate(e.target.value)} className=' border-2 rounded-full p-2 w-4/5 mb-5 ' type="date" value={date} />
      <select value={priority} className=' border-2 rounded-full p-2 w-4/5 mb-10'
      onChange={(e) => setpriority(e.target.value)}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

    </div>
    <button onClick={addtask} className='bg-black text-white w-40 p-1 rounded-lg text-xl'>ADD</button>
    <div className='mt-5 flex text-center'>
      <ul >
        {tasks.sort((a , b)=>{
          const priorityorder = {high :3 , medium :2 , low :1};
          return priorityorder[b.priority]-priorityorder[a.priority];
        })
        
        .map((t , index)=>(
<li key={index}>
<div  className={` mb-5 border-2 border-gray-500 w-full sm:ml-10 ml-5 text-start pl-5 rounded-xl font-bold ${t.complete ? 'bg-green-400'  : '' } `}>
  <p>{t.task}</p>
  <div className='flex gap-7 mt-1'>
  <p>{t.date}</p>
  
 <p>Priority : <span className={t.priority==='high' ? 'text-red-950' : t.priority==='medium' ? 'text-red-500' : 'text-red-300' }>{t.priority}</span> </p>
  </div>
  <div className='flex gap-5 text-red-500'>
  <button onClick={() => edittask(index)} >Edit</button>
  <button onClick={() => deletetask(index)} >Delete</button>
  <button onClick={() => completetask(index)} > Complete</button>
  </div>
  </div>
</li>

        ))}
      </ul>
    </div>
    </div>
)}

    </div>
    
    </div>
)
}

export default App
