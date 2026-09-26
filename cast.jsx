import{ useEffect, useState } from "react";
import { useParams } from "react-router";
import CastCard from "./castcard";
const apikey = "a8485b87566f35d89aa3e535d05fef02"
function Cast() {
  const {id} = useParams()
  const [moviecast,setmoviecast] = useState([])
  useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`)
  .then((res)=>res.json()).then((data)=>{
    console.log(data)
    setmoviecast(data.cast)
  }).catch((err)=>{
    console.log(err)
  })
  },[id])
  if(moviecast.length===0){
    return<p>Loading....</p>
  }
  return(
    <>
    <div className="flex gap-2 overflow-x-auto mt-10">
        {moviecast.map((movie)=>(
           
          // <div key={movie.id}>

          //   <div>
          //   <img src={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`} className="max-h-50 max-w-50 rounded-xl hover:h-61" />
          // <h1>{movie.name}</h1>
          //   </div>
          //       </div>
          <CastCard key={movie.id} movie={movie}/>
        ))}
    </div>

    </>
  )
}
export default Cast