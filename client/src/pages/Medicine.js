import React, { useState } from 'react';
import '../style/Medicine.css';

const Medicine = () => {
    const [isGenericPreferred, setIsGenericPreferred] = useState(false); // Default to "All Medicines"
    const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);
    const [fileError, setFileError] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [error, setError] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false); // Tracks if order is successfully placed

    const handleTileClick = (preference) => {
        setIsGenericPreferred(preference === "generic");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (
                fileType === "image/jpeg" ||
                fileType === "image/jpg" ||
                fileType === "application/pdf"
            ) {
                setPrescriptionUploaded(true);
                setFileError("");
            } else {
                setPrescriptionUploaded(false);
                setFileError("Only .jpg, .jpeg, or .pdf files are allowed.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!prescriptionUploaded) {
            setError("Please upload a valid prescription to place the order.");
            setOrderPlaced(false);
            return;
        }

        if (!mobileNumber) {
            setError("Please enter your mobile number.");
            setOrderPlaced(false);
            return;
        }


        setError("");
        setOrderPlaced(true);
    };

    return (
        <div className="medicine-container">
            <h2>Order Your Medicine</h2>
            <form onSubmit={handleSubmit}>
                {/* Upload Prescription */}
                <div className="form-group">
                    <label htmlFor="prescription">Upload Prescription:</label>
                    <input
                        type="file"
                        id="prescription"
                        className="file-input"
                        onChange={handleFileUpload}
                    />
                    {/* File Type Error */}
                    {fileError && <div className="error">{fileError}</div>}
                </div>

                {/* Tiles */}
                <div className="medicine-tiles">
                    <div
                        className={`medicine-tile ${!isGenericPreferred ? "active" : ""}`}
                        onClick={() => handleTileClick("all")}
                    >
                        <div className="discount-ribbon">Flat 15% Off</div>
                        Prescribed Medicines Only
                    </div>
                    <div
                        className={`medicine-tile ${isGenericPreferred ? "active" : ""}`}
                        onClick={() => handleTileClick("generic")}
                    >
                        <div className="discount-ribbon">Upto 80% Off</div>
                        Generic Medicines

                    </div>
                </div>


                {/* Display Selected Preference */}
                <div className="selection-message">
                    → You have selected{" "}
                    <strong>{isGenericPreferred ? "Generic Medicines" : "Prescribed Medicines Only"}</strong>.
                </div>

                {/* Horizontal Ruler */}
                <hr />

                {/* Mobile Number */}
                <div className="form-group">
                    <label htmlFor="mobileNumber">Enter Mobile Number:</label>
                    <input
                        type="tel"
                        id="mobileNumber"
                        className="mobile-input"
                        placeholder="Enter your mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </div>

                {/* Display Order Success Message */}
                {orderPlaced && (
                    <div className="success-message">
                        Order placed successfully! We will contact you shortly.
                    </div>
                )}

                {/* Display Error */}
                {error && <div className="error">{error}</div>}

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    Submit Order
                </button>
            </form>
        </div>
    );
};

export default Medicine;
