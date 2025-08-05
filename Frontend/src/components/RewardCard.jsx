const RewardCard = ({ title, amount, achieved }) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-lg p-6 transition-all duration-300 ease-in-out
        transform hover:-translate-y-1 hover:shadow-lg
        ${
          achieved
            ? "bg-green-50 dark:bg-green-900 border-green-400"
            : "bg-gray-50 dark:bg-gray-800 border-gray-300"
        }
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <h5
          className={`text-xl font-bold ${
            achieved ? "text-green-700 dark:text-green-300" : "text-gray-700 dark:text-gray-200"
          }`}
        >
          {title}
        </h5>
        <div
          className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${
              achieved
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            }
          `}
        >
          {achieved ? "Achieved" : "Locked"}
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Requirement: <span className="font-bold">₹{amount}</span>
      </p>
      {achieved && (
        <div className="absolute top-0 right-0 m-2 text-2xl animate-pulse">
          🎉
        </div>
      )}
    </div>
  );
};

export default RewardCard;