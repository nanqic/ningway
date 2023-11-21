import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Link, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { Link as RLink } from 'react-router-dom'
import EmptyList from '../Emptiness/EmptyList'
const Chulixin = () => {
  return (
    <Box>
      <Link target='_blank' href='/store/keywords/出离心.html'>出离心搜索页面</Link>出离心——坚定走解脱道
      <br />
      <Typography variant="overline">“一位大德说过，出离心没有生起的话，暂时不要修其他的法。”</Typography>
      <br />
      <br />
      <Typography variant="overline">
      </Typography>
      <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
        <RLink to={'/search?query=暇满'}>暇满</RLink>
        <RLink to={'/search?query=人身难得'}>人身难得</RLink>
        <RLink to={'/search?query=生命目标'}>生命目标</RLink>
        <RLink to={'/search?query=无常'}>无常</RLink>
        <RLink to={'/search?query=迟早会死'}>迟早会死</RLink>
        <RLink to={'/search?query=轮回之苦'}>轮回之苦</RLink>
        <RLink to={'/search?query=因果不虚'}>因果不虚</RLink>
        <RLink to={'/search?query=唯法有益'}>唯法有益</RLink>
        <RLink to={'/search?query=不造恶'}>不造恶</RLink>
        <RLink to={'/search?query=死时'}>死时</RLink>
      </Typography>
    </Box>
  )
}

const Putixin = () => {
  return (
    <Box>
      <Link target='_blank' href="/store/keywords/菩提心.html">菩提心搜索页面</Link>菩提心——证悟空性的基础
      <br />
      <br />
      <Typography variant='overline'>如果相续中没有生起菩提心，哪怕你闭关九年修持无上密法，实际上，连解脱的种子也不能播下。</Typography>
      <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
        <RLink to={'/search?query=皈依'}>皈依</RLink>
        <RLink to={'/search?query=发菩提心'}>发菩提心</RLink>
        <RLink to={'/search?query=忏悔业障'}>忏悔业障</RLink>
        <RLink to={'/search?query=积累资粮'}>积累资粮</RLink>
        <RLink to={'/search?query=依止上师'}>依止上师</RLink>
        <RLink to={'/search?query=自他相换'}>自他相换</RLink>
        <RLink to={'/search?query=慈悲心'}>慈悲心</RLink>
        <RLink to={'/search?query=利他'}>利他</RLink>
      </Typography>
    </Box>
  )
}
export default function Step() {
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
      children:
        <Box>
          <Typography variant="h6">
            <a href="https://www.huidengvan.com/pages/fsdgj/">若见因缘。彼即见法。若见于法。即能见佛。</a>
          </Typography>
          <Typography variant='h5'>
            空性12期全
          </Typography>
          <EmptyList />
        </Box>
    }
  ];

  return (
    <Container sx={{ m: 2 }}>
      <Typography variant='subtitle2'>决定今生要走解脱道，做
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
