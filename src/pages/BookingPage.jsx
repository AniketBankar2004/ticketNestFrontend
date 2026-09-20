import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { useParams, useLocation } from 'react-router-dom'

const BookingPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const { showId } = useParams();
    const location = useLocation();
    const {
        movieName,
        showDate,
        showTime
    } = location.state || {};

    useEffect(() => {
        const token = localStorage.getItem("token");

        const authHeader = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const fetchTickets = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/shows/${showId}/tickets`, authHeader);

                console.log(response.data);
                setTickets(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTickets();
    }, [showId])

    const rows = "ABCDEFGHIJ".split("");
    const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleSeatClick = (seatLabel) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatLabel)) {
                return prev.filter((seat) => seat !== seatLabel);
            }
            return [...prev, seatLabel];
        });
    };

    return (
        <div className="min-h-screen bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased">

            {/* Header */}


            <div className="h-16 w-full fixed top-0 left-0 z-10 bg-[#1E1640]/95 backdrop-blur-sm border-b border-white/10 shadow-lg shadow-black/20 flex flex-row items-center justify-between px-6 sm:px-10">
                <p className="text-[15px] sm:text-[17px] font-semibold tracking-[-0.01em] text-white truncate max-w-[45%]">
                    {movieName || "Loading..."}
                </p>

                <div className="flex items-center gap-4 sm:gap-6 text-white/60">
                    {showDate && (
                        <div className="flex items-center gap-1.5">
                            <FaCalendarAlt size={12} className="text-[#D9541F]" />
                            <span className="text-[13px] sm:text-[14px] font-medium">
                                {showDate}
                            </span>
                        </div>
                    )}
                    {showTime && (
                        <div className="flex items-center gap-1.5">
                            <FaClock size={12} className="text-[#D9541F]" />
                            <span className="text-[13px] sm:text-[14px] font-medium">
                                {showTime}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-32">
                
                {/* Ticket Map */}
                <div className="inline-flex flex-col items-center mb-10">

                    {/* Screen indicator — width now derived from the seat grid, not fixed */}
                    <div className="mb-10 flex flex-col items-center w-full">
                        <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-transparent via-[#D9541F]/70 to-transparent" />
                        <div className="mt-2 text-center text-xs uppercase tracking-[0.2em] text-white/35">
                            Screen
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {rows.map((row) => (
                            <div key={row} className="flex items-center gap-2">
                                <span className="w-5 shrink-0 text-center text-xs font-semibold text-white/40">
                                    {row}
                                </span>
                                {seatNumbers.map((num) => {
                                    const seatLabel = `${row}${num}`;
                                    const ticket = tickets.find((t) => t.seatNumber === seatLabel);

                                    if (!ticket) {
                                        // keep an empty slot so columns still line up
                                        return <div key={seatLabel} className="h-7 w-7" />;
                                    }

                                    const isSelected = selectedSeats.includes(seatLabel);

                                    return (
                                        <button
                                            key={ticket.id}
                                            onClick={() => handleSeatClick(seatLabel)}
                                            title={seatLabel}
                                            className={`flex h-7 w-7 items-center justify-center rounded-md text-[13px] transition-colors ${isSelected
                                                ? "text-[#D9541F]"
                                                : "text-white/50 hover:text-white"
                                                }`}
                                        >
                                            {isSelected ? (
                                                <FaCheckSquare size={16} />
                                            ) : (
                                                <FaRegSquare size={16} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Selected seats panel */}
                {/* Selected seats panel */}
                <div className="flex items-center flex-col fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs rounded-lg bg-[#241C47] px-4 py-3 text-[14.5px] text-white/60 ring-1 ring-white/10 z-10">
                    {selectedSeats.length > 0 ? (
                        <>
                            <p className="mb-1.5 text-xs uppercase tracking-wide text-white/35">
                                Selected seats
                            </p>
                            <div className="flex flex-wrap gap-1.5 justify-center max-h-20 overflow-y-auto">
                                {selectedSeats.map((seat) => (
                                    <span
                                        key={seat}
                                        className="inline-block rounded-full bg-[#17122E] px-2.5 py-0.5 text-[13px] text-white/80 ring-1 ring-white/10"
                                    >
                                        {seat}
                                    </span>
                                ))}
                            </div>
                            <button onClick={() => setShowConfirm(true)} className="mt-3 rounded-md bg-[#D9541F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e66a38]">
                                Proceed
                            </button>
                        </>
                    ) : (
                        <span className="text-white/30">No seats selected</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookingPage