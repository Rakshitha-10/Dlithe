import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";

// Dummy data for simplicity (replace with backend integration)
const users = [];
const transactions = [];

function MainPage() {
  return (
    <div>
      <h1>Welcome to Simple Bank</h1>
      <Link to="/register">Register</Link> <br />
      <Link to="/services">Services</Link> <br />
      <Link to="/profile">Profile</Link> <br />
      <Link to="/transactions">Transactions</Link>
    </div>
  );
}

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { username, password, balance: 0 };
    users.push(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    console.log(localStorage.getItem("loggedInUser"));
    alert("Registration successful!");
    navigate("/services");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link to="/">Back to Main</Link>
    </div>
  );
}

function ServicesPage() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered in ServicesPage");
    const storedUser = localStorage.getItem("loggedInUser");
    console.log("storedUser:", storedUser);
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      console.log("logged in user set: ", JSON.parse(storedUser));
    } else {
      console.log("navigating to main page");
      navigate("/");
      console.log("navigated to main page");
    }
  }, [navigate]);

  const handleDeposit = () => {
    if (!loggedInUser) return;
    const userIndex = users.findIndex(
      (user) => user.username === loggedInUser.username
    );
    if (userIndex !== -1) {
      users[userIndex].balance += parseInt(depositAmount);
      transactions.push({
        user: loggedInUser.username,
        type: "deposit",
        amount: parseInt(depositAmount),
      });
      setLoggedInUser(users[userIndex]);
      localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
      alert(`Deposited ${depositAmount}. New Balance: ${users[userIndex].balance}`);

    }
  };

  const handleWithdraw = () => {
    if (!loggedInUser) return;
    const userIndex = users.findIndex(
      (user) => user.username === loggedInUser.username
    );
    if (
      userIndex !== -1 &&
      users[userIndex].balance >= parseInt(withdrawAmount)
    ) {
      users[userIndex].balance -= parseInt(withdrawAmount);
      transactions.push({
        user: loggedInUser.username,
        type: "withdraw",
        amount: parseInt(withdrawAmount),
      });
      setLoggedInUser(users[userIndex]);
      localStorage.setItem("loggedInUser", JSON.stringify(users[userIndex]));
      alert(`Withdrawn ${withdrawAmount}. New Balance: ${users[userIndex].balance}`);

    } else {
      alert("Insufficient funds or user not found.");
    }
  };

  return (
    <div>
      <h1>Services</h1>
      <div>
        <h2>Deposit</h2>
        <input
          type="number"
          placeholder="Amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
        <button onClick={handleDeposit}>Deposit</button>
      </div>
      <div>
        <h2>Withdraw</h2>
        <input
          type="number"
          placeholder="Amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
        />
        <button onClick={handleWithdraw}>Withdraw</button>
      </div>
      <Link to="/">Back to Main</Link>
    </div>
  );
}

function ProfilePage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered in ProfilePage");
    const storedUser = localStorage.getItem("loggedInUser");
    console.log("storedUser:", storedUser);
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      console.log("logged in user set: ", JSON.parse(storedUser));
    } else {
      console.log("navigating to main page");
      navigate("/");
      console.log("navigated to main page");
    }
  }, [navigate]);

  if (!loggedInUser) return null;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {loggedInUser.username}</p>
      <p>Balance: {loggedInUser.balance}</p>
      <Link to="/">Back to Main</Link>
    </div>
  );
}

function TransactionPage() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered in TransactionPage");
    const storedUser = localStorage.getItem("loggedInUser");
    console.log("storedUser:", storedUser);
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      console.log("logged in user set: ", JSON.parse(storedUser));
    } else {
      console.log("navigating to main page");
      navigate("/");
      console.log("navigated to main page");
    }
  }, [navigate]);

  if (!loggedInUser) return null;

  const userTransactions = transactions.filter(
    (transaction) => transaction.user === loggedInUser.username
  );

  return (
    <div>
      <h1>Transactions</h1>
      <ul>
        {userTransactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type}: {transaction.amount}
          </li>
        ))}
      </ul>
      <Link to="/">Back to Main</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;