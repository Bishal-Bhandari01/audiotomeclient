import React, { useEffect, useRef, useState } from 'react'
import './player.css'

export default function Player({ audioElm, isplaying, setIsplaying }) {

    const [currentTime, setCurrentTime] = useState(0)

    const progressBar = useRef()
    const animationRef = useRef()

    const PlayPause = () => {
        setIsplaying(!isplaying)
        if (!isplaying) {
            audioElm.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
        else {
            audioElm.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }

    const CalculateTime = (secs) => {
        const minutes = Math.floor(secs / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

        const seconds = Math.floor(secs - minutes * 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

        return `${returnedMinutes}:${returnedSeconds}`
    }

    const PlayBtn = () => {
        return <i className='fa-solid fa-play'></i>
    }
    const Pausebtn = () => {
        return <i className='fa-solid fa-pause'></i>
    }
    const whilePlaying = () => {
        progressBar.current?.value = audioElm.current?.currentTime
        ChangeCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const ChangeCurrentTime = () => {
        setCurrentTime(progressBar.current.value)
    }

    const handleProgressChange = () => {
        audioElm.current?.currentTime = progressBar.current?.value
        // progressBar.current.value = audioElm.current.currentTime
    }

    const backward = () => {
        audioElm.current.currentTime -= 10
    }

    const forward = () => {
        audioElm.current.currentTime += 10
    }

    useEffect(() => {
        const seconds = Math.floor(audioElm?.current?.duration)
        progressBar.current.max = seconds;
        whilePlaying()
    }, [audioElm?.current?.loadedmetadata, audioElm?.current?.readyState])

    return (
        <>
            <div className='container'>
                <div className='player'>
                    <div className="audioplayer">
                        <button className='btn btn-lg btn-outline-light' onClick={backward}>
                            <i className='fa-solid fa-rotate-left fontAwesomebtn'></i>
                        </button>
                        <button className='btn btn-lg btn-outline-light' onClick={PlayPause}>
                            {isplaying ? <Pausebtn /> : <PlayBtn />}
                        </button>
                        <button className='btn btn-lg btn-outline-light' onClick={forward}>
                            <i className='fa-solid fa-rotate-right fontAwesomebtn'></i>
                        </button>
                    </div>
                    <div className="audiosettings">
                        {/* <div>{calculateTime(currentTime)}</div> */}
                        <div className="fw-bold">{CalculateTime(currentTime)}</div>
                        <input type="range" className='form-range w-100' defaultValue={0}
                            ref={progressBar}
                            onChange={handleProgressChange} />
                        <div className="fw-bold">{CalculateTime(audioElm?.current?.duration)}</div>
                    </div>

                </div>
            </div>
        </>
    )
}