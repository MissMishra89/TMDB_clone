
import{ useEffect, useState } from "react";
import { useParams } from "react-router";
import Cast from "./cast";
import Crew from "./crew";
const apikey = "a8485b87566f35d89aa3e535d05fef02"
function Moviedetails(movie) {
  const {id} = useParams()
 
     const [movieDetailList, setMovieDetaillist] = useState(null)
const [video,setvideolist]=useState([])
const [loaded,setLoaded]=useState(false)
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`)
.then((res) => res.json()).then((data)=>{
  
    console.log(data)
            setMovieDetaillist(data)
      
          })
          .catch((err) => {
            console.log(err)
          })
      }, [id])
useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`)
    .then((res)=>res.json()).then((data)=>{
      console.log(data)
      
      setvideolist(data.results)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[id])
       
       if (!movieDetailList) {
    return <p>Loading...</p>;
  }

  return (
    <>
   
    <div>

    <div className="pt-4  pb-10 bg-cover h-auto inset-0  z-10 bg-black/90"  style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movieDetailList.backdrop_path})`
    }}>
      <img src={"https://image.tmdb.org/t/p/w500/"+movieDetailList.poster_path} className="h-100 w-80 rounded-2xl ml-10 z-20 relative border-4 border-amber-50 mt-20"/>
      <p className="mt-2 ml-10 text-white font-bold text-2xl ">{movieDetailList.original_title}</p>
 <p className="ml-10 text-white font-bold text-sm ">{movieDetailList.overview}</p>
  <p className="ml-10 text-white font-bold text-sm ">{movieDetailList.release_date}</p>
      </div>
       <Cast/>
 <Crew/>
      <div className="flex overflow-x-auto gap-4">
        {!loaded &&(
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
</svg>
        )}
            {video.map((movie)=>(
            <div key={movie.id}>
          {movie.site === "YouTube" && (
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${movie.key}`}
              title={movie.name}
              allowFullScreen 
              onLoad={()=>setLoaded(true)}
              onError={()=>setLoaded(false)}
              className="h-70 w-80 rounded-2xl"
            />
          )}
        </div>
            ))}
          </div>
    

 </div>

    
    
    
    </>
  );
  
}

export default Moviedetails