import { useEffect,useState } from "react";
import { Link, useParams } from "react-router";
import CrewCard from "./crewcard";
const apikey = "a8485b87566f35d89aa3e535d05fef02"
function Crew(){
    const {id} = useParams()
    const [crewCard,setCerwCard] = useState([])
useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`)
.then((res)=>res.json()).then((data)=>{
    console.log(data)
    setCerwCard(data.crew)
}).catch((err)=>{
    console.log(err)
})
},[id])
if(crewCard.length===0){
    return<p>...loading</p>
}
return(
    <div className="flex gap-4 overflow-x-auto">
        {crewCard.map((movie)=>(
            <Link to={`/credits/${movie.id}`} key={movie.id}>
            <CrewCard 
             movie={movie}/>
            </Link>
            
        ))}
    </div>
)
}
 export default Crew