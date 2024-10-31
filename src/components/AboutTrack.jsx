import { useContext } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Close from "@/svg/Close"

const AboutTrack = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()

    return (
        <section className="about-track-container">
            <div 
                className="about-track-close-container"
                onClick={() => setDemon(state => ({ ...state, page: "track'"}))}    
            >
                <Close />
            </div>
            <div className="about-track-info-container">
                <div className="about-track-text-container">
                    <p className="about-track-text">ONE is the first track of the project. The idea behind the track is about the specular nature of the self. The intertwining of expectations and projections that lead the individual to a wild self-deterministic race. The song explores the eternal dance between ego and ambition and the pressure that comes from it, in a continuous becoming, at times salvific, at times damned.</p>
                    {demon.tracksData[demon.currentTrackIndex].artists.map(artist => (
                        <p key={artist} className="about-track-text-artist">{artist}</p>
                    ))}
                </div>
                <div className="about-track-image-container">
                    <img
                        src='/images/uno_alesia/uno_alesia_cover.jpg'
                        alt='cover image for the track by UNO'
                        style={{
                            width:`{size.width < 769 ? size.width * .98 : size.width * .49}`,
                            height: `{size.width < 769 ? size.width * .98 : size.width * .49}px`
                        }}
                        
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutTrack