
import { useEffect, useState } from "react";

const apikey = "a8485b87566f35d89aa3e535d05fef02";

function Creprofile() {
  const [profile, setprofile] = useState([]);
  const [profilework, setprofilework] = useState([]);

  // Popular persons fetch
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/popular?api_key=${apikey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setprofile(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Person images fetch
  useEffect(() => {
    if (!profile[0]?.id) return;

    fetch(
      `https://api.themoviedb.org/3/person/${profile[0]?.id}/images?api_key=${apikey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setprofilework(data.profiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profile]);

  return (
    <div className="border-2 border-amber-600 h-[400px] w-[200px] pt-30">
      <img
        src={`https://image.tmdb.org/t/p/w500${profile[0]?.profile_path}`}
        alt={profile[0]?.name}
      />

      {profilework.map((movie, index) => (
        <div key={index}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.file_path}`}
            alt="profile"
          />
        </div>
      ))}
    </div>
  );
}

export default Creprofile;
