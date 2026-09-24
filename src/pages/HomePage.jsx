import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { getMoviePosterUrl } from "../../services/fetchPoster";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8080/api/v1/movies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const moviesWithPosters = await Promise.all(
          response.data.map(async (movie) => {
            const posterUrl = await getMoviePosterUrl(movie.title);

            return {
              ...movie,
              posterUrl,
            };
          })
        );

        setMovies(moviesWithPosters);
        console.log(moviesWithPosters);

      } catch (error) {
        console.log(error);
        toast.error(
          error.response?.data?.message || "Could not load movies"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMyBookings = () =>{
    navigate("/myBookings");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased">

      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-10">
        <div>
          <div className="text-lg font-bold tracking-[-0.01em]">
            TicketNest
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              Hi, <span className="text-white">{username || "there"}</span>
            </span>
          </div>
        </div>


        <div className="flex justify-between">
          <button onClick={handleMyBookings} className="mr-5 bg-orange-600 rounded-md border border-white/25 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white hover:text-black">
            My Bookings
          </button>
          <button
            onClick={handleLogout}
            className="rounded-md border border-white/25 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
          >
            Log out
          </button>

        </div>


      </header>

      <main className="px-6 py-10 sm:px-10">
        <h1 className="mb-1 text-2xl font-semibold tracking-[-0.01em]">
          Now showing
        </h1>
        <p className="mb-8 text-[14.5px] text-white/50">
          Pick a show and grab your seat.
        </p>

        {loading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] w-full rounded-lg bg-white/10" />
                <div className="mt-2.5 h-4 w-3/4 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/15 py-24 text-center">
            <p className="text-white/60">No movies available right now.</p>
            <p className="mt-1 text-sm text-white/35">
              Check back soon — new shows are added regularly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <button
                key={movie.id}
                onClick={() => navigate(`/movies/${movie.id}`)}
                className="group text-left"
              >
                <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-[#241C47] ring-1 ring-white/10 transition-shadow group-hover:ring-[#D9541F]/60">
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title || movie.name}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-white/30">
                      No poster
                    </div>
                  )}
                </div>
                <h3 className="mt-2.5 truncate text-[14.5px] font-medium text-white/90">
                  {movie.title || movie.name}
                </h3>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;