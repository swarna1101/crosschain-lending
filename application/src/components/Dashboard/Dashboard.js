import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const activeLoans = [
    {
      id: 1,
      chain: "Ethereum",
      asset: "USDC",
      amount: "500",
      interestRate: "3.0%",
      collateralChain: "Ethereum",
      collateralAsset: "ETH",
      collateralAmount: "0.5",
    },
    {
      id: 2,
      chain: "Polygon",
      asset: "BTC",
      amount: "0.1",
      interestRate: "4.5%",
      collateralChain: "Binance Smart Chain",
      collateralAsset: "USDC",
      collateralAmount: "250",
    },
  ];

  return (
    <div className="dashboard">
      <div className="table-container">
        <div className="table-header">
          <h3>Active Loans</h3>
          <Link to="/pools" className="new-button">
            New Loan
          </Link>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Chain</th>
              <th>Asset</th>
              <th>Amount</th>
              <th>Interest Rate</th>
              <th>Collateral Chain</th>
              <th>Collateral Asset</th>
              <th>Collateral Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeLoans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.chain}</td>
                <td>{loan.asset}</td>
                <td>{loan.amount}</td>
                <td>{loan.interestRate}</td>
                <td>{loan.collateralChain}</td>
                <td>{loan.collateralAsset}</td>
                <td>{loan.collateralAmount}</td>
                <td>
                  <button className="action-button">Repay Loan</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
