import React, { useContext, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, SelectChangeEvent, } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';
import SmallFormControl from './SmallFormControl';
import { usePlayerStore, useVideoStore } from '@/store/Index';
import PlayerControl from './PlayerControl';
import { findVideoByIndex } from '@/utils/dbUtil';
import { getRandomNum } from '@/utils/randomUtil';
import { DbContext } from '@/App';

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

const VideoPlayer: React.FC = () => {
  const dbContext = useContext(DbContext);
  if (!dbContext) return <>数据加载失败！</>;
  const [config, setConfig] = useLocalStorageState<PlayerConfig>('player-setting', { defaultValue: { speed: 1, skipIntro: false, quality: '480', mode: 'order' } });
  const [playstat, setPlaystat] = useLocalStorageState<PlayStat[]>('play_history', { defaultValue: [] });
  const [searchParams, _] = useSearchParams()
  const queryParam = searchParams.get('query') || ''
  const showMenu = useVideoStore(state => state.showMenu)
  const setPaused = useVideoStore(state => state.setPaused)
  const videoRef = usePlayerStore(state => state.videoRef)
  const listNextVideo = useVideoStore(state => state.nextVideo)
  const listRandomVideo = useVideoStore(state => state.randomVideo)
  const videoIndex = useVideoStore(state => state.videoIndex)
  const playlist = useVideoStore(state => state.playlist)
  let videoInfo = playlist[videoIndex]
  let start = parseInt(searchParams.get('t') || location.hash.slice(3))

  const navigate = useNavigate()
  const nextVideo = async () => {
    let video = findVideoByIndex(await dbContext?.fetchTitles(), 2)
    navigate(`/video`, { state: video })
  }
  const randomVideo = async () => {
    let video = findVideoByIndex(await dbContext?.fetchTitles(), getRandomNum(9206))
    navigate(`/video`, { state: video })
  }

  useEffect(() => {
    let video = videoRef?.current

    if (video && config.speed !== 1) {
      video.playbackRate = config.speed
    }
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setConfig({ ...config, quality: 'mp3' })
      } else {
        setConfig({ ...config, quality: '480' })
      }
    };
    // 添加事件监听器，当视频播放时持续触发
    let timeupdateEvent: any
    // 列表播放时不跳转播放时间
    if (video) {
      let jumpTime = (playstat?.find(x => x.no === videoInfo.no)?.start) || start
      videoInfo.duration * 60 - jumpTime > 40 && (video.currentTime = jumpTime || (config.skipIntro ? 10 : 0));
      console.log(videoInfo.duration, jumpTime);

      timeupdateEvent = video.addEventListener('timeupdate', function () {
        if (video) {
          const currentTime = Math.floor(video.currentTime);
          if (currentTime % 5 === 0 && currentTime >= 15) {
            setPlaystat([{ no: videoInfo.no, start: currentTime }, ...playstat.filter(x => x.no != videoInfo.no)])
          }

          if (video.duration > 0 && video.currentTime >= (video.duration - (config.skipIntro ? 36 : 0))) {
            switch (JSON.parse(localStorage.getItem('player-setting') || '{}')?.mode) {
              case 'order':
                location.pathname.startsWith('/video/') ? nextVideo && nextVideo() : listNextVideo()
                break;
              case 'random':
                location.pathname.startsWith('/video/') ? randomVideo && randomVideo() : listRandomVideo()
                break;

              default:
                video.currentTime = config.skipIntro ? 10 : 0
                break;
            }
          }
        }
      });

      document.addEventListener('visibilitychange', handleVisibilityChange);
    }

    // 改变网站title
    document.title = '宁路 | ' + videoInfo.title
    return () => {
      video?.removeEventListener('timeupdate', timeupdateEvent)
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      setConfig({ ...config, quality: '480' })
      console.log('destory video event');
    }
  }, [videoInfo.no, config.quality]);

  const speedOnChange = (e: SelectChangeEvent) => {
    if (videoRef?.current) videoRef.current.playbackRate = parseFloat(e.target.value)
    setConfig({ ...config, speed: +e.target.value })
  }

  return (<>
    {videoInfo?.no && !queryParam &&
      <Box marginTop={'6px'}
        height={videoRef != null && location.pathname == '/video' ? '100%' : 0}
        overflow={'hidden'}
      >
        <video
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          controls
          width="100%"
          controlsList="nodownload"
          autoPlay
          ref={videoRef}
          src={`${import.meta.env.VITE_STREAM_URL}?code=${videoInfo.no}&format=${config.quality === 'mp3' ? 'mp3' : 'mp4&width=' + config.quality}&${sessionStorage.getItem("date_auth")}`}
        >
          您的浏览器不支持 HTML5 视频。
        </video>
        <Box sx={{
          display: showMenu ? "flex" : "none",
          alignItems: "center",
          justifyContent: "space-around",
          px: 2,
          zoom: 0.8
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
    <PlayerControl />
  </>
  );
};

export default VideoPlayer;
