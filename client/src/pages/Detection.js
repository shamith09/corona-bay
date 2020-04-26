import React, { useState } from "react"

import FileUpload from "../components/FileUpload";

const Detection = () => {

    return (
        <div>
            <div className="container">
                <h1 style={{margin: "5%", color: "#D3D3D3"}}>To detect coronavirus, please upload a CT scan.</h1>
                <FileUpload />
            </div>
        </div>
    )
}

export default Detection;