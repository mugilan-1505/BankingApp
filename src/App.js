import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userid, setUserId] = useState("");
  const [info, setInfo] = useState(null);
  const [readyForTransaction, setReadyForTransaction] = useState(false);

  const handleTransaction = (e) => {
    e.preventDefault();
    if (!transaction) {
      alert("Please select a transaction type");
      return;
    }
    if (!value || Number(value) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (transaction === "Deposit") {
      setAmount(amount + Number(value));
    } else if (transaction === "Withdraw") {
      const temp = amount - Number(value);
      if (temp < 0) {
        alert("Insufficient Balance");
        return;
      }
      setAmount(temp);
    } else {
      alert("Invalid Transaction");
    }
    setValue("");
    setTransaction("");
  };

  const handleAccountCreation = (e) => {
    e.preventDefault();
    if (!username || !usermail || !userid) {
      alert("Please fill all account details");
      return;
    }
    setInfo({ username, usermail, userid });
    setReadyForTransaction(true);
    alert(`Account Created for ${username}`);
    setUsername("");
    setUsermail("");
    setUserId("");
  };

  const handleAccountDeletion = () => {
    setInfo(null);
    setReadyForTransaction(false);
    setAmount(0);
    alert("Account Deleted Successfully");
  };

  return (
    <div className="app-container">
      <h1>Bank Application</h1>
      <form onSubmit={handleAccountCreation}>
        <h3>Create Account</h3>
        <label className="form-label">User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
          className="input-field"
        />
        <label className="form-label">User Mail:</label>
        <input
          type="email"
          value={usermail}
          onChange={(e) => setUsermail(e.target.value)}
          placeholder="Enter User Mail"
          className="input-field"
        />
        <label className="form-label">User ID:</label>
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          className="input-field"
        />
        <button type="submit" className="submit-btn">
          Create Account
        </button>
      </form>

      {info && (
        <div className="account-details">
          <h3>Account Details</h3>
          <ul>
            <li>
              <span>Name:</span> {info.username}
            </li>
            <li>
              <span>Email:</span> {info.usermail}
            </li>
            <li>
              <span>ID:</span> {info.userid}
            </li>
          </ul>
          <button onClick={handleAccountDeletion} className="delete-btn">
            Delete Account
          </button>
        </div>
      )}

      {readyForTransaction && (
        <div>
          <h3>Need To Make a Transaction?</h3>
          <form onSubmit={handleTransaction}>
            <label className="form-label">Choose Your Transaction</label>
            <select
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
              className="dropdown"
            >
              <option value="">-- Select --</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            <div className="balance-display">
              Your Bank Balance is Rs.{amount}
            </div>
            <label className="form-label">Enter The Amount</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
              className="input-field"
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;