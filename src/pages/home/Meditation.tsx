import { Box, Container, Link, SvgIcon, Typography } from '@mui/material'
import jingzuo from '@/store/jingzuo'
import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import PlayButton from '@/components/PlayButton';
import VideoPlayer from '@/components/VideoPlayer';


export default function Meditation() {
  const site_url = import.meta.env.VITE_OFFICIAL_SITE
  document.title = '关 于 静 坐'
  let { value } = useParams()
  const [current, setCurrent] = useState<number | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (value == undefined) {
    value = '1'
  }
  function tabsData() {
    const tabs: Array<TabNavProps> = []
    jingzuo.forEach((item0, index0) => {
      const tab: TabNavProps = {
        label: item0.title,
        value: index0 + 1,
        index: index0 + 1,
        children: <Box>
          {current != undefined && <VideoPlayer
            // @ts-ignore
            props={{ src: `${import.meta.env.VITE_STREAM_URL}${jingzuo[index0].list[current]?.split('/')[0]}`, current, setCurrent, playing, setPlaying, videoRef }}
          />}
          {item0.list.map((item: string, index) => {
            const hasVno = item.slice(0, 1) != '_'
            return (
              <Box key={index} margin={1} display={'flex'} justifyContent={'space-between'} maxWidth={'400px'}>
                <Box>
                  <Link target='_blank' href={`${site_url}/chatroom/shoot/${item.split('/')[0]}`}>{item.split('/')[2]}</Link>
                  <Typography
                    fontSize={12}
                    pt={.6}
                  >
                    {hasVno &&
                      <span>
                        视频编号：{item.split('/')[0]} &nbsp;&nbsp;&nbsp;音频机编号：{item.split('/')[1]}
                      </span>
                    }
                  </Typography>
                </Box>
                <Box component={'span'} onClick={() => { setCurrent(index); setPlaying(true) }}>
                  <PlayButton index={index} current={current || 0} playing={playing} videoDom={videoRef} />
                </Box>
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
      <TabsNav data={tabsData()} value={parseInt(value)} />
    </Container>
  )
}
