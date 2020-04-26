import React, { useState } from "react"

import FileUpload from "../components/FileUpload";

const Detection = () => {

    const [status, setStatus] = useState("");

    const getStatus = () => {
        if(status === 1) return "The CT scan was positive";
        else if(status === 0) return "The CT scan was negative";
        else if(status === "") return ""
        else return "An error has occurced" 
    }

    return (
        <div>
            <h1>Detection page</h1>
            <div className="container">
                <FileUpload setStatus={setStatus} />
                <h1>{status}</h1>
                <h1>{getStatus(status)}</h1>
            </div>
        </div>
    )
}

export default Detection;