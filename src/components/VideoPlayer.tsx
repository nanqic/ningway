import React, { useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, SelectChangeEvent, } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import SmallFormControl from './SmallFormControl';

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

export interface PlayStat {
  no: string;
  start: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoRef, src, title, nextVideo, randomVideo }) => {
  const [config, setConfig] = useLocalStorageState<PlayerConfig>('player-setting', { defaultValue: { speed: 1, skipIntro: false, quality: '480', mode: 'order' } });
  const [playstat, setPlaystat] = useLocalStorageState<PlayStat[]>('play_history', { defaultValue: [] });
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
      let jumpTime = (location.pathname.startsWith('/video/') && playstat && playstat.find(x => x.no === videoNo)?.start) || start
      video.currentTime = jumpTime || (config.skipIntro ? 10 : 0);

      timeupdateEvent = video.addEventListener('timeupdate', function () {
        if (video) {
          const currentTime = Math.floor(video.currentTime);
          if (currentTime % 5 === 0 && currentTime >= 15) {
            setPlaystat([{ no: videoNo, start: currentTime }, ...playstat.filter(x => x.no != videoNo)])
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

  }, [src, config.quality]);

  const speedOnChange = (e: SelectChangeEvent) => {
    if (videoRef.current) videoRef.current.playbackRate = parseFloat(e.target.value)
    setConfig({ ...config, speed: +e.target.value })
  }

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
          <SmallFormControl label='模式' selectedValue={config.mode + ''} onChange={(e: SelectChangeEvent) => {
            setConfig({ ...config, mode: e.target.value })
          }} options={[
            { name: '顺序', value: 'order' },
            { name: '循环', value: 'loop' },
            { name: '随机', value: 'random' },
          ]} />
          <SmallFormControl label='速度' selectedValue={config.speed + ''} onChange={speedOnChange} options={[
            { value: '0.8' }, { value: '1' }, { value: '1.2' }, { value: '1.5' }, { value: '1.7' }, { value: '2' }, { value: '2.5' }, { value: '3' }
          ]} />
          <SmallFormControl label='画质' selectedValue={config.quality} onChange={(e: SelectChangeEvent) => {
            setConfig({ ...config, quality: e.target.value })
          }} options={[
            { name: '仅声音', value: 'mp3' },
            { name: '标清', value: '480' },
            { name: '高清', value: '720' },
            { name: '超清', value: '1080' },
          ]} />
        </Box>
      </Box >}
  </>
  );
};

export default VideoPlayer;
