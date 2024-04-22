import React, { useContext, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import { DbContext } from '@/App';
import { findVideoByIndex } from '@/utils/dbUtil';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string
  title?: string
  index?: number
  nextVideo?: () => void
}
interface PlayerConfig {
  speed: number;
  skipIntro: boolean;
  quality: string;
  consecutive: boolean;
}
interface PlayStat {
  [key: string]: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, src, title, index, nextVideo }) => {
  const dbContext = useContext(DbContext);
  const [config, setConfig] = useLocalStorageState<PlayerConfig>('player-settings', { defaultValue: { speed: 1, skipIntro: false, quality: 'mp4&width=480', consecutive: true } });
  const [playstat, setPlaystat] = useLocalStorageState<PlayStat>('playstat');
  const [searchParams, _] = useSearchParams()
  const queryParam = searchParams.get('query') || ''

  const playNextVideo = async () => {
    if (index !== undefined && config.consecutive && dbContext) {
      let nextNo = findVideoByIndex(await dbContext?.fetchTitles(), index + 1).pop()?.no

      location.replace(`/video/${btoa('=' + nextNo)}`)
    }
  }

  useEffect(() => {
    let video = videoRef?.current
    let videoNo = src?.slice(0, 5)
    if (video && config.speed !== 1) {
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
      video.currentTime = playstat && playstat[videoNo] || start || (config.skipIntro ? 10 : 0);

      timeupdateEvent = video.addEventListener('timeupdate', function () {
        if (video) {
          const currentTime = Math.floor(video.currentTime);
          if (currentTime % 5 === 0 && currentTime >= 15) {
            setPlaystat({ ...playstat, [videoNo]: currentTime, })
          }

          if (video.duration > 0 && video.currentTime >= (stop || video.duration - (config.skipIntro ? 36 : 0))) {
            if (nextVideo) {
              nextVideo()
            } else {
              playNextVideo()
            }
          }
        }
      });
    }

    // 改变网站title
    title && (document.title = '宁路 | ' + title)
    return () => {
      video?.removeEventListener('timeupdate', timeupdateEvent)
      console.log('destory video event');
    }
  }, [src]);

  return (<>
    {src && !queryParam &&
      <Box marginTop={'6px'}>
        <video
          controls
          width="100%"
          controlsList="nodownload"
          autoPlay
          ref={videoRef}
          src={`${import.meta.env.VITE_STREAM_URL}${config.quality}&code=${src}`}
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
          <FormControlLabel
            control={<Switch size='small' checked={!config.skipIntro}
              onChange={() => setConfig({ ...config, skipIntro: !config.skipIntro })} />}
            label="片头"
          />
          {index !== undefined && <FormControlLabel
            control={<Switch size='small' checked={config.consecutive}
              onChange={() => setConfig({ ...config, consecutive: !config.consecutive })} />}
            label="连播"
          />}
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
          <FormControl sx={{ mt: .5, minWidth: 20 }}>
            <InputLabel id="quality-label">画质</InputLabel>
            <Select
              label="画质"
              labelId="quality-label"
              value={config.quality}
              size='small'
              onChange={(e: SelectChangeEvent) => {
                setConfig({ ...config, quality: e.target.value })
              }}>
              {[
                { name: '标清', value: '480' },
                { name: '高清', value: '720' },
                { name: '超清', value: '1080' },
              ].map((option, index) => (
                <MenuItem key={index} value={'mp4&width=' + option.value}>
                  {option.name}
                </MenuItem>
              ))}
              <MenuItem key={4} value='mp3'>
                音频
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box >}
  </>
  );
};

export default VideoPlayer;
