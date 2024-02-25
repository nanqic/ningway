import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, FormControl, IconButton, InputLabel, Link, MenuItem, Select } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { copyTextToClipboard } from '@/utils/clipUtil';

const VideoPlayer: React.FC = ({ props }: any) => {
  const initialSkipIntro = localStorage.getItem('skipIntro') === 'true';
  const [skipIntro, setSkipIntro] = useState(initialSkipIntro);
  const { videoRef, setCurrent, playing, setPlaying, src, title, start } = props
  const [speed, setSpeed] = useState<number>(parseFloat(localStorage.getItem('playbackRate') || '1'));
  const [copyInfo, setCopyInfo] = useState('')

  useEffect(() => {
    localStorage.setItem('skipIntro', skipIntro.toString());
  }, [skipIntro,]);

  useEffect(() => {
    let video = videoRef?.current
    start && (video.currentTime = start)

    if (speed != 1) {
      video.playbackRate = speed
    }

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
      <Box sx={{
        display: "flex",
        alignItems: "center"
      }}>
        <Box component={'span'} sx={{ mx: .5, minWidth: 20 }}>编号：
          <Link href={`/301/${src.slice(-5)}`} target="_blank">{src.slice(-5)}</Link>
        </Box>

        <FormControlLabel
          sx={{ mt: .5 }}
          control={<Switch checked={!skipIntro}
            onChange={handleSwitchChange} />}
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

        <IconButton size='small'
          sx={{
            mx: 1.5,
            justifyContent: "center",
            '&:after': {
              content: "'" + copyInfo + "'",
              color: 'blue',
              fontSize: '12px',
              mx: 2
            }
          }}
          onClick={() => {
            const { currentTime } = videoRef.current
            if (currentTime > 0) {
              copyTextToClipboard(`${location.href.split('?')[0]}?t=${Math.floor(currentTime)}# ${document.title}`)
            } else {
              copyTextToClipboard(`${location.href}# ${document.title}`)
            }
            setCopyInfo('已复制')

            setTimeout(function () {
              setCopyInfo('')
            }, 1500)
          }}
        >
          分享
          <ShareIcon />
        </IconButton>
      </Box>
    </Box >
  );
};

export default VideoPlayer;
