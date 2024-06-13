import { Box } from '@mui/material'
import WeiboDetail from './WeiboDetail'

export default function Home() {
  document.title = '宁路 | ' + '主页'

  return (
    <>
      <WeiboDetail />
    </ >
  )
}
