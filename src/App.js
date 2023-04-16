import { ConnectWallet, Web3Button } from "@thirdweb-dev/react";
import { useState } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import "./styles/Home.css";

export default function Home() {
  const contractAddress = "0x3db71a58a48F3Ca96483F5aD15f2d45F88f6f7D8";
  const { contract } = useContract(contractAddress);

  // get
  const { data } = useContractRead(contract, "getCounter");
  const [counter, setCounter] = useState();

  // increment
  const { mutateAsync: incrementCounter } = useContractWrite(
    contract,
    "incrementCounter"
  );

  // decrement
  const { mutateAsync: decrementCounter } = useContractWrite(
    contract,
    "decrementCounter"
  );

  async function getCounter() {
    if (!contract) return;
    setCounter(parseInt(data._hex));
  }

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">DApp Counter</h1>
        <h2>Made By Woo Sang</h2>

        <p className="description">
          ThirdWeb을 활용하여 만든 DApp Counter made with React
        </p>

        <div className="connect">
          <ConnectWallet
            dropdownPosition={{ side: "bottom", align: "center" }}
          />
        </div>

        <div className="counter">{parseInt(data)}</div>

        <br />
        <Web3Button contractAddress={contractAddress} action={getCounter}>
          Refresh Counter
        </Web3Button>
        <br />
        <Web3Button contractAddress={contractAddress} action={incrementCounter}>
          Increment Counter
        </Web3Button>
        <br />
        <Web3Button contractAddress={contractAddress} action={decrementCounter}>
          Decrement Counter
        </Web3Button>
      </main>
    </div>
  );
}
