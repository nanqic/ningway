import Excerpt from '@/components/Excerpt'
import excerptList from '@/store/excerpt'
import { exportData } from '@/utils/exportUtil'
import { getRandomNum } from '@/utils/randomUtil'
import { Box, Container } from '@mui/material'

export default function Home() {
  document.title = '宁路 | ' + '主页'
  let hash_index: number = parseInt(location.hash.slice(1)) || getRandomNum()
  if (hash_index > 10 || hash_index < 0) {
    hash_index = 2
  }
  // exportData(220);

  return (
    <Container>
      <Box>
        <Excerpt content={excerptList[hash_index]} />
        <Box sx={{
          opacity: 0,
          textAlign: 'center',
          fontSize: '13px',
        }}
          //@ts-ignore 2024/2/24/ 9:20 pm pv: 13166   uv: 5192
          onDoubleClick={e => e.target.style.opacity = 1}
        >
          pv: <span id="busuanzi_value_site_pv"></span>&nbsp;&nbsp;
          uv: <span id="busuanzi_value_site_uv"></span>
        </Box>
      </Box>
    </Container >
  )
}
