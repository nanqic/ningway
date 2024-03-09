import { Box, Container, Link } from '@mui/material'
import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PlayButton from '@/components/PlayButton';
import VideoPlayer from '@/components/VideoPlayer';
import ShareButton from '@/components/ShareButton';

export default function Meditation() {
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate()
  const [jingzuo, setJingzuo] = useState<any>(undefined)

  useEffect(() => {
    fetch('/api/jingzuo.json')
      .then(res => res.json())
      .then(json => {
        setJingzuo(json)
      })
  }, [])


  function tabsData() {
    const tabs: Array<TabNavProps> = []
    jingzuo?.forEach((item0: { title: string; list: string[]; }, index0: number) => {
      const tab: TabNavProps = {
        label: item0.title,
        value: index0 + 1,
        index: index0 + 1,
        children: <Box>
          {current != undefined && <VideoPlayer
            // @ts-ignore
            props={{ src: `${import.meta.env.VITE_STREAM_URL}${jingzuo[index0].list[current]?.split('/')[0]}`, current, setCurrent, playing, setPlaying, videoRef, title: jingzuo[index0].list[current]?.split('/')[1] }}
          />}
          {item0.list.map((item: string, index) => {
            const hasVno = item.slice(0, 1) != '_'
            return (
              <Box key={index} display={'flex'} justifyContent={'space-between'} maxWidth={'400px'}>
                <Link onClick={() => navigate(`/video/${btoa('=' + item.split('/')[0])}`)}>{item.split('/')[1]}</Link>
                <PlayButton
                  index={index}
                  current={current || 0}
                  playing={playing}
                  videoDom={videoRef}
                  setPlaying={setPlaying}
                  setCurrent={setCurrent}
                />
              </Box>
            )
          })
          }
        </Box>

      }
      tabs.push(tab)
    })
    return tabs
  }
  return (
    <Container>
      <TabsNav data={tabsData()} />
      <Box textAlign={"right"} maxWidth={380}>
        <ShareButton name='分享本页' />
      </Box>
    </Container>
  )
}
