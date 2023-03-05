import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";

import secret from "../../guideSecret.json";
import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./ApiConnect.module.css";
import Camera from "./Camera";
import Successful from "./Successful";

export default function ApiConnect({ BACKEND_API }) {
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const { data: session } = useSession();
  const [verification, SetVerification] = useState(false);
  const [address, setAddress] = useState("");
  const [token, setToken] = useState(false);
  // let email = session.user.email.split("@")[0];

  const homeHandler = () => {
    SetVerification(false);
  };

  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
    console.log(`address is : ${address}`);
  };

  const submitHandler = () => {
    const QUICKNODE_RPC =
      "https://silent-fragrant-mound.solana-devnet.discover.quiknode.pro/46540871a346be9dac9e4271afc950c97667652f/";
    // const QUICKNODE_RPC = 'https://damp-solemn-night.solana-devnet.discover.quiknode.pro/95af64c871d29d036fbaa6b1e4d7001b97e57ea9/';
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

    const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
    // const DESTINATION_WALLET = 'FvqMQUsxEyWB7VBaqNKbPS3auGkK19pRKLmbpxyNJ2js';
    // const DESTINATION_WALLET = 'CajdsRtcjrHaBzNXGvweQL8b2KdLmPjW1pitYFp54zXF';
    const DESTINATION_WALLET = address.toString();
    const MINT_ADDRESS = "3nijrqKwNzzyqLjPbnNTxwyn4yKa5cvBo1RYoSv1Fwvk";
    const TRANSFER_AMOUNT = 1;

    // async function getNumberDecimals(mintAddress) {
    //   const info = await SOLANA_CONNECTION.getParsedAccountInfo(new PublicKey(MINT_ADDRESS));
    //   const result = (info.value ?.data as ParsedAccountData).parsed.info.decimals;
    //   return result;
    // }

    async function sendTokens() {
      console.log(
        `Sending ${TRANSFER_AMOUNT} ${MINT_ADDRESS} from ${FROM_KEYPAIR.publicKey.toString()} to ${DESTINATION_WALLET}.`
      );

      console.log(`1 - Getting Source Token Account`);
      let sourceAccount = await getOrCreateAssociatedTokenAccount(
        SOLANA_CONNECTION,
        FROM_KEYPAIR,
        new PublicKey(MINT_ADDRESS),
        FROM_KEYPAIR.publicKey
      );
      console.log(`    Source Account: ${sourceAccount.address.toString()}`);

      console.log(`2 - Getting Destination Token Account`);
      let destinationAccount = await getOrCreateAssociatedTokenAccount(
        SOLANA_CONNECTION,
        FROM_KEYPAIR,
        new PublicKey(MINT_ADDRESS),
        new PublicKey(DESTINATION_WALLET)
      );
      console.log(
        `    Destination Account: ${destinationAccount.address.toString()}`
      );

      // console.log(`3 - Fetching Number of Decimals for Mint: ${MINT_ADDRESS}`);
      // const numberDecimals = await getNumberDecimals(MINT_ADDRESS);
      // console.log(`    Number of Decimals: ${numberDecimals}`);

      //Step 4
      console.log(`4 - Creating and Sending Transaction`);
      const tx = new Transaction();
      tx.add(
        createTransferInstruction(
          sourceAccount.address,
          destinationAccount.address,
          FROM_KEYPAIR.publicKey,
          TRANSFER_AMOUNT * Math.pow(10, 9)
        )
      );

      const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash(
        "confirmed"
      );
      tx.recentBlockhash = await latestBlockHash.blockhash;
      const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [
        FROM_KEYPAIR,
      ]);
      console.log(
        "\x1b[32m", //Green Text
        `   Transaction Success!🎉`,
        `\n    https://explorer.solana.com/tx/${signature}?cluster=devnet`
      );
      setToken(true);
    }

    sendTokens();
  };
  const [isResponse, setIsResponse] = useState("Response");
  let count = 0;

  // const { data: session } = useSession();

  let email = session.user.email.split("@")[0];

  function clickPhoto(e) {
    e.preventDefault();
    fetch(`${BACKEND_API}/click_photo/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, click: "dp" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsResponse(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function checkLiveliness(e) {
    setIsResponse("Show happy, neutral, surprise emotions");
    e.preventDefault();
    fetch(`${BACKEND_API}/check_liveliness/${email}`, {
      method: "POST",
      body: "hello",
    })
      .then((res) => {
        setIsResponse("Verified successfully");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile1, setSelectedFile1] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isSelected1, setIsSelected1] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const changeHandler1 = (event) => {
    setSelectedFile1(event.target.files[0]);
    setIsSelected1(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    // const formData1 = new FormData();

    formData.append("File", selectedFile);
    formData.append("File1", selectedFile1);
    console.log(email);
    fetch(`${BACKEND_API}/upload/${email}/aadhar`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setIsResponse(result);
        console.log("Success:", result);
        SetVerification(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Finished request");
  };

  // getting response
  // fetch(`${BACKEND_API}/response`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     setIsResponse(result["message"]);
  //     console.log("Success:", result);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
  {
    if (!verification) {
      return (
        <div className={classes.app}>
          {/* <h1 className={classes.title}>Hello</h1> */}
          <div className={classes.align}>
            <Camera BACKEND_API={BACKEND_API} />
            {/* Need to add email={email}*/}
            <Card className={classes.capture}>
              <div className={classes.description}>
                <p>{isResponse}</p>
                <Button onClick={clickPhoto}>Capture DP</Button>
              </div>
              <div className={classes.description}>
                <Button onClick={checkLiveliness}>Check Liveliness</Button>
              </div>

              {show && <p className={classes.response}>{response}</p>}
              <div className={classes.divider}></div>
              <div className={classes.form}>
                <input
                  className={classes.upload}
                  type="file"
                  name="file1"
                  onChange={changeHandler}
                />
              </div>
              {isSelected && (
                <div>
                  <div>
                    <p> </p>
                  </div>
                  <div className={classes.description}>
                    <Button onClick={checkLiveliness}>Check Liveliness</Button>
                  </div>
                </div>
              )}

              {show && <p className={classes.response}>{response}</p>}
              <div className={classes.divider}></div>
              <div className={classes.form}>
                <input
                  className={classes.upload}
                  type="file"
                  name="file1"
                  onChange={changeHandler}
                />
                {isSelected ? (
                  <div>
                    <p> </p>
                  </div>
                ) : (
                  <p>Upload You Aadhar</p>
                )}
                <input
                  className={classes.upload}
                  type="file"
                  name="file1"
                  onChange={changeHandler1}
                />
                {isSelected1 ? (
                  <div>
                    <p></p>
                  </div>
                ) : (
                  <p>Upload You Pan</p>
                )}
                <div>
                  <Button onClick={handleSubmission}>Submit</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }
  }
  {
    if (verification) {
      if (!token)
        return (
          <div className={classes.Token_container}>
            <div className={classes.Input_container}>
              <span>Enter your wallet address : </span>
              <input
                type="text"
                onChange={addressChangeHandler}
                className={classes.input}
                placeholder="Enter your wallet address here!"
              />
            </div>
            <button onClick={submitHandler} className={classes.button}>
              Get Token!
            </button>
          </div>
        );
    }
    {
      if (token)
        return (
          <div>
            <Successful homeHandler={homeHandler} />
          </div>
        );
    }
  }
}
