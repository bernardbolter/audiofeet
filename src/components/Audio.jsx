import { useContext, useRef, useState, useEffect } from 'react'
import { DemonContext } from '@/providers/DemonProvider' 
import { useWindowSize } from '@/hooks/useWindowSize'

import AudioNav from './AudioNav'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { OrbitControls, useProgress, PositionalAudio } from '@react-three/drei'

const thatSound = '/audio/UNO.mp3'

const Lyzer = ({
    track,
    desktopImage,
    desktopDis,
    mobileImage,
    mobileDis
}) => {
    const size = useWindowSize()
    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const { gl } = useThree()

    const viewport = useThree(state => state.viewport)

    // useFrame(() => {
    //     console.log('use frame tarck: ', track.currentTime)
    //     // console.log(track) 
    // })

    useEffect(() => {
        if (track) {
            console.log("in lyzer: ", track)
            // var listener = new THREE.AudioListener();
            // var audio = new THREE.Audio( listener );
            // // audio.setBuffer(track)
            // // audio.setMediaStreamSource(track)
            // var audioContext = new AudioContext()
            // const mediaStreamSource = audioContext.createMediaStreamSource(track)
            // var AudioContext = ThreeAudioContext.getContext();
            // const context = THREE.AudioContext.getContext();

            // const loader = new THREE.AudioLoader()
            // loader.load( track, function ( buffer ) {
            //     audio.setBuffer(buffer)
            // })
            // audio.setMediaElementSource( audio );
            // analyzerRef.current = new THREE.AudioAnalyser(audio)

            // varlistener = new THREE.AudioListener();
		
            // sound = new THREE.Audio(listener);
            // sound.setMediaElementSource( audioControls );
        }
    }, [track])

    // useFrame(() => {
    //     console.log(analyzerRef.current)
    //     if (analyzerRef.current) {
    //         console.log(analyzerRef.current.getAverageFrequency())
    //         // if (track.current.context.currentTime !== 0) {
    //         //     setDemon(state => ({ ...state, currentTrackTime: track.current.context.currentTime - (demon.currentTrackLength * demon.playCount)}))
    //         // }
    //         const averageFreq = analyzerRef.current.getAverageFrequency()
    //         const allFreq = analyzerRef.current.getFrequencyData()
    //         imageRef.current.material.displacementScale = -averageFreq / 4
    //     }
    // })

    return (
        <mesh
            ref={imageRef}
            scale={size.width > 768 ? [viewport.height * 1.78, viewport.height, 1] : [viewport.height * .6, viewport.height, 1.78]}
            castShadow={true}
            receiveShadow={true}
        >
            <planeGeometry args={[1, 1, 180, 180]} />
            <meshStandardMaterial
                // wireframe={material.wireframe}
                map={size.width > 768 ? desktopImage : mobileImage}
                displacementMap={size.width > 768 ? desktopDis : mobileDis}
                // displacementScale={material.displacementScale}
                // side={THREE.FrontSide}
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

const Audio = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))
    // const [audioURL, setAudioURL] = useState(new Audio('/audio/UNO.mp3'))
    const [audioURL, setAudioURL] = useState()
    console.log(audioURL)

    // const newAudio = new Audio('/audio/UNO.mp3')

    const trackRef = useRef(null)

    // var listener = new THREE.AudioListener();
    // var audio = new THREE.Audio( listener );
    // audio.setMediaStreamSource( audioURL );
    // audioAnalyser = new THREE.AudioAnalyser( audio, 128 );

    const progress = useProgress()

    // useEffect(() => setAudioURL(new Audio('/audio/UNO.mp3')), [])

    // const audioRef = useRef()
    // const auRef = useRef(new Audio('/audio/UNO.mp3'))

    // useEffect(() => {
    //     audioRef.current = new Audio('/audio/UNO.mp3');
    //     audioRef.current.onloadeddata = () => {
    //       setDuration(audioRef.current.duration);
    //     };
    //    }, []);

    useEffect(() => {
        console.log('trackRef: ', trackRef)
        if (trackRef.current) {
            console.log('track available')
            if (demon.startAudio) {
                trackRef.current.play()
            }
        }
    }, [demon.startAudio, trackRef])

    useEffect(() => {
        if (trackRef.current) {
            if (demon.trackPlaying) {
                trackRef.current.context.resume()
            } else {
                trackRef.current.context.suspend()
            }
        }
    }, [demon.trackPlaying])

    useEffect(() => {
        console.log("prog: ", progress)
        if (progress.loaded === 4 && progress.total === 4) {
            console.log("assets loaded")
            setDemon(state => ({ ...state, assetsLoaded: true }))
            setTimeout(() => {
                console.log("set audio loaded")
                setDemon(state => ({ ...state, audioLoaded: true }))
            }, [3000])
        }
    }, [progress])

    return (
        <section className="visualizer-container">
            <Canvas>
                <ambientLight intensity={2} />
                <PositionalAudio
                    autoplay={false}
                    url={audioURL}
                    ref={trackRef}
                    loop={false}
                    // onEnded={() => {
                    //     console.log('track ended')
                    //     trackRef.current.stop()
                    //     trackRef.current.play()
                    //     setDemon(state => ({ ...state, playCount: state.playCount + 1 }))
                    // }}
                />
                <Lyzer
                    track={trackRef} 
                    desktopImage={desktopImage}
                    desktopDis={desktopDis}
                    mobileImage={mobileImage}
                    mobileDis={mobileDis}    
                />

                <OrbitControls 

                />
            </Canvas>
            <AudioNav 
                trackRef={trackRef}
            />
            {/* <audio
                controls
                ref={(el => setAudioURL(el))}
                src="/audio/UNO.mp3">
            </audio> */}
        </section>
    )
}

export default Audio