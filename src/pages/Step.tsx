import SearchLinks from '@/components/SearchLinks'
import TabsNav, { TabData } from '@/components/TabsNav'
import OutLink from '@/hooks/OutLink'
import { Box, Container, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Step() {
  const keywords = ['梦幻', '泡影', '清净', '平等', '虚幻', '实相', '法执', '妄想', '分别']
  const navigate = useNavigate()

  const Xianshan = () => {
    const keywords = ['忏悔', '资粮', '功德', '行善', '断恶', '积累', '随喜', '善良', '善缘', '善']
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
        <hr />
        听一听
        <br />
        <OutLink href='box.hdcxb.net/其他资料/a/sound/米拉日巴尊者传/《米拉日巴尊者传》01.mp3'>《米拉日巴尊者传》</OutLink>
        <br />
        <OutLink href='box.hdcxb.net/其他资料/a/sound/米拉日巴大师集/01-第一篇%20米拉拾柴记(1-1).mp3'>《米拉日巴大师集》（道歌）</OutLink>
        <br />
        <OutLink href='box.hdcxb.net/其他资料/a/sound/西藏生死书/001西藏生死书·第一篇生%20第一章在死亡的镜子中1.mp3'>《西藏生死书》</OutLink>
        <br />
        19岁女孩只身周游列国，<OutLink href='v.hdcxb.net/75wdo'>朝圣求学之旅</OutLink>
        <br />
        <br />
        也可使用<OutLink href='a.hdcxb.net/login2'>有声书App </OutLink>收听，免费无广告
      </Box>
    )
  }

  const Chulixin = () => {
    const keywords = ['人生', '珍惜', '目标', '解脱', '无常', '轮回', '因果', '出离', '戒', '死']
    return (
      <Box>
        <Link href='/store/keywords/出离心.html'>出离心</Link> —— 坚定走<Link onClick={() => navigate(`/search/解脱道`)}>解脱道</Link>
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
        <Link href="/store/keywords/菩提心.html">菩提心</Link> —— 证悟空性的<Link onClick={() => navigate(`/video/PTEwMTYy?t=318`)}>基础</Link> <br />
        <Typography variant='subtitle2'>“没有菩提心，不管修任何法门，都只能成为外道...” —— <Link onClick={() => navigate(`/video/PUUwMDE2?t=108`)}>《菩提心的重要性》</Link></Typography>
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
          <Typography variant="subtitle2">
            <Link
              onClick={() => navigate(`/video/PTAwMTY2?t=50`)}>
              如是&nbsp;
            </Link>"见相即见佛，见相即见如来。" ——
            <Link
              onClick={() => navigate(`/video/PTIyNjQ1?t=316`)}>
              《离开相　你永远见不到空性》
            </Link>
          </Typography>
          <Link
            onClick={() => navigate(`/video/PTIyNjQ1?t=316`)}>
            《空性12期》
          </Link>
          <br />
          <Typography variant='subtitle1'>
            但是 在修证上 你按次第慢慢修就行了 ——
            <Link
              onClick={() => navigate(`/video/PTIyNjY5?t=543`)}
            >《心中是无相的》</Link>
          </Typography>
          <Typography variant='subtitle1'>
            见地上应了知第一义谛，实修时应
            <Link
              marginX={2}
              onClick={() => navigate(`/vsearch/按次第`)}
            >按次第</Link>修行
          </Typography>
          <Typography m={2}>很多经典老师没讲，<Link href='/video/PTIxMjg3?t=985'> 有视频提到 </Link>两位有证量的老师讲过了，有时间可以听听</Typography>
          <Typography><OutLink href='www.fohuifayu.com/index.php/huideng-jiangtang/jingdian-jiedu/liuzu-tanjing/'> 《六祖坛经》释义 </OutLink></Typography>
          <Typography><OutLink href='mingguang.im/category'> 《中论》等五部大论 </OutLink> （老师<Link href='/video/PTI1Mzg4?t=525'> 提到 </Link>《中论》可以涉猎一下）</Typography>
          <Typography variant="subtitle2" sx={{ m: 2, '& a': { mx: 1 } }}>关键字：<br />
            <SearchLinks keywords={keywords} />
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
