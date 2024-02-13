import { Box, Button, Typography } from '@mui/material'
export default function Help() {
  return (
    <Box sx={{ height: '100vh', fontSize: '13px' }} >
      <ol>
        <Typography variant='h4'>1分钟问卷</Typography>
        <br />
        <Typography variant='h5'><a onClick={() => localStorage.setItem(import.meta.env.VITE_README, 'true')} href="https://less.ningway.com/s/FHRSPu9E" target='_blank'>点击填写问卷</a></Typography>（点过该链接将不再回到本页）
        <br />
        <br />
        <p>我已填写，没有别的建议了</p>
        <Button variant="outlined" size='large' onClick={() => {
          localStorage.setItem(import.meta.env.VITE_README, 'true');
          alert('感恩有你 ~')
          location.replace('/')
        }}>点击跳过</Button>
        <br />
        <br />
        <Typography variant='h6'> 或扫码填写</Typography>
        <img src="data:image/png;base64,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" alt="" />
        <p>感谢您对本站的支持，若希望只听音频，有根据年份或经书分类等功能，也可在问卷填写建议，听书网站长<a href="https://aa.hdcxb.net/login2" target="_blank" rel="noopener noreferrer">这样</a> （有App）</p>
        <br />
        <Typography variant='h6'>功能说明</Typography>
        <br />
        <Typography variant='h6' color={'red'}>关键字搜索已恢复，能用多久不确定</Typography>
        <li><Typography variant='subtitle2' >输入关键字，回车或换行搜索（手机输入界面右下角 ⮒ 或 开始 ）</Typography></li>
        <li><Typography variant='subtitle2'>目前可搜索视频标题或编号，也可搜经书名</Typography></li>
        <li><Typography variant='subtitle2'>点击搜索列表的标题，跳转到官网播放</Typography></li>
        <li><Typography variant='subtitle2'>点击标题右侧的三角形按钮，在本站播放搜索列表</Typography></li>
        <li><Typography variant='subtitle2'>点击搜索列表上面的跳过片头开关，可跳过片头片尾</Typography></li>
        <li><Typography variant='subtitle2'><a href="/step/3">次第</a>、<a href="/meditation">静坐</a> 同样可列表播放，点击可切换选项卡</Typography></li>
      </ol>
      <br />
      <Typography variant='h6'>
        <a href="https://www.ningway.com" target="_blank" rel="noopener noreferrer">旧版网站</a>
      </Typography>
    </Box>
  )
}

