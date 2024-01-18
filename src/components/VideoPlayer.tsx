import React, { useState, useRef, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/material';

const VideoPlayer: React.FC = ({ props }: any) => {
  const initialSkipIntro = localStorage.getItem('skipIntro') === 'true';
  const [skipIntro, setSkipIntro] = useState(initialSkipIntro);
  const { videoRef, current, setCurrent, playing, setPlaying, src } = props

  useEffect(() => {
    localStorage.setItem('skipIntro', skipIntro.toString());
  }, [skipIntro]);

  useEffect(() => {
    let video = videoRef.current
    if (skipIntro && video) {
      video.currentTime = 11;
      // 添加事件监听器，当视频播放时持续触发
      video.addEventListener('timeupdate', function () {
        let skipOutroTime = video.duration - 37;

        if (video.currentTime >= skipOutroTime) {
          // video.pause();
          setCurrent(current + 1)
        }
      });
    }

  }, [current]);

  const handleSwitchChange = () => {
    setSkipIntro((prev) => !prev);
  };

  return (
    <Box>
      <video controls width="100%"
        ref={videoRef}
        autoPlay={playing}
        onEnded={() => setCurrent(current + 1)}
        onError={() => setCurrent(0)}
        // @ts-ignore
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        src={src}
      >
        您的浏览器不支持 video 标签。
      </video>
      <FormControlLabel
        control={<Switch checked={skipIntro} onChange={handleSwitchChange} />}
        label="跳过片头"
      />
    </Box>
  );
};

export default VideoPlayer;
