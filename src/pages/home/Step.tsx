import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Link, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const Chulixin = () => {
  return (
    <Box>
      <Link target='_blank' href='/store/keywords/出离心.html'>出离心</Link> —— 坚定走解脱道
      <br />
      <Typography variant="overline">“出离心没有生起的话，暂时不要修其他的法。”</Typography>
      <br />
      <br />
      <Typography variant="overline">
      </Typography>
      <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
        <Link href={'/search/人生'}>人身难得</Link>
        <Link href={'/search/珍惜'}>佛法难闻</Link>
        <Link href={'/search/目标'}>目标</Link>
        <Link href={'/search/解脱'}>解脱</Link>
        <Link href={'/search/无常'}>无常</Link>
        <Link href={'/search/死'}>死</Link>
        <Link href={'/search/轮回'}>轮回之苦</Link>
        <Link href={'/search/因果'}>因果不虚</Link>
        <Link href={'/search/出离'}>出离</Link>
        <Link href={'/search/断恶'}>断恶</Link>
        <Link href={'/search/戒'}>戒</Link>
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
        <Link href={'/search/依止'}>依止</Link>
        <Link href={'/search/菩提心'}>菩提心</Link>
        <Link href={'/search/忏悔'}>忏悔</Link>
        <Link href={'/search/业'}>业</Link>
        <Link href={'/search/资粮'}>资粮</Link>
        <Link href={'/search/上师'}>上师</Link>
        <Link href={'/search/自我'}>自我</Link>
        <Link href={'/search/我执'}>我执</Link>
        <Link href={'/search/慈悲'}>慈悲</Link>
        <Link href={'/search/利他'}>利他</Link>
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
          <Link href="/search/证道">证悟空性</Link> —— 见到万法的本来面目 <br />
          <Typography variant="caption">
            "若见因缘。彼即见法。若见于法。即能见佛。" ——
            <Link
              underline='hover'
              target='_blank'
              href='https://www.huidengchanxiu.net/refs/dgj'>
              《佛说稻秆经》
            </Link>
          </Typography>
          <br />
          <br />
          <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
            <Link href='/search/金刚经'>金刚经</Link>&nbsp;
            <Link href={'/search/空性'}>空性</Link>
            <Link href={'/search/梦幻'}>梦幻</Link>
            <Link href={'/search/泡影'}>泡影</Link>
            <Link href={'/search/平等'}>平等</Link>
            <Link href={'/search/虚幻'}>虚幻</Link>
            <Link href={'/search/实相'}>实相</Link>
            <Link href={'/search/法执'}>法执</Link>
            <Link href={'/search/妄想'}>妄想</Link>
            <Link href={'/search/分别'}>分别</Link>
          </Typography>
          <br />
          <Typography variant='h6'>
            <Link href="/emptiness">空性12期</Link>
          </Typography>
        </Box>
    }
  ];

  return (
    <Container>
      <Box sx={{ mx: 1, my: 3 }}>
        <Typography variant='subtitle2'>决定今生要走解脱道，做
          <Link target='_blank' href={`/video/${btoa('=21287')}`}>一个修行者</Link>
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
