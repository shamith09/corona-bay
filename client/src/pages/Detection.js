import React, { useState } from "react"

import FileUpload from "../components/FileUpload";

const Detection = () => {

    const [status, setStatus] = useState("");

    return (
        <div>
            <h1>Detection page</h1>
            <div className="container">
                <FileUpload setStatus={setStatus} />
                <h1>{status}</h1>
            </div>
        </div>
    )
}

export default Detection;