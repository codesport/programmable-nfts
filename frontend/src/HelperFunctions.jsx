const handleMintNFT = async (axios, event, contract, contractAddress, fileStream) => {

    console.log( fileStream )

    const personalMessage =  event.target.message.value
    //const filePath = (event.target.image.value ? event.target.image.value : "")

    const price = (await contract.salesPrice()).toString()

    let currentTokenID
    currentTokenID = ( await contract.getTokenCurrentTokenID() ).toString();
    console.log(currentTokenID)


	//1. Package data like a formS
	let formData = new FormData();
    formData.append("tokenID", currentTokenID);
    formData.append("message", personalMessage);
    formData.append("address", contractAddress)    
	formData.append("file", fileStream);

    console.log(personalMessage)
    console.log( formData.get("address"))
    
    //let reactData = { tokenID: currentTokenID, message: personalMessage, address: contractAddress, image: image} ;
    const serverURL = "http://localhost:3001/process"
        
    const response = await axios.post( serverURL, formData, {
        headers: { 'Content-Type': `multipart/form-data; boundary=${formData._boundary}` }
    })

    console.log(response.data)

    const tokenURI = response.data[0]

    // return {success: true, status:<>
    // <p style={{ fontSize: "1em", position: "absolute", marginTop:"1em"}}>Congratulations! Your NFT Was Successfuly Minted!</p>
    //     <ol style={{ fontSize: ".7em", lineHeight: "2em", marginTop: "4em" }}>
    //     <li>Token URI (i.e., NFT Metadata on IPFS): <a href={response.data[0]} target="_blank">{response.data[0]}</a></li>
    //     <li>Token URL (NFT Metadata URL on Pinata): <a href={response.data[1]} target="_blank">{response.data[1]}</a></li>
    //     <li>Image URI (NFT on IPFS): <a href={response.data[2]} target="_blank">{response.data[2]}</a></li>
    //     <li>Image URL (NFT Image on Pinata): <a href={response.data[3]} target="_blank">{response.data[3]}</a></li>
    //     </ol></>
    // } 

    const overrides = { //https://ethereum.stackexchange.com/a/93559/3506
        value: price,     // ether in this case MUST be a string
        gasLimit: ethers.utils.hexlify(500000),
    };

    try{

        let transaction
        transaction = await contract.receivePayThenMint( currentAddress, tokenURI, overrides );
        
        console.log("Mining..." + transaction.hash);
        await transaction.wait();
        console.log("Mined -- " + transaction.hash)

        return {success: true, status:<>
            <p style={{ fontSize: "1em", position: "absolute", marginTop:"1em"}}>Congratulations! Your NFT Was Successfuly Minted!</p>
                <ol style={{ fontSize: ".7em", lineHeight: "2em", marginTop: "4em" }}>
                <li>Token URI (i.e., NFT Metadata on IPFS): <a href={response.data[0]} target="_blank">{response.data[0]}</a></li>
                <li>Token URL (NFT Metadata URL on Pinata): <a href={response.data[1]} target="_blank">{response.data[1]}</a></li>
                <li>Image URI (NFT on IPFS): <a href={response.data[2]} target="_blank">{response.data[2]}</a></li>
                <li>Image URL (NFT Image on Pinata): <a href={response.data[3]} target="_blank">{response.data[3]}</a></li>
                </ol></>
                
        }

    }catch(error){

        console.log(error)
        setStatus("")
        setError(error.message)      

    }   

}



const handleGetMaxSupply = async (contract) => {
    try {
        console.log(contract)
        if (ethereum) {

           let transaction = await contract.maxSupply();
            
            console.log("Max Supply: " + transaction)
            return{success: true, status: "Max Supply: " + transaction}
            
        } else {
            console.log("Ethereum object doesn't exist!");
            setError("Ethereum object doesn't exist!");
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}

const handleGetContractBalance = async (provider, ethers, contractAddress) => {
    try {

        if (ethereum) {
        
            let transaction = await  provider.getBalance(contractAddress) 

                transaction = ethers.utils.formatEther( transaction )

            console.log("Contract Balance: " + transaction)
            return{success: true, status: "Contract Balance: " + transaction}
            
        } else {
            console.log("Ethereum object doesn't exist!");
            return{success: false, status: "Ethereum object doesn't exist!"}
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}

const handleGetTotalMinted = async (contract) => {
    try {

        if (ethereum) {   

           let transaction = await contract.getTotalSupply()
    
           console.log("Total Minted: " + transaction)
           return{success: true, status: "Total Minted: " + transaction}
            
        } else {
            console.log("Ethereum object doesn't exist!");
            setError("Ethereum object doesn't exist!");
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}

const handleWithdrawToOwner = async (event, contract, admin) => {
    try {

        if (ethereum) {

        let transaction = await contract.withdraw( event.target.value, admin)

           console.log("Mining..." + transaction.hash);
           
           await transaction.wait();

           console.log("Mined -- " + transaction.hash)

           return{success: true, status: "Succesfully Withdrew " + event.target.value + " and deposited into " +  admin}           
           //setStatus("Mining..." + transaction.hash);
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }

}

const handleSetTotalSupply = async (event, contract) => {

    const supply =  event.target.maxSupply.value

    try {

        if (ethereum) {

            let transaction = await contract.setTotalSupply(supply);
            console.log("Mining..." + transaction.hash);
           
            await transaction.wait();
            console.log("Success! Mining Complete..." + transaction.hash)
            return{success: true, status: "Succesfully Updated Maxium Token Supply To: ..." + transaction.hash}


        } else {
            console.log("Ethereum object doesn't exist!");
            return{success: false, status: "Ethereum object doesn't exist!"}
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}

const handleSetSalesPrice = async (event, contract, ethers) => {

    const newPrice =  ethers.utils.parseEther( event.target.newPrice.value )

    try {

        if (ethereum) {

            let transaction = await contract.setSalesPrice(newPrice);
            console.log("Mining..." + transaction.hash);
           
            await transaction.wait();
            console.log("Success! Mining Complete..." + transaction.hash)
            return{success: true, status: "Succesfully Updated Sales Price To: ..." + transaction.hash}


        } else {
            console.log("Ethereum object doesn't exist!");
            return{success: false, status: "Ethereum object doesn't exist!"}
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}


const handleShutDown = async (contract) => {
    try {

        if (ethereum) {

            await contract.deleteContract();
            
            console.log("Contract Deleted")
            return {success: true, status: "Contract Deleted"}
            
        } else {
            console.log("Ethereum object doesn't exist!");
            setError("Ethereum object doesn't exist!");
        }

    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}

function arrayContains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}


const showNetwork = (network) => {

    //const network = await provider.getNetwork();

    console.log ("Show Network: " , network.chainId)
    const ethLogo = 'https://smartcontract.imgix.net/icons/ethereum.svg?auto=compress%2Cformat*';
    const polygonLogo = 'https://smartcontract.imgix.net/icons/polygon.svg?auto=compress%2Cformat*';

    try{
        if (  [42,3,4,5,1,4].includes( network.chainId ) ){

            return( {success: true, status:  <span id="wallet-network-info"><img className="network-logo-sm" src={ethLogo} />{network.name}</span> })

        }else if ( [80001].includes( network.chainId ) ) {

            return{ success: true, status: <span id="wallet-network-info"><img className="network-logo-sm" src={polygonLogo} />Polygon Mumbai</span> }

        }else if ( [137].includes( network.chainId ) ) {

            return{ success: true, status: <span id="wallet-network-info"><img className="network-logo-sm" src={polygonLogo} />Polygon Mainnet</span> }

        } else{

            return{ success: true, status: `${network.name}` }
        }
        
    } catch (error) {
        console.log(error)
        return{success: false, status: error}
    }
}

//Named Exports
export { handleShutDown, handleWithdrawToOwner, handleSetTotalSupply, showNetwork, handleMintNFT}