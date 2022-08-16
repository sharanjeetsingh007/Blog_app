import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from "jodit-react";
import "./JodiText.css"


const JodiText = ({ setValue, valueIs }) => {
    const editor = useRef(null)

    return (
        <JoditEditor
            ref={editor}
            value={valueIs}
            tabIndex={1} // tabIndex of textarea
            onChange={newContent => setValue(newContent)}
        />
    );
}

export default JodiText