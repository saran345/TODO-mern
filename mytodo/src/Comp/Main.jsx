import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Main() {
    const [data,setData]=useState([])
    const [del,setDel]=useState('')
    
     useEffect(()=>{ 
        const fetchData=async()=>{
            try{
                const response=await axios.get('http://127.0.0.1:8080/')
                setData(response.data)
                console.log('data fetched successfully')
            }catch(err){
                console.log('get method error',err)
            }
        }
      fetchData();
     },[])
       
      
        const addPost = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://127.0.0.1:8080/post', { name: del });
                setData((prevData) => [...prevData, response.data]);
                setDel('');
            } catch (error) {
                console.log('Error occurred in addPost:', error);
            }
        };

        

         const updates = async (id) => {
        const newName = prompt('Enter the name:');
        if (!newName) return; 

            const response = await axios.put(`http://127.0.0.1:8080/update/${id}`, {name: newName});
           
            setData(currentData => 
                currentData.map(item => 
                    item._id === id ? { ...item, name: newName } : item
                )
            ); 
        
    };
    
        
    
       const destroy=async(id)=>{
       await axios.delete(`http://127.0.0.1:8080/delete/${id}`)
       .then(setData(data.filter(data=> data._id!==id)))
       .catch((error)=> console.log(error))
    }
       
        
     
    return (     
    <>
     
     <form 
     className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-md"
     method='POST' onSubmit={addPost} >
         <input
         className="placeholder-italic placeholder-text-slate-300 
         block bg-white w-half mx-auto border border-slate-200 rounded-md
          py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 
          focus:ring-sky-500 focus:ring-1 sm:text-sm"
    
          
         type='text' name='name' value={del} placeholder='enter the task' 
         onChange={(e)=> setDel(e.target.value)} required />
        <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 
        focus:outline-none focus:bg-blue-600"
        type='submit' >ENTER</button>
     </form>
     <div>
        <ul  className="bg-gray-100 p-4 rounded-lg shadow-md">
        {data.map((d)=>(
            
    
             <li  className="flex items-center justify-between bg-white rounded-md p-2 mb-2 max-w-md"
           key={d._id}>{d.name}
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>updates(d._id)}>EDIT</button>
           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=> destroy(d._id)} >DELETE</button>
           </li> 
       
        ))}
        </ul>
     </div>
    </>
  )
}
