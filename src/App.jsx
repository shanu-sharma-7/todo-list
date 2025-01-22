
import { useEffect, useState } from 'react'


function App() {

  const[task , settask] = useState('');
  const[date , setdate] = useState('');
  const [login , setlogin] = useState('false');
  const [ password , setpassword] = useState('');
  const [ username , setusername] = useState('');
  

  
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
    const newtask = {task , date};
    settasks([...tasks , newtask]);
    settask('');
    setdate('');
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

  if (updatedate && updatetask){
    const updatedtasks = [...tasks];
    updatedtasks[index] = {...updatedtasks[index] , task : updatetask , date :updatedate};
    settasks(updatedtasks);
  }
}

const loginfn = () =>{
if(username=='user' && password === 'welcome'){
  setlogin(true);
  setusername('');
  setpassword('');
  
}

}

const logoutfn = () =>{
  setlogin(false);
}



  return (
    <div className='min-h-screen bg-gradient-to-r from-pink-400 to-purple-500 flex item-center justify-center p-8'>
    
    <div className=' border-2 mt-5 rounded-xl bg-gray-200 sm:w-2/6 w-80 text-center' >
    <div className=' flex sm:justify-between gap-5 text-3xl italic font-bold underline  mt-5 pl-10 pr-2'>
      TODO-LIST
      { login && (

<button className='text-lg bg-gray-500 text-white  rounded-xl w-20  ' onClick={logoutfn}>Logout</button>
    )}

     
    </div>

   
    
    { !login ? (

   <div className='flex flex-col gap-5 mt-10  items-center'>
<input className='border-2 border-gray-400 w-3/4 p-2 rounded-xl' type="text" placeholder='username' value={username} onChange={(e) => setusername(e.target.value)}/>
<input className='border-2 border-gray-400 w-3/4 p-2 rounded-xl' type="password" placeholder='password' value={password} onChange={(e) => setpassword(e.target.value)} />
<button className='bg-black text-white w-40 p-1 text-xl rounded-xl' onClick={loginfn}>login</button>


   </div>
    ) :( 
      <div>
        
     
   

      

    <div className='mt-7'>

      <input onChange={(e) => settask(e.target.value)} className='border-2 rounded-full p-2 w-4/5 mb-5' type="text" placeholder='Enter your task' value={task} />
      <input onChange={(e) => setdate(e.target.value)} className=' border-2 rounded-full p-2 w-4/5 mb-10 ' type="date" value={date} />

    </div>
    <button onClick={addtask} className='bg-black text-white w-40 p-1 rounded-lg text-xl'>ADD</button>
    <div className='mt-5 flex text-center'>
      <ul >
        {tasks.map((t , index)=>(
<li key={index}>
<div  className={` mb-5 border-2 border-gray-500 w-full sm:ml-10 ml-5 text-start pl-10 rounded-xl font-bold ${t.complete ? 'bg-green-400'  : '' } `}>
  <p>{t.task}</p>
  <div className='flex gap-60 mt-1'>
  <p>{t.date}</p>
 
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
