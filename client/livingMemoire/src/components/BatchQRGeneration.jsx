import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function BatchQRGeneration() {
    const [qrDataArray, setQrDataArray] = useState([]); 
    const [numberOfCodes, setNumberOfCodes] = useState(0);

    const generateQrCodes = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/batchGenerateQrCodes?numberOfCodes=${numberOfCodes}`);
            const qrCodesData = response.data;
            console.log('Generated QR Codes:', qrCodesData);
            // Handle the generated QR codes data as needed
            setQrDataArray(qrCodesData); // For example, you might want to update state with the generated QR codes data
        } catch (error) {
            console.error('Error generating QR Codes:', error.message);
            // Handle the error
        }
    };

    const handleNumberOfCodesChange = (event) => {
        const newValue = parseInt(event.target.value);
        setNumberOfCodes(newValue);
        console.log("Number of codes = ", numberOfCodes)
    };

    return (
        <div>
            <h1>PDF Batch QR Code Generation</h1>
            <input type="number" id="numberOfCodes" min={0} name="numberOfCodes" value={numberOfCodes} onChange={handleNumberOfCodesChange}/>
            <button onClick={generateQrCodes}>Batch Generate QR Codes</button>
        </div>
    );
}

export default BatchQRGeneration;
