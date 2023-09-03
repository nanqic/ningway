import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Link, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Link as RLink } from 'react-router-dom'
const Chulixin = () => {
  return (
    <Box>
      <Link target='_blank' href='/store/keywords/出离心.html'>出离心搜索页面</Link> --进入解脱城的门票
      <br />
      <Typography variant="overline">“出离心没有生起的话，暂时不要修其他的法，因为修了也和解脱没关系。”</Typography>
      <br />
      <Typography variant="overline">“没有法融入自己心相续的话，对生解脱死没有太大利益，那样死时不一定想起法。”
      </Typography>
      <Typography variant="subtitle2" sx={{'& a': {mx:1}}}>关键字：
      <RLink to={'/vsearch/暇满'}>暇满</RLink>
      <RLink to={'/vsearch/人身难得'}>人身难得</RLink>
      <RLink to={'/vsearch/生命目标'}>生命目标</RLink>
      <RLink to={'/vsearch/无常'}>无常</RLink>
      <RLink to={'/vsearch/迟早会死'}>迟早会死</RLink>
      <RLink to={'/vsearch/轮回之苦'}>轮回之苦</RLink>
      <RLink to={'/vsearch/因果不虚'}>因果不虚</RLink>
      <RLink to={'/vsearch/唯法有益'}>唯法有益</RLink>
      <RLink to={'/vsearch/不造恶'}>不造恶</RLink>
      <RLink to={'/vsearch/死时'}>死时</RLink>
      </Typography>
    </Box>
  )
}

const Putixin = () => {
  return (
    <Box>
      <Link target='_blank' href="/store/keywords/菩提心.html">菩提心搜索页面</Link> --证悟空性的基石，投生善趣的保障
      <br />
      <Typography variant='overline'>如果相续中没有生起菩提心，哪怕你闭关九年修持无上密法，实际上，连解脱的种子也不能播下。</Typography>
      <Typography variant="subtitle2" sx={{'& a': {mx:1}}}>关键字：
        <RLink to={'/vsearch/皈依'}>皈依</RLink>
        <RLink to={'/vsearch/发菩提心'}>发菩提心</RLink>
        <RLink to={'/vsearch/忏悔业障'}>忏悔业障</RLink>
        <RLink to={'/vsearch/积累资粮'}>积累资粮</RLink>
        <RLink to={'/vsearch/依止上师'}>依止上师</RLink>
        <RLink to={'/vsearch/自他相换'}>自他相换</RLink>
        <RLink to={'/vsearch/慈悲心'}>慈悲心</RLink>
        <RLink to={'/vsearch/利他'}>利他</RLink>
        </Typography>
    </Box>
  )
}
export default function Step() {
  const navigate = useNavigate()
  let { value } = useParams()

  if (value == undefined) {
    value = '1'
  }

  const tabs: Array<TabNavProps> = [
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
      children: <Link onClick={() => navigate('/emptiness')}>空性12期全</Link>
    }
  ];

  return (
    <Container sx={{ m: 2 }}>
      <Typography variant="h6">
        因果轮回, 断恶行善
      </Typography>
      <Typography variant='subtitle2'>你真的想出离轮回吗？</Typography>
      <Typography variant="subtitle2">要用这一生来修行的话，看一下这个视频：
        <a target='_blank' href="https://ziguijia.cn/chatroom/shoot/21287">21287 一个修行者</a>
      </Typography>

      <TabsNav data={tabs} value={parseInt(value)} />

      <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: '85px' }}>
        愿我生生遇明师 饱餐妙法甘露味
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', pb: '85px' }}>
        十地五道功德满 速疾证得金刚持
      </Typography>
    </Container >
  )
}
