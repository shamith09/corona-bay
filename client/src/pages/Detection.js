import React, { useState } from "react"

import FileUpload from "../components/FileUpload";

const Detection = () => {

    const [detection, setDetection] = useState();

    return (
        <div>
            <h1>Detection page</h1>
            <div className="container">
                <FileUpload setStatus={setDetection} />
                <h1></h1>
            </div>
        </div>
    )
}

export default Detection;