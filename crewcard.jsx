import { useState,useEffect } from "react";
function CrewCard({movie}){
const [loaded,setLoaded]=useState(false)
return(
    <>
    <div className="w-60 h-60">

    <div className="relative w-32 h-40">
{!loaded &&(
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg>
)}
<img src={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`}
alt={movie.name}
onLoad={()=>setLoaded(true)}
onError={()=>setLoaded(false)}
className={`w-full h-full object-cover rounded-xl ${
    loaded ? "block" : "hidden"
}`}/>
           <h1 className="text-sm mt-2 text-center">{movie.name}</h1>
    </div>
</div>
    </>
)
}
export default CrewCard