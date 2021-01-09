import React from "react";
import Loader from "react-loader-spinner";

export default function Loading(props) {

    return (
        <div style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                border: "solid 0.3em black",
                borderRadius: "1em",
                backgroundColor: "white",
                color: "black",
                padding: "3em",
                minWidth: "20vw",
                alignItems: "center",
            }}>
                <p>{props.message}</p>
                <Loader type="TailSpin" color="#000000" height={80} width={80} />
            </div>
        </div>
    )
}
