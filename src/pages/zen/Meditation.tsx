import { Box, Container, Link, Typography } from '@mui/material'
import jingzuo from '@/store/jingzuo'
import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { useParams } from 'react-router-dom';

export default function Meditation() {
  const site_url = import.meta.env.VITE_OFFICIAL_SITE
  document.title = '关 于 静 坐'
  let { value } = useParams()

  if (value == undefined) {
    value = '1'
  }
  function tabsData() {
    const tabs: Array<TabNavProps> = []
    jingzuo.forEach((item0, index) => {
      const tab: TabNavProps = {
        label: item0.title,
        value: index + 1,
        index: index + 1,
        children:
          item0.list.map((item: string, index) => {
            const hasVno = item.slice(0, 1) != '_'
            return (
              <Box key={index} marginBottom={1}>
                <Link target='_blank' href={`${site_url}/chatroom/shoot/${item.split('/')[0]}`}>{item.split('/')[2]}</Link><br />
                <Typography
                  fontSize={12}
                  pt={1}
                  color={'#bdbdbd'}
                >
                  {hasVno &&
                    <span>
                      视频编号：{item.split('/')[0]} &nbsp;&nbsp;&nbsp;音频机编号：{item.split('/')[1]}
                    </span>
                  }
                </Typography>
              </Box>
            )
          })
      }
      tabs.push(tab)
    })
    return tabs
  }
  return (
    <Container>
      <Typography my={3} variant="subtitle2" gutterBottom >老师关于“静坐”的相关开示</Typography>
      <TabsNav data={tabsData()} value={parseInt(value)} />
    </Container>
  )
}
