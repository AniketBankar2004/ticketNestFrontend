import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center bg-[#17122E] font-[Archivo,ui-sans-serif,system-ui] text-white antialiased">
      <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">

        <span className="text-[11px] font-medium tracking-[0.24em] text-white/40">
          BOOK YOUR NEXT SHOW
        </span>

        <h1 className="mt-3 text-5xl font-bold tracking-[-0.02em] sm:text-6xl">
          TicketNest
        </h1>

        <p className="mx-auto mb-10 mt-5 max-w-[46ch] text-lg leading-relaxed text-white/60">
          Your one-stop destination for ticket booking. Concerts, sports,
          theatre, and more — all in one place.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/login")}
            className="w-full rounded-md bg-[#D9541F] px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#BF4715] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="w-full rounded-md border border-white/25 px-8 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;