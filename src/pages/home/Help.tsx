import { Box, Link, Typography } from '@mui/material'
export default function Help() {
  return (
    <Box sx={{ height: '100vh', fontSize: '13px' }} >
      <ol>
        <li>搜索功能怎么用？</li>
        <p>
          搜索框 <i style={{ background: 'yellow' }}>输入关键字后回车（换行）</i>。
        </p>
        <Typography variant='h6'>提示</Typography>
        把视频编号（如21287）或分享的地址（视频播放页，点下载旁边的分享）复制出来，在官网上看更流畅
        <br />

        <br />
      </ol>
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 7, mb: 2 }}> <Link target='_blank' href="/store/keywords/普贤行愿品.html"> 普贤行愿品</Link>（节选）</Typography>
      <Typography variant="subtitle2" sx={{ textAlign: 'center', pb: '115px' }}>
        文殊师利勇猛智  普贤慧行亦复然<br />
        我今回向诸善根  随彼一切常修学<br />
        三世诸佛所称叹  如是最胜诸大愿<br />
        我今回向诸善根  为得普贤殊胜行</Typography>
    </Box>
  )
}

