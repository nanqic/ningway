import React, { useState, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, FormControl, InputLabel, Link, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ShareButton from './ShareButton';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  current?: number
  setCurrent?: React.Dispatch<React.SetStateAction<number | undefined>>
  src: string
  title: string
}
interface PlayerConfig {
  speed: number;
  skipIntro: boolean;
}
const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, current, setCurrent, src, title }) => {
  const [config, setConfig] = useLocalStorageState<PlayerConfig>('PlayerConfig', { defaultValue: { speed: 1, skipIntro: false } });
  const [searchParams, _] = useSearchParams()
  const queryParam = searchParams.get('query') || ''

  useEffect(() => {
    let video = videoRef?.current

    if (video && config.speed != 1) {
      video.playbackRate = config.speed
    }

    let start, stop: number
    if (video && src.includes('#t')) {
      let time = src.split('#t=')[1]
      start = parseInt(time.split(',')[0]) || 0
      stop = parseInt(time.split(',')[1]) || video.duration
    }
    // 添加事件监听器，当视频播放时持续触发
    let timeupdateEvent: any
    if (video) {
      video.currentTime = start || config.skipIntro ? 10 : 0;
      timeupdateEvent = video.addEventListener('timeupdate', function () {
        if (video)
          if (video.duration > 0 && video.currentTime >= (stop || video.duration - 36)) {
            setCurrent && setCurrent(current || 0 + 1)
          }
      });
    }

    // 添加事件监听器，当视频播放速度改变时触发
    const ratechangeEvent: any = video?.addEventListener('ratechange', () => {
      const currentSpeed = video?.playbackRate || 1;
      setConfig({ ...config, speed: currentSpeed })
      localStorage.setItem('playbackRate', currentSpeed.toString());
    })

    // 改变网站title
    title && (document.title = '宁路 | ' + title)

    return () => {
      video?.removeEventListener('timeupdate', timeupdateEvent)
      video?.removeEventListener('ratechange', ratechangeEvent)
    }
  }, [src]);
  const noIndex = src?.lastIndexOf('/') + 1

  return (<>
    {src && !queryParam &&
      <Box marginY={'6px'}>
        <video controls width="100%"
          autoPlay
          ref={videoRef}
          onEnded={() => setCurrent && setCurrent(current || 0 + 1)}
          src={`${import.meta.env.VITE_STREAM_URL}${src}`}
        >
          您的浏览器不支持 HTML5 视频。
        </video>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          maxWidth: 440
        }}>
          <Box component={'span'} paddingRight={1}>编号：
            <Link href={`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${src.slice(noIndex).replace('#t', '&start')}`} target="_blank">{src.slice(noIndex, noIndex + 5)}</Link>
          </Box>

          <FormControlLabel
            control={<Switch size='small' checked={!config.skipIntro}
              onChange={() => setConfig({ ...config, skipIntro: !config.skipIntro })} />}
            label="片头"
          />

          <FormControl sx={{ mt: .5, minWidth: 20 }}>
            <InputLabel id="speed-label">速度</InputLabel>
            <Select
              label="速度"
              labelId="speed-label"
              value={config.speed + ''}
              size='small'
              onChange={(e: SelectChangeEvent) => {
                if (videoRef.current) videoRef.current.playbackRate = parseFloat(e.target.value)
                setConfig({ ...config, speed: +e.target.value })
              }}>
              {[1, 1.25, 1.5, 1.75, 2].map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}x
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ShareButton videoRef={videoRef} />
        </Box>
      </Box >}
  </>
  );
};

export default VideoPlayer;
