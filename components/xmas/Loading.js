export default function Loading() {

    return (

        <>
            <div style={{minHeight: "100%", maxHeight: "100vh", height:"100%", width: "100%", display: "flex", flexDirection: "column", justifyContent:"center"}}>
                <svg style={{
                    margin: "auto",
                    // background: "rgb(241, 242, 243)",
                    display: "block",
                    shapeRendering: "auto",
                    width: "100px",
                    height: "100px", // Updated to use "vw" unit
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    viewBox: "0 0 100 100",
                    preserveAspectRatio: "xMidYMid"
                }}>
                    <path
                        fill="none"
                        stroke="#0a0a0a"
                        strokeWidth="10" // Updated to use "vw" unit
                        stroke-dasharray="182.17813903808593 74.41078918457032"
                        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
                        strokeLinecap="round" // Updated to use camelCase
                        style={{
                            transform: "scale(0.8)",
                            transformOrigin: "5vw 5vw",
                            width: "100%",
                            position: "relative",
                            left: "30%"
                        }}>
                        <animate
                            attributeName="stroke-dashoffset"
                            repeatCount="indefinite"
                            dur="2.127659574468085s"
                            keyTimes="0;1"
                            values="0;256.58892822265625">

                        </animate>
                    </path>
                </svg>
            </div>
        </>
    )
}
