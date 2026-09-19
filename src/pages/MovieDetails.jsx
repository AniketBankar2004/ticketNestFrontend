import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getMoviePosterUrl } from "../../services/fetchPoster";
import toast from "react-hot-toast";

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [moviePosterUrl, setMoviePosterUrl] = useState(null);
    const [shows, setShows] = useState([]);
    const [showsLoading, setShowsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const authHeader = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const getMovieById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/movies/${id}`,
                    authHeader
                );

                const movieData = response.data;

                setMovie(movieData);

                const posterUrl = await getMoviePosterUrl(movieData.title);
                setMoviePosterUrl(posterUrl);

            } catch (error) {
                console.log(error);
                toast.error(
                    error.response?.data?.message || "Could not load movie"
                );
            } finally {
                setLoading(false);
            }
        };

        const getShowsByMovie = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/shows/movie/${id}`,
                    authHeader
                );

                setShows(response.data);

            } catch (error) {
                console.log(error);
                toast.error(
                    error.response?.data?.message || "Could not load shows"
                );
            } finally {
                setShowsLoading(false);
            }
        };

        getMovieById();
        getShowsByMovie();

    }, [id]);

    // Group shows by date so they can be rendered under date headings.
    const showsByDate = shows.reduce((acc, show) => {
        const date = show.showDate || show.date || "Showtimes";
        if (!acc[date]) acc[date] = [];
        acc[date].push(show);
        return acc;
    }, {});



    const sortedDates = Object.keys(showsByDate).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    const formatDate = (dateStr) => {
        const parsed = new Date(dateStr);
        if (isNaN(parsed)) return dateStr;
        return parsed.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (show) => {
        const raw = show.startTime || show.showTime || show.time;
        if (!raw) return "";
        // Handle plain "HH:mm:ss" / "HH:mm" strings as well as full datetimes.
        const parsed = raw.includes("T") || raw.includes(" ")
            ? new Date(raw)
            : new Date(`1970-01-01T${raw}`);
        if (isNaN(parsed)) return raw;
        return parsed.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
        });
    };

    const handleSelectShow = (show) => {
        navigate(`/movies/${id}/book/${show.id || show._id}`);
    };

    return (
        <div className="min-h-screen bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased">
            {/* Header */}
            <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-10">
                <span className="text-lg font-bold tracking-[-0.01em]">
                    TicketNest
                </span>
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-md border border-white/25 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                    Back to movies
                </button>
            </header>

            <main className="px-6 py-10 sm:px-10">
                {loading ? (
                    <div className="flex animate-pulse flex-col gap-8 sm:flex-row">
                        <div className="aspect-[2/3] w-full max-w-[280px] shrink-0 rounded-lg bg-white/10" />
                        <div className="w-full max-w-xl space-y-3 pt-1">
                            <div className="h-7 w-2/3 rounded bg-white/10" />
                            <div className="h-4 w-1/3 rounded bg-white/10" />
                            <div className="mt-4 h-3.5 w-full rounded bg-white/10" />
                            <div className="h-3.5 w-full rounded bg-white/10" />
                            <div className="h-3.5 w-3/4 rounded bg-white/10" />
                        </div>
                    </div>
                ) : !movie ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/15 py-24 text-center">
                        <p className="text-white/60">We couldn't find this movie.</p>
                        <p className="mt-1 text-sm text-white/35">
                            It may have been removed, or the link is incorrect.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
                            {/* Poster */}
                            <div className="aspect-[2/3] w-full max-w-[280px] shrink-0 overflow-hidden rounded-lg bg-[#241C47] ring-1 ring-white/10">
                                {moviePosterUrl ? (
                                    <img
                                        src={moviePosterUrl}
                                        alt={movie.title}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-sm text-white/30">
                                        No poster
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="max-w-xl pt-1">
                                <h1 className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                                    {movie.title}
                                </h1>

                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                    {movie.genre && (
                                        <span className="rounded-full bg-[#241C47] px-3 py-1 text-[13px] text-white/70 ring-1 ring-white/10">
                                            {movie.genre}
                                        </span>
                                    )}
                                    {movie.language && (
                                        <span className="rounded-full bg-[#241C47] px-3 py-1 text-[13px] text-white/70 ring-1 ring-white/10">
                                            {movie.language}
                                        </span>
                                    )}
                                    {movie.duration && (
                                        <span className="rounded-full bg-[#241C47] px-3 py-1 text-[13px] text-white/70 ring-1 ring-white/10">
                                            {movie.duration} min
                                        </span>
                                    )}
                                </div>

                                {movie.releaseDate && (
                                    <p className="mt-4 text-[14.5px] text-white/50">
                                        Releases {movie.releaseDate}
                                    </p>
                                )}

                                {movie.description && (
                                    <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-white/70">
                                        {movie.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Shows */}
                        <div className="mt-12 border-t border-white/10 pt-10">
                            <h2 className="text-lg font-semibold tracking-[-0.01em]">
                                Showtimes
                            </h2>

                            {showsLoading ? (
                                <div className="mt-5 flex animate-pulse flex-wrap gap-3">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-9 w-20 rounded-md bg-white/10"
                                        />
                                    ))}
                                </div>
                            ) : sortedDates.length === 0 ? (
                                <div className="mt-5 rounded-lg border border-dashed border-white/15 px-5 py-8 text-center">
                                    <p className="text-white/60">
                                        No showtimes are available for this movie yet.
                                    </p>
                                    <p className="mt-1 text-sm text-white/35">
                                        Check back soon or browse other movies.
                                    </p>
                                </div>
                            ) : (
                                <div className="mt-6 space-y-7">
                                    {sortedDates.map((date) => (
                                        <div key={date}>
                                            <p className="text-[13px] font-medium uppercase tracking-wide text-white/40">
                                                {formatDate(date)}
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-3">
                                                {showsByDate[date]
                                                    .slice()
                                                    .sort(
                                                        (a, b) =>
                                                            new Date(`1970-01-01T${a.showTime || a.time || "00:00"}`) -
                                                            new Date(`1970-01-01T${b.showTime || b.time || "00:00"}`)
                                                    )
                                                    .map((show) => (
                                                        <button
                                                            key={show._id || show.id}
                                                            onClick={() => handleSelectShow(show)}
                                                            className="rounded-md border border-white/25 bg-[#241C47] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
                                                        >
                                                            {formatTime(show)}
                                                            {show.theatre?.name && (
                                                                <span className="ml-2 text-white/40">
                                                                    · {show.theatre.name}
                                                                </span>
                                                            )}
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default MovieDetails;