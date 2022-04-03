require('dotenv').config()
const axios = require('axios')


const processControl = async ( currentTokenID, personalMessage, contractAddress, myImage  ) =>{
            
    //1. call image generator: get timestamp,  get output file path, set tokenID, set contractAddress

    const [timestamp, outputFile] = await textOverlay( currentTokenID, contractAddress, myImage )

    //2. save image to IPFS
    const [file_IPFSHashCID, imageURL] = await pinFileToIPFS( outputFile )
    console.log( 'file IPFS URL: ' + file_IPFSHashCID )

    const imageURI = 'ipfs://' + file_IPFSHashCID
    //3. build meta data and pin JSON metadata to IPFS:  set IPFS URI, set timestamp, set uniue message, set token ID

    const metadata = {
        image: imageURI,
        name: "DAO Membership Certificate",
        description: "This is NFT represents an ownership and governance stake in a DAO. Owners who actively contribute to this DAO have claims to the DAO's assets and cashflows.",
        external_url: "http://example.com",
        attributes: [
            { "display_type": "number", "trait_type": "NFT Unique Token Id", "value": currentTokenID},
            { "display_type": "date", "trait_type": "Mint Date", "value": timestamp/1000},
            { "trait_type": "Original Owner's Personal Message", "value": personalMessage},
            { "trait_type": "Privileges", "value": "DAO Ownership, Governance, Claim to DAO Assets, Exclusive Access, Airdrops"},
            { "display_type": "number", "trait_type": "NFT Type", "value": 1},
            { "trait_type": "NFT Category", "value": "Programmable Uitlity"},
            { "trait_type": "NFT Purpose", "value": "Proof of Membership"},
            { "display_type": "boost_percentage", "trait_type": "Annual Yield Estimate", "value": 5},
        
        ]
    
    }

    //4. upload metadata to IPFS
    const [metadata_IPFSHashCID, metadataURL] = await pinMetaDataToIPFS( metadata );
    
    console.log('Token URI: ' + metadata_IPFSHashCID )
    const tokenURI = 'ipfs://' + metadata_IPFSHashCID

    return [tokenURI, metadataURL, imageURI, imageURL]

}


const textOverlay = async  ( tokenID, contractAddress, myImage="", sponsor=false ) => {

    const Jimp = require('jimp-compact');

    const maxWidth = 1000
    const timestamp = new Date().getTime();

    var text0;

    if (tokenID < 10 ){
         text0 = '#' + tokenID
    }else{
        text0 =  tokenID
    } 

    const text1 = 'Minting Contract Address:' 
    const text2 = contractAddress //process.env.MINTER_CONTRACT_ADDRESS
    const text3 = 'Token ID: #' + tokenID 
    const text4 = 'Mint Date: ' + new Date(timestamp).toUTCString()

    if ( sponsor == true){
        //TODO: Complete later
        //const text5 ='Sponsor Logo'
        //const font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
    }

    const inputFile = './../images/input.png'
    const outputFile = './../images/output-' +  timestamp + '.png'

    const image = await Jimp.read(inputFile);
 
    const font1 = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
    const font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const font3 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    image.print(font1, 135, 135, text0); 
    image.print(font1, 0, 420, {text: text1, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, maxWidth); //x = 45
    image.print(font2, 0, 495, {text: text2, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, maxWidth);
    image.print(font1, 0, 620, {text: text3, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, maxWidth);
    image.print(font3, 0, 760, {text: text4, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, maxWidth);

    if (myImage !== ''){

        //Thank you Jesus for helping me here!! 
        //https://medium.com/@Zhabskyi/upload-and-processing-images-to-aws-s3-with-node-js-using-multer-and-jimp-223227b8efcf
        let small = await Jimp.read(Buffer.from(myImage.buffer, 'base64'))
  
        await small.resize(150, 150) //https://github.com/oliver-moran/jimp/tree/master/packages/plugin-cover

        await image.composite(small, 889, 571, { mode: Jimp.BLEND_SOURCE_OVER, opacityDest: 1, opacitySource: 0.9})
        //image.print(font4, 957, 641, {text: personalMessage, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER}, 150, 150);

    }

 
    // Writing image after processing
    await image.writeAsync(outputFile);
    //console.log(outputFile)
    return [timestamp, outputFile]        


    
}



const  pinFileToIPFS = async (  mintedImagePath ) => {

	const fs = require("fs");
	const FormData = require("form-data");

	//1. Pin File to IPFS
	const stream = fs.createReadStream( mintedImagePath );
	const data = new FormData();
	data.append("file", stream);

	const fileResponse = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {

		//maxContentLength: "Infinity", new
		headers: {
			"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
			pinata_api_key: process.env.PINATA_KEY,
			pinata_secret_api_key: process.env.PINATA_SECRET,
		},
		
	});

	console.log('pinFileToIPFS Output:')
	console.log( fileResponse.data )

	const { data: fileData = {} } = fileResponse;
	const { IpfsHash } = fileData;
	const fileIPFS_url = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;

	console.log( 'File URL: ' + fileIPFS_url )
	return [IpfsHash, fileIPFS_url]
	
};

const pinMetaDataToIPFS = async (metadata ) => { //customize meta for meta: https://docs.pinata.cloud/api-pinning/pin-json

	const pinataJSONBody = {
		pinataContent: metadata 
	};

	const jsonResponse = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", pinataJSONBody, {
		//maxContentLength: "Infinity", new
		headers: {
		'Content-Type': `application/json`,
		pinata_api_key: process.env.PINATA_KEY,
		pinata_secret_api_key: process.env.PINATA_SECRET,
	},
	});

	console.log('pinMetaDataToIPFS Output:')
	console.log( jsonResponse.data )

	const { data: jsonData = {} } = jsonResponse;
	const { IpfsHash } = jsonData;
	const metadataIPFS_url = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`; //this is what minter needs

	console.log( 'Meta Data URL:' + metadataIPFS_url )
	return [IpfsHash, metadataIPFS_url]

}

module.exports = {processControl, textOverlay, pinFileToIPFS, pinMetaDataToIPFS}