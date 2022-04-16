import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../utils/shortenAddress";
import "../App.css";

const urls = [
  "https://drive.google.com/file/d/1aXa8j8BfiPwuJ6meBn12KwCK8UvcF_mB/view?usp=sharing",
  "https://drive.google.com/file/d/1cx43N-CjCLphiDhdRF_lWVPA99k5dK3h/view?usp=sharing",
  "https://drive.google.com/file/d/1YzS9VQyvFfZxqYxKTxJZbvisRuhUG1GG/view?usp=sharing",
  "https://drive.google.com/file/d/1yOu5YoSqC1stisVQrJJ_AhqUVHz4Fizf/view?usp=sharing",
  "https://drive.google.com/file/d/1COlXFHCqrz65w-IVM5OnliYJpf-RNkIH/view?usp=sharing",
  "https://drive.google.com/file/d/1SaN_HWI0yrbOFhIXNLmdvT8KqqW_LdJO/view?usp=sharing",
];

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
}) => {
  const newMessage = JSON.parse(message);
  const url = urls[Math.floor(Math.random() * urls.length)];

  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To: {shortenAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          <p className="text-white  text-base">Name : {newMessage.name}</p>
          <p className="text-white  text-base">Age : {newMessage.age}</p>
          <p className="text-white  text-base">
            Address : {newMessage.address}
          </p>
          {newMessage.doctor && (
            <p className="text-white  text-base">Doctor: {newMessage.doctor}</p>
          )}
          {newMessage.symptoms && (
            <p className="text-white  text-base">
              Symptoms: {newMessage.symptoms}
            </p>
          )}
          {newMessage.prescription && (
            <p className="text-white  text-base">
              Prescription: {newMessage.prescription}
            </p>
          )}
          <div className="bg-black p-3 w-max rounded-3xl shadow-2xl docs">
            <p className="text-[#37c7da] font-bold">
              <a href={url} target="_blank" rel="noreferrer">
                Patient Docs &#8599;
              </a>
            </p>
          </div>
        </div>
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  console.log(transactions);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...transactions]
            .reverse()
            .splice(0, transactions.length - 14)
            .map((tran, i) => (
              <TransactionsCard key={i} {...tran} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
