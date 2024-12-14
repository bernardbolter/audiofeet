import { useState, useRef } from 'react'
import { Canvas } from "@react-three/fiber"
import { Box, OrbitControls } from "@react-three/drei"
import { AudioAnalyzer } from '@/hooks/audioAnylizer'
import TestVis from '@/components/TestVis'
import { useFrame } from "@react-three/fiber"

const TestAn = () => {
    const [analyzer, setAnalyzer] = useState(null)
    const [audioUrl, setAudioUrl] = useState(null)
    const audioElmRef = useRef(null)

    const onFileChange = e => {
        const file = e.target.files?.[0]
        if (!file) return
        setAudioUrl(URL.createObjectURL(file))
        var ctx = new AudioContext()
        console.log(ctx)
        var analyzerNode = ctx.createAnalyser()
        console.log(analyzerNode)
        var sourceNode = ctx.createMediaElementSource(audioElmRef.current)
        console.log(sourceNode)
        sourceNode.connect(analyzerNode)
        sourceNode.connect(ctx.destination)
        // setAnalyzer(new AudioAnalyzer(audioElmRef.current))
        setAnalyzer(ctx)
    }

    console.log(audioElmRef, analyzer)

    // useFrame(() => {
    //     if (!analyzer) return;
    //     console.log(analyzer)
    // })

    return (
        <div>
            <Canvas
                style={{
                    width: "100vw",
                    height: "calc(100vh - 80px",
                    backgroundColor: "black"
                }}
            >
                <OrbitControls />
                <Box>
                    <meshBasicMaterial color="yellow" />
                    {analyzer && <TestVis analyzer={analyzer} lineWidth={0.08} />}
                </Box>
            </Canvas>
            <div
                style={{
                height: 80,
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                }}
            >
                <input type="file" accept="audio/*" onChange={onFileChange} />
                <audio src={audioUrl ?? ""} controls ref={audioElmRef} />
            </div>
        </div>
    )
}

export default TestAn