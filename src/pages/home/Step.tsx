import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Link, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const SearchLinks = ({ keywords }: { keywords: string[] }) => {
  const navigate = useNavigate()

  return (<>
    {keywords.map(word => {
      return <Link underline="hover" key={word} onClick={() => navigate(`/search/${word}`)}>{word}</Link>
    })}
  </>)
}
const Chulixin = () => {
  const keywords = ['人生', '珍惜', '目标', '解脱', '无常', '死', '轮回', '因果', '出离', '断恶', '戒']
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
        <SearchLinks keywords={keywords} />
      </Typography>
    </Box>
  )
}

const Putixin = () => {
  const keywords = ['依止', '菩提心', '忏悔', '业', '资粮', '上师', '自我', '我执', '慈悲', '利他']

  return (
    <Box>
      <Link target='_blank' href="/store/keywords/菩提心.html">菩提心</Link> —— 证悟空性的基础 <br />
      <Typography variant='overline'>“如果相续中没有生起菩提心，哪怕你闭关九年修持无上密法，实际上，连解脱的种子也不能播下。”</Typography>
      <br />
      <br />
      <Typography variant="subtitle2" sx={{ '& a': { mx: 1 } }}>关键字：
        <SearchLinks keywords={keywords} />
      </Typography>
    </Box>
  )
}
export default function Step() {
  let { value } = useParams()
  const keywords = ['金刚经', '空性', '梦幻', '泡影', '平等', '虚幻', '实相', '法执', '妄想', '分别']
  const navigate = useNavigate()

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

            <SearchLinks keywords={keywords} />
          </Typography>
          <br />
          <Typography variant='h6'>
            <Link
              onClick={() => navigate(`/emptiness`)}
            >空性12期</Link>
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
