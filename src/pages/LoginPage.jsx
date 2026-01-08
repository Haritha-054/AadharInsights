import { useState } from "react";

export default function LoginPage({ onLogin }) {
    const [activeTab, setActiveTab] = useState("user"); // 'user' | 'admin'
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMsg("");

        // Simple validation for demo
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        const endpoint = isSignup ? "/signup" : "/login";

        try {
            const response = await fetch(`https://aadharinsights-backend.onrender.com${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: activeTab,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (data.success) {
                if (isSignup) {
                    setSuccessMsg(data.message);
                    setIsSignup(false); // Switch back to login
                    setPassword("");
                } else {
                    onLogin(data.role); // 'admin' or 'user'
                }
            } else {
                setError(data.message || "Action failed");
            }
        } catch (err) {
            setError("Failed to connect to server");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png"
                        alt="Aadhaar Logo"
                        className="login-logo"
                    />
                    <h2 className="login-title">UIDAI Service Portal</h2>
                </div>

                <div className="login-tabs">
                    <button
                        className={`login-tab ${activeTab === "user" ? "active" : ""}`}
                        onClick={() => setActiveTab("user")}
                    >
                        Citizen
                    </button>
                    <button
                        className={`login-tab ${activeTab === "admin" ? "active" : ""}`}
                        onClick={() => setActiveTab("admin")}
                    >
                        Admin
                    </button>
                </div>

                <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#334155" }}>
                    {isSignup ? `Create ${activeTab === 'admin' ? 'Official' : 'Citizen'} Account` : "Login"}
                </h3>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">
                            {activeTab === "admin" ? "Official Email ID" : "Email / Mobile"}
                        </label>
                        <input
                            type={activeTab === "admin" ? "email" : "text"}
                            placeholder={activeTab === "admin" ? "official@uidai.gov.in" : "Enter your ID"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>

                    {error && <p style={{
                        color: "#ef4444", fontSize: "14px", margin: 0, textAlign: "center",
                        background: "#fef2f2", padding: "10px", borderRadius: "8px"
                    }}>{error}</p>}

                    {successMsg && <p style={{
                        color: "#16a34a", fontSize: "14px", margin: 0, textAlign: "center",
                        background: "#f0fdf4", padding: "10px", borderRadius: "8px"
                    }}>{successMsg}</p>}

                    <button type="submit" className="submit-btn">
                        {isSignup ? "Sign Up" : "Login"}
                    </button>
                </form>

                <p className="login-footer">
                    {isSignup ? "Already have an account?" : "New user?"}{" "}
                    <button
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError("");
                            setSuccessMsg("");
                        }}
                        className="link-btn"
                    >
                        {isSignup ? "Login here" : "Create account"}
                    </button>
                </p>
            </div>
        </div>
    );
}
