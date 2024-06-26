import SearchLinks from '@/components/SearchLinks'
import TabsNav, { TabData } from '@/components/TabsNav'
import OutLink from '@/hooks/OutLink'
import { Box, Container, Divider, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EmptyList from './EmptyList'
import useLocalStorageState from 'use-local-storage-state'

export default function Step() {
  const keywords = ['梦幻', '泡影', '清净', '平等', '虚幻', '实相', '法执', '妄想', '分别']
  const navigate = useNavigate()
  const [open, setOpen] = useLocalStorageState<boolean>('open_base')

  const Xianshan = () => {
    const keywords = ['资粮', '忏悔', '功德', '行善', '断恶', '积累', '善良', '善缘', '随喜']
    return (
      <Box>
        <Divider sx={{ my: 2 }} />
        <details open={open} onClick={() => setOpen(prev => !prev)}>
          <summary>基础</summary>
          <EmptyList />
        </details>
        <Typography sx={{ my: 2 }} variant="body2">选择做一个善良的人 ——<Link onClick={() => navigate(`/video?no=10328&t=1077`)}>《建立一个禅修者的生活模式》</Link></Typography>
        <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：<br />
          <SearchLinks keywords={keywords} />
        </Typography>
      </Box>
    )
  }

  const Chulixin = () => {
    const keywords = ['人生', '珍惜', '目标', '解脱', '无常', '轮回', '因果', '出离', '戒', '死']
    return (
      <Box>
        出离心 —— 决定走<Link onClick={() => navigate(`/search/解脱道`)}>解脱道</Link>
        <br />
        <Typography variant="overline">“如果一个人连出离心没有，说明他很爱恋这个世界。” —— <Link onClick={() => navigate(`/video?no=PTMyMjY3&t=246`)}>《心不要在梦境里边留恋》</Link></Typography>
        <br />
        <br />
        <Typography variant="overline">
        </Typography>
        <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：<br />
          <SearchLinks keywords={keywords} />
        </Typography>
        <hr />
        听一听
        <br />
        <OutLink href='box.hdcxb.net/其他资料/a/sound/米拉日巴尊者传/《米拉日巴尊者传》01.mp3'>《米拉日巴尊者传》</OutLink>
        <br />
        <OutLink href='box.hdcxb.net/其他资料/a/sound/米拉日巴大师集/01-第一篇%20米拉拾柴记(1-1).mp3'>《米拉日巴大师集》（道歌）</OutLink>
        <br />
        <OutLink href='box.hdcxb.net/其他资料/a/sound/西藏生死书/001西藏生死书·第一篇生%20第一章在死亡的镜子中1.mp3'>《西藏生死书》</OutLink>
        <br />
        <OutLink href='v.hdcxb.net/75wdo'> 真的勇士，敢于直面轮回</OutLink>
        <br />
      </Box>
    )
  }

  const Putixin = () => {
    const keywords = ['依止', '菩提心', '忏悔', '业', '资粮', '上师', '自我', '我执', '慈悲', '利他']

    return (
      <Box>
        菩提心 —— 证悟空性的<Link onClick={() => navigate(`/video?no=PTEwMTYy&t=318`)}>基础</Link> <br />
        <Typography variant='subtitle2'>“没有菩提心，不管修任何法门，都只能成为外道...” —— <Link onClick={() => navigate(`/video?no=PUUwMDE2&t=108`)}>《菩提心的重要性》</Link></Typography>
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
      label: '善良人',
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
          >证悟空性</Link> —— 见到万法的<Link onClick={() => navigate(`/video?no=PTI1NDEy&t=1939`)}> 本来面目</Link> <br />
          <br />
          <Typography variant="subtitle2">
            <Link
              onClick={() => navigate(`/video?no=PTAwMTY2&t=50`)}>
              如是&nbsp;
            </Link>"见相即见佛，见相即见如来。" ——
            <Link
              onClick={() => navigate(`/video?no=PTIyNjQ1&t=316`)}>
              《离开相　你永远见不到空性》
            </Link>
          </Typography>
          <Typography variant='subtitle2'>
            “在修证上 你按次第慢慢修就行了” ——
            <Link
              onClick={() => navigate(`/video?no=PTIyNjY5&t=543`)}
            >《心中是无相的》</Link>
          </Typography>
          <Typography variant='subtitle1'><Link href='/video?no=PTIxMjg3&t=985'>有证量的老师 </Link>讲了很多经典，有时间可以听听: <OutLink href='www.fohuifayu.com/index.php/huideng-jiangtang/jingdian-jiedu/liuzu-tanjing/'> 《六祖坛经》释义 </OutLink> <OutLink href='mingguang.im/reading/中观根本慧论讲解'> 《中论》 </OutLink></Typography>
          <Typography variant="subtitle2" sx={{ m: 2, '& a': { mx: 1 } }}>关键字：<br />
            <SearchLinks keywords={keywords} />
          </Typography>
        </Box>
    }
  ];

  return (
    <Container>
      <Box sx={{ my: 3 }}>
        <TabsNav data={tabs} />
        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: '85px' }}>
          菩提心妙宝，未生者当生
        </Typography>
      </Box>
    </Container >
  )
}
