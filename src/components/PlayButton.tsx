import { Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import React, { useEffect, useState } from 'react';

interface PlayButtonProps {
    videoRef: React.RefObject<HTMLVideoElement>;
    btnIndex: number
    currentPlay: number | undefined
}

const PlayButton: React.FC<PlayButtonProps> = ({ videoRef, btnIndex, currentPlay }) => {
    const [play, setPlay] = useState(currentPlay === btnIndex)
    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setPlay(true)
            } else {
                videoRef.current.pause();
                setPlay(false)
            }
        }
    };

    const handleChange = () => setPlay(value => !value)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('pause', handleChange);
            videoRef.current.addEventListener('play', handleChange);
        }

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('pause', handleChange);
                videoRef.current.removeEventListener('play', handleChange);
            }
        };
    }, [])


    return (

        <Button onClick={togglePlay} title='从当前开始播放' >
            {!play && currentPlay === btnIndex ?
                <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />
            }

        </Button>
    );
};

export default PlayButton;
