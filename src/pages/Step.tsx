import SearchLinks from '@/components/SearchLinks'
import TabsNav, { TabData } from '@/components/TabsNav'
import { Box, Container, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Step() {
  const keywords = ['金刚经', '空性', '梦幻', '泡影', '清净', '平等', '虚幻', '实相', '法执', '妄想', '分别']
  const navigate = useNavigate()

  const Xianshan = () => {
    const keywords = ['忏悔', '资粮', '功德', '行善', '积累', '随喜', '好人', '善缘', '断恶', '善']
    return (
      <Box>
        <Typography variant="body1">选择做一个善良的人 —— <Link onClick={() => navigate(`/video/PTUxNjcx?t=1077`)}>《建立一个禅修者的生活模式》</Link></Typography>
        <br />
        <br />
        <Typography variant="overline">
        </Typography>
        <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：<br />
          <SearchLinks keywords={keywords} />
        </Typography>
        <br />
        视频看多了眼睛疲劳时，听一听
        <br />
        <Link href='https://box.hdcxb.net/其他资料/a/sound/米拉日巴尊者传/《米拉日巴尊者传》01.mp3' target='_blank'>《米拉日巴尊者传》</Link>
        <br />
        <Link href='https://box.hdcxb.net/其他资料/a/sound/米拉日巴大师集/01-第一篇%20米拉拾柴记(1-1).mp3' target='_blank'>《米拉日巴大师集》（道歌）</Link>
        <br />
        <Link href='https://box.hdcxb.net/其他资料/a/sound/西藏生死书/001西藏生死书·第一篇生%20第一章在死亡的镜子中1.mp3' target='_blank'>《西藏生死书》</Link>
      </Box>
    )
  }

  const Chulixin = () => {
    const keywords = ['人生', '珍惜', '目标', '解脱', '无常', '轮回', '因果', '出离', '断恶', '戒', '死']
    return (
      <Box>
        <Link target='_blank' href='/store/keywords/出离心.html'>出离心</Link> —— 坚定走<Link onClick={() => navigate(`/search/解脱道`)}>解脱道</Link>
        <br />
        <Typography variant="overline">“如果一个人连出离心没有，说明他很爱恋这个世界。” —— <Link onClick={() => navigate(`/video/PTMyMjY3?t=246`)}>《心不要在梦境里边留恋》</Link></Typography>
        <br />
        <br />
        <Typography variant="overline">
        </Typography>
        <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：<br />
          <SearchLinks keywords={keywords} />
        </Typography>
      </Box>
    )
  }

  const Putixin = () => {
    const keywords = ['依止', '菩提心', '忏悔', '业', '资粮', '上师', '自我', '我执', '慈悲', '利他']

    return (
      <Box>
        <Link target='_blank' href="/store/keywords/菩提心.html">菩提心</Link> —— 证悟空性的<Link onClick={() => navigate(`/video/PTEwMTYy?t=318`)}>基础</Link> <br />
        <Typography variant='overline'>“没有菩提心，不管修任何法门，都只能成为外道...” —— <Link onClick={() => navigate(`/video/PUUwMDE2?t=108`)}>《菩提心的重要性》</Link></Typography>
        <br />
        <br />
        <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：<br />
          <SearchLinks keywords={keywords} />
        </Typography>
      </Box>
    )
  }

  const tabs: Array<TabData> = [
    {
      label: '贤善人',
      value: 0,
      index: 0,
      children: <Xianshan />
    },
    {
      label: '出离心',
      value: 1,
      index: 1,
      children: <Chulixin />
    },
    {
      label: '菩提心',
      value: 2,
      index: 2,
      children: <Putixin />
    },
    {
      label: '空性见',
      value: 3,
      index: 3,
      children:
        <Box>
          <Link
            onClick={() => navigate(`/search/证道`)}
          >证悟空性</Link> —— 见到万法的<Link onClick={() => navigate(`/video/PTI1NDEy?t=1939`)}>本来面目</Link> <br />
          <Typography variant="caption">
            <Link
              onClick={() => navigate(`/video/PTAwMTY2?t=50`)}>
              如是&nbsp;
            </Link>"见相即见佛，见相即见如来。" ——
            <Link
              onClick={() => navigate(`/video/PTIyNjQ1?t=316`)}>
              《离开相　你永远见不到空性》
            </Link>
          </Typography>
          <br />
          <br />
          <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：<br />

            <SearchLinks keywords={keywords} />
          </Typography>
          <br />
          <Typography variant='h6'>
            <Link
              onClick={() => navigate(`/emptiness`)}
            >空性12期</Link>
            <Link
              marginX={2}
              onClick={() => navigate(`/vsearch/按次第`)}
            >按次第</Link>
          </Typography>
        </Box>
    }
  ];

  return (
    <Container>
      <Box sx={{ my: 3 }}>
        <Typography variant='subtitle2'>决定今生要走解脱道，做
          <Link

            onClick={() => navigate(`/video/${btoa('=21287')}`)}> 一个修行者</Link>
        </Typography>

        <TabsNav data={tabs} />

        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: '85px' }}>
          菩提心妙宝，未生者当生
        </Typography>
      </Box>
    </Container >
  )
}