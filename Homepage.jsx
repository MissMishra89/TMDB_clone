import { useEffect, useState } from "react";
const apikey = "a8485b87566f35d89aa3e535d05fef02";
import { Link } from "react-router";
import MovieTrailler from "./videospage";

function Homepage() {
  const [popular, setpopular] = useState([]);
  const [movielist, setmovielist] = useState([]);
  const [trendinglist, settrendinglist] = useState([]);
  const [nowplaying, setnowplaying] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setpopular(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`)
      .then((res) => res.json())
      .then((data) => {
        setmovielist(data.results);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`)
      .then((res) => res.json())
      .then((data) => {
        settrendinglist(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setnowplaying(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="h-13 w-full shadow-md mb-5 flex items-center fixed">
        <input
          className="h-13 w-full pl-5 focus:border-transparent  bg-white focus:outline-none"
          placeholder="🔍 Search for movie ,tv,show,person...."
        />
      </div>
      <div className="h-80 w-full bg-[url('/d1n2ySWSanU34eEsluRjfrjRq52.jpg')] bg-cover bg-center pt-15 pl-10">
        <h1 className="font-sans text-5xl text-white font-bold">Welcome.</h1>
        <h3 className="font-sans text-3xl text-white font-bold">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
        <div className="flex justify-between items-center h-12 w-300 bg-white rounded-4xl pl-5 mt-5 ">
          <input
            placeholder="🔍 Search for movie ,tv,show,person...."
            className="h-7 w-100 focus:border-transparent focus:outline-none"
          />
          <button className="h-10 w-30 bg-blue-800 rounded-4xl m-1 text-white hover:h-11  hover:bg-blue-900">
            Search
          </button>
        </div>
      </div>
      <h1 className="text-2xl">Popular</h1>
      <div className="flex overflow-x-auto gap-6 hide-scrollbar whitespace-nowrap bg-[url('./1000_F_294195636_GjSIxkM0PmB3JRGDBysmymwgnZsMDoLJ.jpg')] max-h-80 ">
        {popular.map((movie) => (
          <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
            <div className="rounded-xl shadow-md border border-gray-200 p-6 bg-white hover:border-gray-700 max-h-80  max-w-50 ">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="max-h-50 max-w-50 rounded-xl hover:h-61"
              />
              <h1>{movie.title}</h1>
              <p>{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="text-2xl">New Release</h1>
      <div className="flex overflow-x-auto gap-6 hide-scrollbar whitespace-nowrap bg-[url('./1000_F_294195636_GjSIxkM0PmB3JRGDBysmymwgnZsMDoLJ.jpg')] max-h-80 ">
        {movielist.map((movie) => (
          <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
            <div className="rounded-xl shadow-md border border-gray-200 p-6 bg-white hover:border-gray-700 max-h-80  max-w-50 ">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="max-h-50 max-w-50 rounded-xl hover:h-61"
              />
              <div className="text-sm">
                <h1>{movie.title}</h1>
                <p>{movie.release_date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="text-2xl">Trending</h1>
      <div className=" w-full border-2 border-gray-200 flex overflow-x-auto gap-4 shadow-md mt-10 ">
        {trendinglist.map((movie) => (
          <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
            <div className="rounded-xl shadow-md border-2 border-gray-200 p-6 bg-white">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="max-h-60 min-w-40 rounded-2xl"
              />
              <h1>{movie.title}</h1>
              <p>{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="text-2xl">Now Playing</h1>
      <div className=" w-full border-2 border-gray-200 flex overflow-x-auto gap-4 shadow-md mt-10 ">
        {nowplaying.map((movie) => (
          <Link key={movie.id} to={`/moviedetails/${movie.id}`}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="max-h-60 min-w-40 rounded-2xl"
              />
              <h1>{movie.title}</h1>
              <p>{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
      <h1 className="text-2xl">Trailler</h1>
      {popular.length > 0 && <MovieTrailler movieId={popular[0].id} />}
    </>
  );
}

export default Homepage;
