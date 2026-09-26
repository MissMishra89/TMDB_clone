import React,{Fragment,useEffect,useState} from "react";
import { Route,Routes,Link,NavLink } from "react-router";
import Homepage from "./pages/Homepage";
import Moviedetails from "./pages/moviedetails";
import Creprofile from "./pages/creprofile";
function Movieproject() {
  const [list,setlist] =useState([])
console.log(import.meta.env.VITE_APP_TMDB_TOKEN)

  useEffect(()=>{
    const getmovielist = async()=>{
      try{
        const res=await fetch("https://api.themoviedb.org/3/genre/movie/list",{
          method:"GET",
          headers:{
            accept:"application/json",
               Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`
          },
        },);
        const data= await res.json();
        console.log(data)
        if(!res.ok){
          throw new Error(
            `Http request failed with status code : ${res.status}`,
          );
        }
        setlist(data.genres)
      }catch(err){
        console.log(err)
      }
    }
    getmovielist()
  },[])

  return (
    <>
    <header className="h-16 w-full border-b px-5 flex justify-between gap-5 items-center bg-[#032541] text-white absolute z-10">
      <h1 className=" font-bold text-amber-500 text-shadow text-2xl">MovieVerse</h1>
      <select className="border px-2 py-1 rounded-xl">
             <option value="">Choose Genres</option>
             {list.map((lists)=>(
               <option key={lists.id} value={lists.id} className="text-amber-200">
                {lists.name}
              </option>
             ))}
      </select>
    </header>
    <Routes>
<Route path="/" element={<Homepage/>}>Homepage</Route>
<Route path="/moviedetails/:id/*" element={<Moviedetails/>}>Moviedetails</Route> 
<Route path="/credits/:id" element={<Creprofile/>}></Route>
    </Routes>
      
             </>
  )
}

export default Movieproject