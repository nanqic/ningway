import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, MenuItem, Select } from '@mui/material';

const VideoPlayer: React.FC = ({ props }: any) => {
  const initialSkipIntro = localStorage.getItem('skipIntro') === 'true';
  const [skipIntro, setSkipIntro] = useState(initialSkipIntro);
  const { videoRef, setCurrent, playing, setPlaying, src, title, start } = props
  const [speed, setSpeed] = useState<number>(parseFloat(localStorage.getItem('playbackRate') || '1'));

  useEffect(() => {
    localStorage.setItem('skipIntro', skipIntro.toString());
  }, [skipIntro,]);


  useEffect(() => {
    let video = videoRef?.current
    start && (video.currentTime = start)

    if (skipIntro) {
      video.currentTime = start || 10;
      // 添加事件监听器，当视频播放时持续触发
      setCurrent && video.addEventListener('timeupdate', function () {
        if (video.duration > 0 && video.currentTime >= video.duration - 36) {
          setCurrent((current: number) => current + 1)
        }
      });
    }

    // 添加事件监听器，当视频播放速度改变时触发
    video.addEventListener('ratechange', () => {
      const currentSpeed = video.playbackRate;
      setSpeed(currentSpeed)
      localStorage.setItem('playbackRate', currentSpeed.toString());
    })

    // 改变网站title
    title && (document.title = '宁路 | ' + title)
  }, [src]);

  const handleSwitchChange = () => {
    setSkipIntro((prev) => !prev);
  };

  return (
    <Box sx={{ my: .7 }}>
      <video controls width="100%"
        ref={videoRef}
        autoPlay={playing}
        onEnded={() => setCurrent && setCurrent((current: number) => current + 1)}
        onError={() => setCurrent && setCurrent(0)}
        // @ts-ignore
        onPlaying={() => setPlaying && setPlaying(true)}
        onPause={() => setPlaying && setPlaying(false)}
        src={src}
      >
        您的浏览器不支持 video 标签。
      </video>
      <FormControlLabel
        control={<Switch checked={skipIntro} onChange={handleSwitchChange} />}
        label="跳过片头"
      />
      <Select
        value={speed}
        size={'small'}
        onChange={e => { videoRef.current.playbackRate = e.target.value; setSpeed(+e.target.value) }}>
        {[1, 1.25, 1.5, 1.75, 2].map((value, index) => (
          <MenuItem key={index} value={value}>
            {value}x
          </MenuItem>
        ))}
      </Select>
      <Box component={'span'} marginLeft={1.5}>倍速</Box>
    </Box >
  );
};

export default VideoPlayer;
