import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { getMoviePosterUrl } from "../../services/fetchPoster";
import { useParams, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';


const ConfirmPage = () => {
    const navigate = useNavigate();
    const { showId } = useParams();
    const [moviePosterUrl, setMoviePosterUrl] = useState("");
    const location = useLocation();
    const { movieName, showDate, showTime, selectedTickets } = location.state || {};
    console.log(selectedTickets);
    let amount = 0
    let seatNumbers = []

    for (let i = 0; i < selectedTickets.length; i++) {
        seatNumbers.push(selectedTickets[i].seatNumber);
        amount = amount + selectedTickets[i].price;
    }

    useEffect(() => {
        const getPosterUrl = async () => {
            try {
                const posterUrl = await getMoviePosterUrl(movieName);
                setMoviePosterUrl(posterUrl);
            }
            catch (error) {

            }
        }
        getPosterUrl();
    },
        []);

    const bookTickets = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/shows/${showId}/book`,
                {
                    seatNumbers: seatNumbers
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log(response.data);
            toast.success("Tickets Booked Successfully");
            navigate("/home")
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="min-h-screen bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased flex justify-center items-center px-6">
            <div className="w-full max-w-xs rounded-lg bg-[#241C47] px-6 py-6 ring-1 ring-white/10">
                <h2 className="text-center text-[17px] font-semibold tracking-[-0.01em] mb-4">
                    Summary
                </h2>
                <form action="" className="flex flex-col gap-2 text-[14.5px] text-white/60 text-center">
                    <div className="flex justify-center mb-5"><img src={moviePosterUrl}
                        alt={movieName} className="w-48 h-72 object-cover items-center" />
                    </div>
                    <p>Movie: <span className="text-white/90">{movieName}</span></p>
                    <p>Date: <span className="text-white/90">{showDate}</span></p>
                    <p>Time: <span className="text-white/90">{showTime}</span></p>
                    <p>Selected Seats: <span className="text-white/90">{seatNumbers.join(", ")}</span></p>
                    <p>Amount: <span className="text-white/90">₹{amount}</span></p>
                    <button
                        type="button"
                        onClick={bookTickets}
                        className="mt-3 rounded-md bg-[#D9541F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e66a38]"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmPage