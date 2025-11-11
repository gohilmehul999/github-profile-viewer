import { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!username.trim()) {
      setError("Please enter a username 🙏");
      return;
    }
    try {
      setError("");
      setUserData(null);
      setLoading(true);
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(res.data);
    } catch {
      setError("User not found 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-4 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none"></div>

      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
        🔍 GitHub Profile Detective
      </h1>

      {/* Search Box */}
      <div className="flex w-full max-w-lg bg-gray-800/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.2)] border border-gray-700">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchUser()}
        />
        <button
          onClick={fetchUser}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 text-white font-semibold transition-all"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="mt-6 text-red-400 text-lg">{error}</p>}

      {/* User Card */}
      {userData && (
        <div className="mt-10 bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md shadow-lg border border-gray-700 text-center animate-fadeIn">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
            <img
              src={userData.avatar_url}
              alt={userData.name}
              className="relative w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow-lg"
            />
          </div>

          <h2 className="text-2xl font-semibold mt-4">{userData.name}</h2>
          <p className="text-gray-400">@{userData.login}</p>

          <p className="mt-3 text-gray-300 italic">
            {userData.bio ? userData.bio : "No bio available"}
          </p>

          {/* Stats */}
          <div className="flex justify-around mt-8 text-gray-300">
            <div className="hover:scale-110 transition-transform duration-300">
              <p className="font-bold text-white text-xl">{userData.public_repos}</p>
              <p className="text-sm">Repos</p>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <p className="font-bold text-white text-xl">{userData.followers}</p>
              <p className="text-sm">Followers</p>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <p className="font-bold text-white text-xl">{userData.following}</p>
              <p className="text-sm">Following</p>
            </div>
          </div>

          {/* Button */}
          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full text-white font-medium shadow-md transition-all"
          >
            View GitHub Profile
          </a>

          {/* Footer Info */}
          <div className="mt-6 text-sm text-gray-400 space-y-1">
            <p>📍 {userData.location || "Location not available"}</p>
            <p>🕒 Joined: {new Date(userData.created_at).toLocaleDateString()}</p>
            <p>🌐 {userData.blog ? (
              <a
                href={userData.blog.startsWith("http") ? userData.blog : `https://${userData.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {userData.blog}
              </a>
            ) : "No website"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
