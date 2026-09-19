import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { useParams } from 'react-router-dom'


const BookingPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const { showId } = useParams();

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
    }, [])

    const rows = "ABCDEFGHIJ".split("");
    const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleSeatClick = (seatLabel) => {
        setSelectedSeats((prev) => {
            if (prev.includes(seatLabel)) {
                // Already selected → deselect
                return prev.filter((seat) => seat !== seatLabel);
            }

            // Not selected → select
            return [...prev, seatLabel];
        });
    };

    return (

        <div className="min-h-screen bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased">
            

            <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-12 pb-32">
                {/* Ticket Map */}
                <div>
                    <div className="mb-10 flex flex-col items-center">
                        <div className="h-1.5 w-72 rounded-full bg-gradient-to-r from-transparent via-[#D9541F]/70 to-transparent sm:w-96" />
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

                                    if (!ticket) return null; // no ticket for this seat, skip it

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
            <div className="flex items-center flex-col fixed bottom-6 left-1/2 -translate-x-1/2 max-w-xs rounded-lg bg-[#241C47] px-4 py-3 text-[14.5px] text-white/60 ring-1 ring-white/10">
                {selectedSeats.length > 0 ? (
                    <>
                        <p className="mb-1.5 text-xs uppercase tracking-wide text-white/35">
                            Selected seats
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {selectedSeats.map((seat) => (
                                <span
                                    key={seat}
                                    className="inline-block rounded-full bg-[#17122E] px-2.5 py-0.5 text-[13px] text-white/80 ring-1 ring-white/10"
                                >
                                    {seat}
                                </span>
                            ))}
                        </div>
                        <button
                            className="mt-3 rounded-md bg-[#D9541F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e66a38]"
                        >
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