import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"

import Close from "@/svg/Close"

const AboutWAV = () => {
    const [demon, setDemon] = useContext(DemonContext)

    return (
        <section className="about-wav-container">
            <div
                className="about-wav-close-container"
                onClick={() => setDemon(state => ({ ...state, page: 'home'}))}
            >
                <Close />
            </div>
            <div className="about-wav-content-container">
                <div className="about-wav-demon-container">

                </div>
                <div className="about-wav-product-container">
                    
                </div>
            </div>
            <h1>ABOUT WAV</h1>
        </section>
    )
}

export default AboutWAV