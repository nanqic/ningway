import React, { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, FormControl, InputLabel, Link, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  src: string
  title?: string
  nextVideo?: () => void
  randomVideo?: () => void
}
interface PlayerConfig {
  speed: number;
  skipIntro: boolean;
  quality: string;
  mode: string;
}
interface PlayStat {
  [key: string]: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, src, title, nextVideo, randomVideo }) => {
  const [config, setConfig] = useLocalStorageState<PlayerConfig>('player-setting', { defaultValue: { speed: 1, skipIntro: false, quality: '480', mode: 'order' } });
  const [playstat, setPlaystat] = useLocalStorageState<PlayStat>('playstat');
  const [searchParams, _] = useSearchParams()
  const queryParam = searchParams.get('query') || ''



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
    // 列表播放时不跳转播放时间
    if (video) {
      let jumpTime = (location.pathname.startsWith('/video/') && playstat && playstat[videoNo]) || start
      video.currentTime = jumpTime || (config.skipIntro ? 10 : 0);

      timeupdateEvent = video.addEventListener('timeupdate', function () {
        if (video) {
          const currentTime = Math.floor(video.currentTime);
          if (currentTime % 5 === 0 && currentTime >= 15) {
            setPlaystat({ ...playstat, [videoNo]: currentTime, })
          }

          if (video.duration > 0 && video.currentTime >= (stop || video.duration - (config.skipIntro ? 36 : 0))) {
            switch (JSON.parse(localStorage.getItem('player-setting') || '{}')?.mode) {
              case 'order':
                nextVideo && nextVideo()
                break;
              case 'random':
                randomVideo && randomVideo()
                break;

              default:
                video.currentTime = config.skipIntro ? 10 : 0
                break;
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
          src={`${import.meta.env.VITE_STREAM_URL}?code=${src}&format=${config.quality === 'mp3' ? 'mp3' : 'mp4&width=' + config.quality}`}
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
          <FormControl sx={{ mt: .5, minWidth: 20 }}>
            <InputLabel id="speed-label">模式</InputLabel>
            <Select
              label="模式"
              labelId="speed-mode"
              value={config.mode}
              size='small'
              onChange={(e: SelectChangeEvent) => {
                setConfig({ ...config, mode: e.target.value })
              }}>
              {[
                { name: '顺序', value: 'order' },
                { name: '循环', value: 'loop' },
                { name: '随机', value: 'random' },
              ].map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
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
              {[1, 1.2, 1.5, 1.7, 2].map((value, index) => (
                <MenuItem key={index} value={value}>
                  {value}
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
                <MenuItem key={index} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
              <MenuItem key={4} value='mp3'>
                音频
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography fontSize={'14px'} component={'i'}>&nbsp; 提示: 画质选择音频时，可在 <Link href='/about'>后台播放</Link></Typography>
      </Box >}
  </>
  );
};

export default VideoPlayer;
