import React from "react";
import "./Pools.css";

const Pools = () => {
  const pools = [
    {
      id: 1,
      chain: "Ethereum",
      asset: "ETH",
      amount: "50",
      interestRate: "2.5%",
      ltv: "70%",
      lockedDays: "30",
      collateralChain: "Ethereum",
      collateralAsset: "USDC",
      by: "User1",
    },
    {
      id: 2,
      chain: "Polygon",
      asset: "USDC",
      amount: "1000",
      interestRate: "3.1%",
      ltv: "80%",
      lockedDays: "45",
      collateralChain: "Ethereum",
      collateralAsset: "ETH",
      by: "User2",
    },
    {
      id: 3,
      chain: "Binance Smart Chain",
      asset: "DAI",
      amount: "5000",
      interestRate: "1.9%",
      ltv: "60%",
      lockedDays: "60",
      collateralChain: "Polygon",
      collateralAsset: "BUSD",
      by: "User3",
    },
  ];

  return (
    <div className="pools">
      <h3>Available Pools</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Chain</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Interest Rate</th>
            <th>LTV</th>
            <th>Locked Days</th>
            <th>Collateral Chain</th>
            <th>Collateral Asset</th>
            <th>By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((pool) => (
            <tr key={pool.id}>
              <td>{pool.chain}</td>
              <td>{pool.asset}</td>
              <td>{pool.amount}</td>
              <td>{pool.interestRate}</td>
              <td>{pool.ltv}</td>
              <td>{pool.lockedDays}</td>
              <td>{pool.collateralChain}</td>
              <td>{pool.collateralAsset}</td>
              <td>{pool.by}</td>
              <td>
                <button className="borrow-button">Borrow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pools;
