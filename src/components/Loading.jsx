
"use client"

import { SpinnerCircularFixed } from 'spinners-react';

const Loading = ({ text }) => {
    return (
        <section
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#2E2E2E',
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 4001

            }}
        >
            {/* <h1
                style={{
                    fontWeight: 300,
                    fontSize: "14px",
                    color: "#eeeeee",
                    marginBottom: '20px'
                }}
            >Loading</h1> */}
            <SpinnerCircularFixed 
                color="#eeeeee"
                secondaryColor="#999999"
            />
        </section>
    )
}

export default Loading