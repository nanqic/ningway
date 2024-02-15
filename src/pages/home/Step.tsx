import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Link, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import EmptyList from '../Emptiness/EmptyList'

const Chulixin = () => {
  return (
    <Box>
      <Link target='_blank' href='/store/keywords/出离心.html'>出离心</Link>——坚定走解脱道
      <br />
      <Typography variant="overline">“出离心没有生起的话，暂时不要修其他的法。”</Typography>
      <br />
      <br />
      <Typography variant="overline">
      </Typography>
      <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
        <Link href={'/search?query=人身难得'}>人身难得</Link>
        <Link href={'/search?query=佛法难闻'}>佛法难闻</Link>
        <Link href={'/search?query=目标'}>目标</Link>
        <Link href={'/search?query=无常'}>无常</Link>
        <Link href={'/search?query=死'}>死</Link>
        <Link href={'/search?query=轮回之苦'}>轮回之苦</Link>
        <Link href={'/search?query=轮回'}>轮回</Link>
        <Link href={'/search?query=因果不虚'}>因果不虚</Link>
        <Link href={'/search?query=因果'}>因果</Link>
        <Link href={'/search?query=解脱道'}>解脱道</Link>
        <Link href={'/search?query=出离心'}>出离心</Link>
        <Link href={'/search?query=断恶'}>断恶</Link>
        <Link href={'/search?query=戒'}>戒</Link>
      </Typography>
    </Box>
  )
}

const Putixin = () => {
  return (
    <Box>
      <Link target='_blank' href="/store/keywords/菩提心.html">菩提心</Link> —— 证悟空性的基础 <br />
      <Typography variant='overline'>“如果相续中没有生起菩提心，哪怕你闭关九年修持无上密法，实际上，连解脱的种子也不能播下。”</Typography>
      <br />
      <br />
      <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
        <Link href={'/search?query=依止'}>依止</Link>
        <Link href={'/search?query=菩提心'}>菩提心</Link>
        <Link href={'/search?query=忏悔'}>忏悔</Link>
        <Link href={'/search?query=业'}>业</Link>
        <Link href={'/search?query=资粮'}>资粮</Link>
        <Link href={'/search?query=上师'}>上师</Link>
        <Link href={'/search?query=自我'}>自我</Link>
        <Link href={'/search?query=我执'}>我执</Link>
        <Link href={'/search?query=慈悲'}>慈悲</Link>
        <Link href={'/search?query=利他'}>利他</Link>
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
          <Link href='/search?query=金刚经'>金刚经</Link>&nbsp;
          <Typography variant="caption">
            <Link target='_blank' href='https://www.huidengchanxiu.net/refs/dgj'>
              若见因缘。彼即见法。若见于法。即能见佛。
            </Link>
          </Typography>
          <Typography variant='h6'>
            空性12期
          </Typography>
          <EmptyList />
        </Box>
    }
  ];

  return (
    <Container>
      <Box sx={{ mx: 1, my: 3 }}>
        <Typography variant='subtitle2'>决定今生要走解脱道，做
          <Link target='_blank' href="https://ziguijia.com/chatroom/shoot/21287">一个修行者</Link>
        </Typography>

        <TabsNav data={tabs} value={parseInt(value)} />

        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: '85px' }}>
          愿我生生遇明师 饱餐妙法甘露味
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', pb: '85px' }}>
          十地五道功德满 速疾证得金刚持
        </Typography>
      </Box>
    </Container >
  )
}
