import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        { username, email, password }
      );

      console.log(response);

      toast.success("Account created — sign in to continue");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Could not create your account"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#DFD9CC] bg-white px-3.5 py-2.5 text-[15px] " +
    "text-[#17122E] placeholder:text-[#A9A2B8] outline-none transition-colors " +
    "focus:border-[#D9541F] focus:ring-[3px] focus:ring-[#D9541F]/20";

  const labelClass = "mb-1.5 block text-[13px] font-medium";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#17122E] p-6 font-[Archivo,ui-sans-serif,system-ui] text-[#2B2440] antialiased">
      <main className="flex w-full max-w-[480px] flex-col rounded-[10px] bg-[#FBFAF6] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] sm:flex-row">

        {/* Stub rail — folds to the top on small screens */}
        <aside
          aria-hidden="true"
          className={
            "relative flex shrink-0 items-center justify-center rounded-t-[10px] " +
            "border-b-2 border-dashed border-[#17122E] bg-[#241C47] py-3 " +
            "sm:w-[62px] sm:rounded-l-[10px] sm:rounded-tr-none sm:border-b-0 sm:border-r-2 sm:py-0 " +
            "before:absolute before:h-[22px] before:w-[22px] before:rounded-full before:bg-[#17122E] before:content-[''] " +
            "before:-bottom-[11px] before:-left-[11px] " +
            "sm:before:bottom-auto sm:before:left-auto sm:before:-top-[11px] sm:before:-right-[11px] " +
            "after:absolute after:-bottom-[11px] after:-right-[11px] after:h-[22px] after:w-[22px] " +
            "after:rounded-full after:bg-[#17122E] after:content-['']"
          }
        >
          <span className="text-[11px] font-medium tracking-[0.24em] text-[#FBFAF6]/55 tabular-nums sm:rotate-180 sm:[writing-mode:vertical-rl]">
            TICKETNEST · 0042
          </span>
        </aside>

        <section className="min-w-0 flex-1 px-6 pb-8 pt-7 sm:px-9 sm:py-10">
          <h1 className="text-[24px] font-semibold tracking-[-0.021em] text-[#17122E] sm:text-[27px]">
            Create your account
          </h1>
          <p className="mb-7 mt-1.5 max-w-[34ch] text-[14.5px] leading-relaxed text-[#6F6885]">
            One account for every show you book, saved in one place.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-[18px]">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-[18px]">
              <label htmlFor="username" className={labelClass}>
                Username
              </label>
              <input
                id="username"
                type="text"
                className={inputClass}
                placeholder="Pick a username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-[18px]">
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                type="password"
                className={inputClass}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2.5 w-full rounded-md bg-[#D9541F] px-4 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#BF4715] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17122E] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#D9541F]"
            >
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-[13.5px] text-[#6F6885]">
            Already have an account?{" "}
            <a
              href="/login"
              className="border-b border-[#D9541F]/35 font-medium text-[#D9541F] hover:border-[#D9541F]"
            >
              Sign in
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;