import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios"
import { Form, MaxSupplyForm, SalesPriceForm } from "./Form"
import { handleShutDown, handleWithdrawToOwner, handleSetTotalSupply, showNetwork, handleMintNFT } from "./HelperFunctions"
import abi from './utils/EightTestToken.json';
import splash from './../../images/splash-optimized.png'

const admin1 = import.meta.env.VITE_CONTRACT_CHAINBLOCK_ADDR
const admin2 = import.meta.env.VITE_CONTRACT_CODESPORT_ADDR

const getExternalData = async ( url ) => {
    const response = await axios.get(url);
    return response.data;
}


const Controller = () => { //deplyed via remix: https://rinkeby.etherscan.io/address/0xB1566a176D114DfC9dA5b4828AFfDB627C582be0

    const { ethereum } = window
    const [currentAccount, setCurrentAccount] = useState("");

    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const [price, setPrice] = useState("");
    const [networkName, setNetworkName] = useState("");
    const [serverStatus, setServerStatus] = useState("")

    const contractAddress = "0x001fd467D74CC8c3c2e4884a1810D06F082aeFe3"; //cb owned
    const contractABI = abi.abi;

    const provider = new ethers.providers.Web3Provider(ethereum); //fix 1
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
  


   
    const checkIfWalletIsConnected = async () => {
        try {

            if (!ethereum) {  
                console.log("Make sure you have metamask!");
                setError(<a target="_blank" href={`https://metamask.io/download.html`}> Make sure you have metamask.</a>)
                return;
            } else {
                console.log("Metmask is installed");
                //setStatus("Wallet connected!");
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                //const account = accounts[0];
                console.log("checkIfWalletIsConnected(): Found an authorized account: " + accounts[0]);
                setStatus("Found an authorized account: " + accounts[0])
                setError("")

                setCurrentAccount(accounts[0])

                onNetworkChange('checkIfWalletIsConnected()')
                             
/*
https://stackoverflow.com/q/70663898/946957
window.ethereum.on('chainChanged', (chainId) => {
            if(chainId !== "0x13881") {
                setErrorMessage("Please connect on testnet Polygon Mumbai")
            } else {
                setErrorMessage(null)
                window.location.reload();
   }

*/
            } else {
                console.log("Connect to Metamask using the top right button")
                setError(
                    <>
                    <div style={{ position: "absolute", padding: ".5em" }}>Connect to Metamask using the top right button</div> 
                    
                    <img style={{ marginTop: "3em", width: "80%" }}src={splash} alt="splash image" />
                    </>          
                )               
            }

        } catch (error) {
            console.log(error.message);
            setError(error.message)         
        }
    }

    const connectWallet = async () => {
        try {

            if (!ethereum) {
                alert("Get MetaMask!");
                setError("Make sure you have metamask")
                return;
            }
            
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Message from 'connectWallet()': Now connected to: " + accounts[0]);
            setCurrentAccount(accounts[0]);

            onNetworkChange('connectWallet')
            
        
        } catch (error) {
            console.log(error.message);
            setError(error.message)  
        }
    }


    // async function getAccount() {
    //     const accounts = await ethereum.enable();
    //     const account = accounts[0];
    //     // do something with new account here
    //   }
      
    //   ethereum.on('accountsChanged', function (accounts) {
    //     getAccount();
    //   })

    // const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const network = await provider.getNetwork();
    // const chainId = network.chainId;
    // const name = network.name
    // provider.getNetwork().chainId.
    // provider.getNetwork().name

    const addWalletListener = async () => {

        if (ethereum) {

            ethereum.on("accountsChanged", (accounts) => {

                if (accounts.length > 0) {

                    setCurrentAccount( accounts[0] )
                    setStatus("Succesfully reconnected")
                    setError("")

                    onNetworkChange('addWalletListener()')

                } else {

                    setCurrentAccount("")
                    setStatus("") 
                    console.log("Message from 'addWalletListener': Connect your wallet by clicking the top right button")
                    setError("Connect your wallet by clicking the top right button")
           
                }
            });

            ethereum.on('chainChanged', (chainId) => {
                console.log(chainId)
                if(chainId !== "0x13881") {
                    setError("Please connect on testnet Polygon Mumbai")
                } else {
                    setError("")
                    window.location.reload()
                }

            })


        } else {

            setError(<a target="_blank" href={`https://metamask.io/download.html`}> Click here to learn install and learn more about Metamask.</a>)

        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        addWalletListener()

        fetch("http://localhost:3001/api")
        .then((res) => res.json())
        .then((serverStatus) => setServerStatus(serverStatus.message), console.log(serverStatus))        

    }, [])
    
    const handleCopyText =  (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
        setStatus("Successfully copied " + textToCopy + "to clipboard")
    }

    const onNetworkChange = async ( callingFunctionName ) =>{

        const network = await provider.getNetwork()
        console.log( `${callingFunctionName} Raw Network Name: ${network.name}`)
        
        const callback = showNetwork( network );
        callback.success ? setNetworkName(callback.status) : setError(callback.error)

        console.log(`${callingFunctionName} Formatted Network Name: ${callback.status}`)
    }

    const onSetTotalSupply_pressed = async (event) => {
        event.preventDefault()   
        const callback = await handleSetTotalSupply(event, contract);
        callback.success ? setStatus(callback.status) : setError(callback.error)
    }  

    const onSetSalesPrice_pressed = async (event) => {
        event.preventDefault()   
        const callback = await handleSetSalesPrice(event, contract, ethers);
        callback.success ? setStatus(callback.status) : setError(callback.error)
    } 

    const onMintNFT_pressed = async (event, image) => {
        event.preventDefault()   

        console.log(image);
        const callback = await handleMintNFT(axios, event, contract, contractAddress, image);
        callback.success ? setStatus(callback.status) : setError(callback.error)
    }

    const getContractProperties = async ( get /* readonly contract function */, command /* name of state to update */ ,
     message /* Ssatus Message */, format=false /* eth || base64 */ ) => {
        let output = ( await get)
        
        if (format === 'eth') {

            output =  ethers.utils.formatEther( output )
            command(  `${message} ${output}` )

        } else if (format === 'base64'){
            
            output =  output.split(',')
            let [, output1] = output //https://github.com/oliver-moran/jimp/issues/231
            output = atob(output1)
            command( <span style={{fontSize:".5em", margin:"0 2em", maxWidth:"44%", overflow:"scroll"}}> {output} </span> )
        
        } else {

            command( `${message} ${output}` )

        }
        
        //return output
    }
    

        // //inline styles using CSS objects
        // const buttonCSS = {

        //     display: 'flex',
        //     justifyContent: 'center',
        //     width: '50%',
        //     marginTop: '1em'

        // }

    let form = null,
        viewWalletStatus = null,
        withdrawToOwnerAddressButton = null,
        handleShutDownButton = null,
        updateMaxSupplyForm = null,
        updateSalesPriceForm = null,
        getMaxSupplyButton = null,
        getTotalMintedButton = null,
        getContractBalanceButton = null,
        getContractMetadataButton = null,
        test = 123
    // let maxSupply = null
       let getSalesPriceButton = null
    // let deletContract_addr= null
    // let approve_addr_tokenId = null
    // let setDelegate_addrTo = null
    // let readDelegates_addrOf = null
    // let balanceOf_addr = null
    // let balanceOfAddress = null
    // let ownerOf_tokenId = null
    // let withdrawToAddess = null
    // let burnNFT = null
    // let pause = null
    // let unPause = null

   
    //console.log("Console log: " + price)
    //console.log(currentAccount)
    //console.log("Connected Account: " + currentAccount + " | Admin Account: " + admin1)
    if (!currentAccount ){

        viewWalletStatus = <button className="kviMVi" onClick={connectWallet}>Connect Wallet</button>
    
    } else {
        viewWalletStatus = 
        <>
        {networkName}
        <button className="kviMVi" onClick={() => handleCopyText(currentAccount) }><b>Connected:</b> {String(currentAccount).substring(0, 6) + "..." + String(currentAccount).substring(38)}</button>
        </>

        form = <Form callback={onMintNFT_pressed} contractMeta="5" /> 

        getMaxSupplyButton = 
        <button className="kviMVi" onClick={ () => getContractProperties( contract.maxSupply(), setStatus, "The Maximum Supply Is: " ) }>Maximum Token Supply</button>

        getSalesPriceButton = 
        <button className="kviMVi" onClick={ () => getContractProperties( contract.salesPrice(), setStatus, "NFT DAO Wholesale Price Is: ", "eth" ) }>Get Wholesale NFT Price</button>

        getTotalMintedButton = 
        <button className="kviMVi" onClick={ () => getContractProperties( contract.getTotalSupply(), setStatus, "The current supply is: ") }>Total Tokens Minted</button>

        getContractBalanceButton = 
        <button className="kviMVi" onClick={ () => getContractProperties( provider.getBalance(contractAddress), setStatus, "The contract balance is: ", 'eth' ) }>Contract Cash Balance</button>

        getContractMetadataButton = 
        <button className="kviMVi" onClick={ () => getContractProperties( contract.contractURI(), setStatus, '', 'base64' ) }>View Contract Metadata</button>
// getContractProperties( contract.salesPrice(), setPrice )
//() => getContractProperties( contract.salesPrice(), setPrice, "The sales price is: ", 'eth' )
    }

    if(currentAccount === admin1 ){
        
        updateMaxSupplyForm = <MaxSupplyForm callback={onSetTotalSupply_pressed}/>
        updateSalesPriceForm = <SalesPriceForm callback={onSetSalesPrice_pressed}/>

        // handleShutDownButton = <button className="kviMVi adminButton" onClick={handleShutDown}>Delete App</button>

        // withdrawToOwnerAddressButton = <button className="kviMVi adminButton" onClick={handleWithdrawToOwner}>Withdraw Funds</button>
    }
   
        
    return(
        <React.Fragment>
            <div className="connectButton">
                {viewWalletStatus}
            </div>
            {form}    
            <div className="center">{getMaxSupplyButton} {getTotalMintedButton} {getSalesPriceButton}{getContractBalanceButton}{getContractMetadataButton}</div>

            <span id="status" className="center">{status}</span><span className="error center">{error}</span>

            <div id="admin" className="center">{updateMaxSupplyForm}{updateSalesPriceForm}{handleShutDownButton}{withdrawToOwnerAddressButton}</div>    
            <p>{!serverStatus? "Loading..." : serverStatus}</p>
        </React.Fragment>

        
    )

  
}


export default Controller