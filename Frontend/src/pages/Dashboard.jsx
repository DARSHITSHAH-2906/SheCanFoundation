import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import RewardCard from "../components/RewardCard";
import { useThemeStore, useUserStore } from "../store";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

const rewards = [
  { title: "Bronze Badge", amount: 1000 },
  { title: "Silver Badge", amount: 5000 },
  { title: "Gold Badge", amount: 10000 },
  { title: "Exclusive T-shirt", amount: 20000 },
];

const Dashboard = () => {
  const { darkMode } = useThemeStore();
  const { userData, isLoggedIn } = useUserStore();
  const navigate = useNavigate();

  const [internName, setInternName] = useState("Loading...");
  const [referralCode, setReferralCode] = useState("Loading...");
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn || !userData?.email) {
      navigate("/");
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `http://localhost:5000/api/dashboard/${userData.email}`
        );

        setInternName(response.data.user.name);
        setReferralCode(response.data.user.referralCode);
        setTotalDonations(response.data.user.totalDonations);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "Failed to fetch dashboard data.");
        } else if (err.request) {
          setError("No response from server. Please check your network connection.");
        } else {
          setError("An unexpected error occurred. Please try again.");
          console.error("Axios request setup error:", err.message);
        }
        console.error("Dashboard data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isLoggedIn, userData, navigate]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <p className="text-red-500 text-lg">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 text-center md:text-left">
          <h2
            className={`text-4xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Welcome, {internName}
          </h2>
          <div className="mt-4 inline-block">
            <p
              className={`text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Your referral code:
            </p>
            <div
              className={`
                font-mono font-bold text-xl px-4 py-2 mt-2 rounded-full shadow-md cursor-pointer
                transition-all transform hover:scale-105
                ${darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-700"}
              `}
            >
              {referralCode}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div
            className={`
              p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl md:col-span-1 
              flex flex-col justify-center items-center
              ${darkMode ? "bg-gray-800" : "bg-white"}
            `}
          >
            <p
              className={`text-xl font-semibold ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Total Donations Raised
            </p>
            <h3 className="text-5xl font-bold text-green-500 mt-4 animate-pulse">
              ₹{totalDonations}
            </h3>
          </div>
          <div
            className={`
              md:col-span-2 p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl
              ${darkMode ? "bg-gray-800" : "bg-white"}
            `}
          >
            <h4
              className={`text-2xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Your Rewards
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {rewards.map((reward, i) => (
                <RewardCard
                  key={i}
                  title={reward.title}
                  amount={reward.amount}
                  achieved={totalDonations >= reward.amount}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
