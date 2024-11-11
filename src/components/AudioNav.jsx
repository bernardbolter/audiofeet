import { useContext, useEffect, useMemo, useRef } from 'react'
import { DemonContext } from '@/providers/DemonProvider'

import { useWindowSize } from '@/hooks/useWindowSize'

import Play from '@/svg/Play'
import Stop from '@/svg/Stop'
import Pause from '@/svg/Pause'
import PlayHead from '@/svg/PlayHead'

const AudioNav = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const progressRef = useRef(null)
    // console.log(demon.currentTrackTime)
    const playheadX = useMemo(() => {
        // console.log(demon.currentTrackTime)
        // console.log(demon.currentTrackLength)
        // console.log((demon.currentTrackTime / demon.currentTrackLength) * (size.width - 20))
        if (demon.currentTrackLength === 0 || demon.currentTrackTime === 0) {
            return 0
        } else {
            return (demon.currentTrackTime / demon.currentTrackLength) * (size.width - 20)
        }
    }, [demon.currentTrackTime, demon.currentTrackLength])

    useEffect(() => {
        // console.log("in audionav: ", demon.currentTrackTime, demon.currentTrackLength)
        // console.log("audionav 2: ", demon)
    }, [demon.currentTrackTime, demon.currentTrackLength])

    const handleProgressChange = e => {
        console.log(progressRef.current?.value)
    }

    const handleDrag = () => {
        console.log('draging')
    }

    const handleDrop = () => {
        console.log("droppin")
    }

    return (
        <section className="audio-nav-container">
            <p 
                className="audio-nav-title"
                onClick={() => {
                        if (demon.page === 'track') {
                          setDemon(state => ({ ...state, page: 'home' }))
                        } else {
                          setDemon(state => ({ ...state, page: 'track' }))
                        }
                }}    
            >UNO – DEMON WAV</p>
            <div className="audio-nav-progress">
                {/* <div
                    className="audio-nav-progress-playhead-begining"
                    style={{
                        width: `${playheadX}px`
                    }}
                />
                <div 
                    className="audio-nav-progress-playhead-container"
                    style={{
                        transform: `translateX(${playheadX}px)`
                    }}
                    onClick={() => console.log("clicked playhead")}
                    draggable
                    onDragOver={(ev) => {
                        ev.preventDefault()
                        console.log(ev)
                    }}
                    onDrop={handleDrop}
                    onDragStart={handleDrag}  
                >
                    <PlayHead />
                </div>
                <div className="audio-nav-progress-line" /> */}
                <input
                    className="audio-nav-progress-input"
                    ref={progressRef}
                    type="range"
                    defaultValue="0"
                    step={0.001}
                    min={0}
                    max={demon.currentTrackLength}
                    value={demon.currentTrackTime}
                    onChange={handleProgressChange}
                />
            </div>
            <div className="audio-nav-svg-container">
                {demon.audioLoaded && (
                    <>
                        {demon.trackPlaying ? (
                            <div
                                className="audio-nav-svg svg-pause"
                                onClick={() => setDemon(state => ({ ...state, trackPlaying: !state.trackPlaying}))}
                            >
                                <Pause />
                            </div>
                        ) : (
                            <div
                                className="audio-nav-svg "
                                onClick={() => setDemon(state => ({ 
                                    ...state, 
                                    trackPlaying: !state.trackPlaying,
                                    startAudio: true
                                }))}
                            >
                                <Play />
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}

export default AudioNav