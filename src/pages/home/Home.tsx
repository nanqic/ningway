import Excerpt from '@/components/Excerpt'
import Footer from '@/components/Footer'
import { getRandomExcerpt } from '@/utils/randomUtil'
import { Box, Container } from '@mui/material'
import ReactPlayer from 'react-player'


export default function Home() {
  // const readme = localStorage.getItem('read')
  // if (readme == undefined) {
  //   localStorage.setItem('read', 'true');
  //     window.location.href = 'help'
  // }
  return (
    <Container>
      <Box>
        <Excerpt content={getRandomExcerpt()} />
        <Footer />
      </Box>
    </Container>
  )
}
