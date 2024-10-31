"use client"

import { useContext, Suspense, useRef, useState, useEffect, useMemo } from "react"
import { DemonContext } from "@/providers/DemonProvider"
import { useWindowSize } from "@/hooks/useWindowSize"

import Loading from "./Loading"
import AudioNav from "./AudioNav"

import * as THREE from 'three'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useControls } from "leva"
import { TextureLoader } from "three"
import { Stats, OrbitControls, PositionalAudio, useTexture, useProgress } from "@react-three/drei"

// useTexture.preload('/images/uno_alesia/uno_alesia_desktop.jpg')

const Analyzer = ({
    track,
    desktopImage,
    desktopDis,
    mobileImage,
    mobileDis
}) => {
    const [demon, setDemon] = useContext(DemonContext)
    const size = useWindowSize()
    const imageRef = useRef(null)
    const analyzerRef = useRef(null)
    const { gl } = useThree()

    const viewport = useThree(state => state.viewport)

    // load track into audio anylyser reference when track is changed
    useEffect(() => {
        if (track.current) {
            analyzerRef.current = new THREE.AudioAnalyser(track.current)
        }
    }, [track.current])

    // for testing in leva
    // const material = useControls({
    //     wireframe: false,
    //     displacementScale: { value: 0.5, min: 0, max: 5.0, step: 0.01 }
    // })

    // adds to the image
    useEffect(() => {
        desktopImage.anisotropy = gl.capabilities.getMaxAnisotropy()
    }, [gl, desktopImage])

    // animate the displacement of image based on track analyzer, and send current track time to audio nav
    useFrame(() => {
        if (analyzerRef.current) {
            if (track.current.context.currentTime !== 0) {
                setDemon(state => ({ ...state, currentTrackTime: track.current.context.currentTime - (demon.currentTrackLength * demon.playCount)}))
            }
            const averageFreq = analyzerRef.current.getAverageFrequency()
            const allFreq = analyzerRef.current.getFrequencyData()
            imageRef.current.material.displacementScale = averageFreq / 4
        }
    })

    return (
        <mesh
            ref={imageRef}
            scale={[viewport.height * 1.78, viewport.height, 1]}
            castShadow={true}
            receiveShadow={true}
        >
            <planeGeometry args={[1, 1, 180, 180]} />
            <meshStandardMaterial
                // wireframe={material.wireframe}
                map={size.width > 769 ? desktopImage : mobileImage}
                displacementMap={size.width > 769 ? desktopDis : mobileDis}
                // displacementScale={material.displacementScale}
            />
        </mesh>
    )
}

const PlayTrack = ({
    desktopImage,
    desktopDis,
    mobileImage,
    mobileDis,
    audioURL
}) => {
    const [demon, setDemon] = useContext(DemonContext)
    const trackRef = useRef(null)

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
        if (trackRef.current) {
            console.log("trackRef: ", trackRef.current.buffer.duration)
            console.log("trackRef all: ", trackRef.current)
            setDemon(state => ({ ...state, currentTrackLength: trackRef.current.buffer.duration }))
            if (demon.playCount > 0) {
                setDemon(state => ({ ...state, playCount: 0 }))
            }
        }
    }, [trackRef.current])

    return (
        <Suspense fallback={null}>
            <PositionalAudio
                autoplay={false}
                url={audioURL}
                ref={trackRef}
                loop={false}
                onEnded={() => {
                    console.log('track ended')
                    trackRef.current.stop()
                    trackRef.current.play()
                    setDemon(state => ({ ...state, playCount: state.playCount + 1 }))
                }}
            />
            <Analyzer 
                track={trackRef} 
                desktopImage={desktopImage}
                desktopDis={desktopDis}
                mobileImage={mobileImage}
                mobileDis={mobileDis}    
            />
        </Suspense>
    )
}

const Visualizer = () => {
    const [demon, setDemon] = useContext(DemonContext)
    const [desktopImage, setDesktopImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_desktop.jpg'))
    const [desktopDis, setDesktopDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_desktop.jpg'))
    const [mobileImage, setMobileImage] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_mobile.jpg'))
    const [mobileDis, setMobileDis] = useState(useLoader(TextureLoader, '/images/uno_alesia/uno_alesia_dis_mobile.jpg'))
    const [audioURL, setAudioURL] = useState('/audio/uno_alesia.wav')

    // useEffect(() => {
    //     console.log("index: ", demon.currentTrackIndex)
    //     console.log("tracks array: ", demon.tracksData)
    //     if (demon.tracksData.length !== 0) {
    //         // const getDesktopImage = useLoader(TextureLoader, `/images/${demon.tracksData[demon.currentTrackIndex].slug}/${demon.tracksData[demon.currentTrackIndex].slug}_desktop.jpg`)
    //         // console.log("G D image: ", getDesktopImage)
    //         // setDesktopImage(useLoader(TextureLoader, `/images/${demon.tracksData[demon.currentTrackIndex].slug}/${demon.tracksData[demon.currentTrackIndex].slug}_desktop.jpg`))
    //     }
    // }, [demon.tracksData, demon.currentTrackIndex])

    // const manager = new THREE.LoadingManager()
    // manager.onLoad = function ( ) { console.log( 'Loading complete!'); };

    const progress = useProgress()

    useEffect(() => {
        console.log("prog: ", progress)
        if (progress.loaded === 5 && progress.total === 5) {
            console.log("assets loaded")
            setDemon(state => ({ ...state, assetsLoaded: true }))
        }
    }, [progress])

    return (
        <section className="visualizer-container">
            <Canvas
                onCreated={() => {
                    console.log("canvas created")
                    setDemon(state => ({ ...state, canvasLoaded: true }))
                }}
            >
                <Suspense fallback={<Loading text="loading Visualizer" />}>
                    <ambientLight intensity={2} />
                    <PlayTrack 
                        desktopImage={desktopImage}
                        desktopDis={desktopDis}
                        mobileImage={mobileImage}
                        mobileDis={mobileDis}
                        audioURL={audioURL}
                    />
                    <OrbitControls />
                </Suspense>
            </Canvas>
            <AudioNav />
        </section>
    )
}

export default Visualizer