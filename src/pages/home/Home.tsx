import Excerpt from '@/components/Excerpt'
import Footer from '@/components/Footer'
import { getRandomExcerpt } from '@/utils/randomUtil'
import { Box, Container } from '@mui/material'


export default function Home() {
  return (
    <Container>
      <Box>
        <Excerpt content={getRandomExcerpt()} />
        <Footer />
      </Box>
    </Container>
  )
}
