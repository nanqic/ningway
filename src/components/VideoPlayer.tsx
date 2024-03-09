import React, { useState, useEffect, useRef } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, FormControl, InputLabel, Link, MenuItem, Select } from '@mui/material';
import ShareButton from './ShareButton';

const VideoPlayer: React.FC = ({ props }: any) => {
  const initialSkipIntro = localStorage.getItem('skipIntro') === 'true';
  const [skipIntro, setSkipIntro] = useState(initialSkipIntro);
  const { videoRef, current, setCurrent, playing, setPlaying, src, title, start } = props
  const [speed, setSpeed] = useState<number>(parseFloat(localStorage.getItem('playbackRate') || '1'));


  useEffect(() => {
    localStorage.setItem('skipIntro', skipIntro.toString());
  }, [skipIntro,]);

  useEffect(() => {
    let video = videoRef?.current
    start && (video.currentTime = start)

    if (speed != 1) {
      video.playbackRate = speed
    }
    // 添加事件监听器，当视频播放时持续触发
    let timeupdateEvent: any
    // console.log(video.currentTime, video.duration);
    if (skipIntro) {
      video.currentTime = start || 10;
      timeupdateEvent = video.addEventListener('timeupdate', function () {
        if (video.duration > 0 && video.currentTime >= video.duration - 36) {
          setCurrent(current + 1)
        }
      });
    }

    // 添加事件监听器，当视频播放速度改变时触发
    const ratechangeEvent = video.addEventListener('ratechange', () => {
      const currentSpeed = video.playbackRate;
      setSpeed(currentSpeed)
      localStorage.setItem('playbackRate', currentSpeed.toString());
    })

    // 改变网站title
    title && (document.title = '宁路 | ' + title)

    return () => {
      video.removeEventListener('timeupdate', timeupdateEvent)
      video.removeEventListener('ratechange', ratechangeEvent)
    }
  }, [src]);


  return (
    <Box sx={{ my: .7 }}>
      <video controls width="100%"
        ref={videoRef}
        autoPlay={playing}
        onEnded={() => setCurrent && !skipIntro && setCurrent(current + 1)}
        onError={() => setCurrent && setCurrent(0)}
        // @ts-ignore
        onPlaying={() => setPlaying && setPlaying(true)}
        onPause={() => setPlaying && setPlaying(false)}
        src={src}
      >
        您的浏览器不支持 video 标签。
      </video>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        maxWidth: 440
      }}>
        <Box component={'span'} paddingRight={1}>编号：
          <Link href={`/301/${src.slice(-5)}`} target="_blank">{src.slice(-5)}</Link>
        </Box>

        <FormControlLabel
          control={<Switch checked={!skipIntro}
            onChange={() => setSkipIntro((prev) => !prev)} />}
          label="片头"
        />

        <FormControl sx={{ mt: .5, minWidth: 20 }}>
          <InputLabel id="speed-label">速度</InputLabel>
          <Select
            label="速度"
            labelId="speed-label"
            value={speed}
            size={'small'}
            onChange={e => { videoRef.current.playbackRate = e.target.value; setSpeed(+e.target.value) }}>
            {[1, 1.25, 1.5, 1.75, 2].map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}x
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ShareButton videoBase={btoa(src?.split('&code')[1])} currentTime={videoRef.current?.currentTime} />
      </Box>
    </Box >
  );
};

export default VideoPlayer;
