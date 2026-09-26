import { useEffect,useState } from "react";

const apikey = "a8485b87566f35d89aa3e535d05fef02"
function MovieTrailler({movieId}){
const[loaded,setLoaded]=useState(false)
    const [movieTrailler,setMovieTrailler] = useState([])
    useEffect(()=>{
        fetch(` https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apikey}`)
        .then((res)=>res.json()).then((data)=>{
            console.log(data)
            setMovieTrailler(data.results)
        }).catch((err)=>{
            console.log(err)
        })
    },[movieId])
    return(
        <div className="flex overflow-x-auto gap-4">
        {!loaded &&(
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-btn" viewBox="0 0 16 16">
  <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
</svg>
        )}
            {movieTrailler.map((movie)=>(
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
    
    )
}
export default MovieTrailler