import Excerpt from '@/components/Excerpt'
import Footer from '@/components/Footer'
import { getRandomExcerpt } from '@/utils/randomUtil'
import { Box, Container } from '@mui/material'


export default function Home() {
  document.title = '宁路 | ' + '主页'

  return (
    <Container>
      <Box>
        <Excerpt content={getRandomExcerpt()} />
        <Box sx={{
          opacity: 10,
          textAlign: 'center',
          fontSize: '13px',
        }}
          //@ts-ignore 2024/2/24/ 8:00 pm
          onDoubleClick={e => e.target.style.opacity = 1}
        >
          <div id="article-info">
            浏览量: <span className="waline-pageview-count" data-path="/about" />
          </div>
          pv: <span id="busuanzi_value_site_pv"></span>&nbsp;&nbsp;
          uv: <span id="busuanzi_value_site_uv"></span>
        </Box>
      </Box>
    </Container >
  )
}
