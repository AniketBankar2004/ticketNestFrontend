import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';

const MyBookingsPage = () => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getMyBookings = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/bookings/my",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }


                );

                setBookings(response.data);
                console.log("Fetched Bookings")
            } catch (error) {
                console.log(error);
            }
        }

        getMyBookings();
    }, [])

    function formattedTime(time) {
        return new Date(time).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        );
    }

    function getSeatNumbers(tickets) {
        let seatNumbers = []
        for (let i = 0; i < tickets.length; i++) {
            seatNumbers.push(tickets[i].seatNumber);
        }
        return seatNumbers.join(", ");
    }

    const cancelBooking = async (bookingId) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/bookings/${bookingId}`,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            toast.success("Booking cancelled");


            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === bookingId
                        ? { ...booking, status: "CANCELLED" }
                        : booking
                )
            );

        } catch (error) {
            console.error("Failed to cancel booking:", error);
            toast.error(error.data)
        }
    };

    return (
        <div className="min-h-screen bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased px-6 py-10">
            <h2 className="text-center text-[17px] font-semibold tracking-[-0.01em] mb-6">
                My Bookings
            </h2>

            {bookings.length === 0 ? (
                <p className="text-center text-white/60 text-[14.5px]">
                    You have no bookings yet.
                </p>
            ) : (
                <div className="flex flex-col gap-4 max-w-100 mx-auto">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="w-full rounded-lg bg-[#241C47] p-5 ring-1 ring-white/10 flex gap-5 text-[14.5px] text-white/60"
                        >
                            

                            {/* Booking Details */}
                            <div className="flex flex-col gap-2">
                                <p className="text-white/90 font-semibold text-[15px] mb-1">
                                    {booking.movieTitle}
                                </p>

                                <p>
                                    Time:
                                    <span className="text-white/90 ml-1">
                                        {formattedTime(booking.showTime)}
                                    </span>
                                </p>

                                <p>
                                    Seats:
                                    <span className="text-white/90 ml-1">
                                        {getSeatNumbers(booking.tickets)}
                                    </span>
                                </p>

                                {booking.totalAmount != null && (
                                    <p>
                                        Amount:
                                        <span className="text-white/90 ml-1">
                                            ₹{booking.totalAmount}
                                        </span>
                                    </p>
                                )}

                                {booking.status && (
                                    <span
                                        className={`mt-2 self-start rounded-md px-3 py-1 text-xs font-semibold ${booking.status === "CANCELLED"
                                                ? "bg-white/10 text-white/50"
                                                : "bg-[#D9541F]/20 text-[#D9541F]"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                )}

                                {booking.status === "CONFIRMED" && (
                                    <button
                                        onClick={() => cancelBooking(booking.id)}
                                        className="bg-red-700 mt-2 self-start rounded-md px-3 py-1 text-xs font-semibold text-white hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyBookingsPage