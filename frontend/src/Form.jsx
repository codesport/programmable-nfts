import React, { useState } from "react";


const Form =   ( {callback}, contractMeta ) =>{

    const [image, setImage] = useState({ preview: '', data: '' })
    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    
    
    console.log( contractMeta)
    return(
        
        <div className="center">
            <form id="buyNFT" onSubmit={() => callback(event, image.data)}>
            <fieldset>
                <legend>DAO NFT Minter!</legend>

                <p>{}</p>
                <label>You May Optionally Add a Personal Message (NB: Will not Appear on NFT):</label>
                <input className="main"
                    type='text'
                    name='message'

                    size='30'
                    form="buyNFT"
                />
                <p> </p>
                <label> (Optional) Include a PPF or any Image on your NFT (dimensions will be reduced to 150x150):</label>    
                <br /><br />
                <input 
                    // className="adminButtonGreen"
                    type="file" 
                    name="image" 
                    id="fileInput" 
                    onChange={handleFileChange}
    
                />
                <hr />
                {image.preview && <img src={image.preview} width='150' height='150' />}
                    
                </fieldset>
                <div className="enterRaffleButton">
                    <button type='submit' className="kviMVi " id="enterRaffle" form="buyNFT">Mint My NFT</button>            
                </div>
            </form>
            
        </div>


    )  

}


const MaxSupplyForm = ({callback}) =>{

    return(
        <form id="updateSupply" onSubmit={callback}>
            <button className="adminButton kviMVi" form="updateSupply">Update Max Supply</button>
            <input type="number" name="maxSupply" min="5" form="updateSupply" className="totalSupply" placeholder="enter new supply" required/>
        </form>
    )

}

const SalesPriceForm = ({callback}) =>{

    return(
        <form id="updateSupply" onSubmit={callback}>
            <button className="adminButton kviMVi" form="updatePrice">Update Sales Price</button>
            <input type="number" name="newPrice" min="5" form="updatePrice" className="totalSupply" placeholder="enter new price" required/>
        </form>
    )

}

    //Named Exports
export { Form, MaxSupplyForm, SalesPriceForm }