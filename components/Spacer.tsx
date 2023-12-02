import React from "react"

//hopefully this will upload now

export default function Spacer({height="40px"}) {
    return (
        <>
            <div style={{ height: height, fill: "black", zIndex: 1}} />
        </>
    )
}
