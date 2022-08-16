import React from 'react'
import CircleLoader from "react-spinners/CircleLoader";
import "./LoadingSpinner.css"


function LoadingSpinner() {
    return (<div className="LoadingSpinner">
        <CircleLoader
            size='120px'
            speedMultiplier="1"
        />
    </div>
    )
}

export default LoadingSpinner