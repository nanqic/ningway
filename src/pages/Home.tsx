import Excerpt from '@/components/Excerpt'
import { Box, Container } from '@mui/material'
import WeiboDetail from './WeiboDetail'

export default function Home() {
  document.title = '宁路 | ' + '主页'

  return (
    <Container>
      <WeiboDetail/>
        <Box
          sx={{
            opacity: 0,
            textAlign: 'center',
            fontSize: '13px',
            cursor: "progress"
          }}
          //@ts-ignore 2024/2/24/ 9:20 pm pv: 13166   uv: 5192 |3.8 pv: 22149   uv: 8484
          onDoubleClick={e => e.target.style.opacity = 1}
        >
          pv: <span id="busuanzi_value_site_pv"></span>&nbsp;&nbsp;
          uv: <span id="busuanzi_value_site_uv"></span>
        </Box>
    </Container >
  )
}
