import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Donate from './Donate'

export default function About() {
    const [follow, setFollow] = useState<string | undefined>('')
    const navigate = useNavigate()

    return (
        <Container>
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>关键字搜索（已兼容微信）</Typography>
                <ul>
                    <li>
                        <Typography variant='subtitle2' >输入视频标题或编号，自动搜索，如输入<Link onClick={() => navigate(`/search/善行`)}> 善行</Link>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='subtitle2' >要搜索字幕，输入关键字后，手动点击 <Button size="small" variant="contained" color="success">搜索</Button></Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" color={"green"} >服务繁忙时，可以搜索别人搜过的<Link onClick={() => navigate(`/tool/5`)}> 缓存</Link>
                        </Typography>
                    </li>
                </ul>
                <Typography variant='h5'>视频播放（支持列表）</Typography>
                <ul>
                    <li><Typography variant='subtitle2'>点击标题进入单个视频播放</Typography></li>
                    <li><Typography variant='subtitle2'>点击标题右侧的播放按钮，顺序播放列表的视频</Typography></li>
                    <li><Typography variant='subtitle2'>视频播放时，点击分享，复制当前播放进度的网址</Typography></li>
                </ul>
                <Typography variant='h5'>点赞评论/夜间模式</Typography>
                <ul>
                    <li><Typography variant='subtitle2'>单个视频和播放列表都可以评论</Typography></li>
                    <li><Typography variant='subtitle2'>夜间模式跟随设备系统设置</Typography></li>
                </ul>
                <Typography variant='h5'>反馈帮助</Typography>
                <ul>
                    <li><Typography variant="body1">要查找音/视频机的编号，请访问
                        <Link href="https://ww.ningway.com" target="_blank" rel="noopener noreferrer"> 旧版网站</Link>
                    </Typography>
                    </li>
                    <li><Typography>如有问题，请在下方留言评论，或发送邮件到 <Link href="mailto:admin@ningway.com">admin@ningway.com</Link></Typography>
                    </li>
                </ul>
                <Typography variant='h5'><Link >随喜功德</Link></Typography>
                <FormControl sx={{ my: 1.5, minWidth: 120 }}>
                    <InputLabel id="follow-label">是否随喜</InputLabel>
                    <Select
                        label="是否随喜"
                        labelId="follow-label"
                        value={follow}
                        size={"medium"}
                        onChange={e => setFollow(e.target.value)}>
                        <MenuItem value=''>
                            <em>请选择</em>
                        </MenuItem>
                        <MenuItem value='yes'>
                            随喜赞叹
                        </MenuItem>
                        <MenuItem value='no'>
                            不随喜赞叹
                        </MenuItem>
                    </Select>
                </FormControl>
                <Typography marginLeft={1} variant="subtitle2">
                    如 <Link onClick={() => navigate("/video/PTEwNjM0")} underline="hover">《普贤行愿品》</Link>所说随喜，<br /> 随喜一分也可获得全部功德。

                </Typography>
                {follow === 'yes' && <Donate />}
                {follow === 'no' && <h2>感谢支持</h2>}
            </Box>
        </Container >
    )
}
