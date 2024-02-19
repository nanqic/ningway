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
      </Box>
    </Container>
  )
}
