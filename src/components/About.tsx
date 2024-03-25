import { getVsearchCount } from '@/utils/dbUtil'
import { Box, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { lazy, useState } from 'react'
import { Navigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
const SubtitlePlayer = lazy(() => import("./SubtitlePlayer"));

export default function About() {
    const [follow, setFollow] = useState<string | undefined>('')
    const count: number = (getVsearchCount()?.total) || 0
    const [open, setOpen] = useState(false)

    return (
        <Container>
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>使用指南</Typography>
                <ul>
                    <Typography variant='subtitle2' sx={{ display: window.innerHeight > window.innerWidth ? "inline-flex" : "none", alignItems: "flex-end" }}>
                        点击<MenuIcon />
                        图标，进入菜单选项；
                    </Typography>
                    <Typography component={"li"} variant='subtitle2'>多个关键字可以空格隔开
                    </Typography>
                    <Typography component={"li"} variant='subtitle2'>点击播放全部，进入播放列表
                    </Typography>
                    <Typography component={"li"} variant='subtitle2'>点击“+ 还有 n 项匹配”，查看更多匹配
                    </Typography>
                    <Typography component={"li"} variant='subtitle2'>点击分享按钮，复制带视频播放进度的网址
                    </Typography>
                    <Typography component={"li"} variant='subtitle2'>
                        <Link href="/fayu/" >法语搜索 </Link>也可以搜索关键字，有字幕上下文（<Link href='/video/PTIxMjg3?t=985'>老师讲过</Link>，有证量的大德）
                    </Typography>
                </ul>
                <br />
                <hr />
                {count > 10 ? <>
                    <Typography variant="h6">本站已帮您搜索关键字 <mark>{count}</mark> 次</Typography>
                    <FormControl sx={{ my: 2, minWidth: 120 }}>
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
                                前往捐赠
                            </MenuItem>
                            <MenuItem value='no'>
                                不捐赠
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    {follow === 'yes' && <Navigate to={'/donate'} />}
                    {follow === 'no' && <Typography variant='subtitle2'>
                        感谢您的理解和支持，推荐搜索 <Link target='_blank' href='https://cn.bing.com/search?q=%E5%AD%90%E8%B4%A1%E8%B5%8E%E4%BA%BA%E5%92%8C%E5%AD%90%E8%B7%AF%E5%8F%97%E7%89%9B'>子贡赎人</Link>
                    </Typography>}
                    <Typography sx={{ mt: 1 }} variant="subtitle2">
                        网站免费使用，接受随喜捐赠。<br />
                    </Typography>
                </> : ''}
            </Box>
            <Typography marginTop={3} variant='h5'>待开发功能</Typography>
            <ul>
                <details open={open} onToggle={() => setOpen(prev => !prev)}>
                    <summary>
                        <Typography component={'span'} variant='subtitle1'>查看字幕上下文（仅当前视频）</Typography>
                    </summary>
                    {open && <SubtitlePlayer />}
                </details>
                <Typography component={"li"} marginLeft={1.8} variant='subtitle1'>随身听App，记录播放进度。<Link href='https://a.hdcxb.net/login2' target='_blank'>示例</Link> </Typography>
            </ul>

            <Typography marginTop={3} variant='h5'>问题反馈</Typography>
            <ol>
                <Typography component={"li"} variant='subtitle2'>下方留言</Typography>
                <Typography component={"li"} variant='subtitle2'>QQ反馈
                    <Link href='https://qm.qq.com/q/EuMCvavDpe'> oningway </Link>
                </Typography>
                <Typography component={"li"} variant='subtitle2'>
                    联系邮箱<Link href="mailto:admin@ningway.com"> contact@ningway.com</Link>
                </Typography>

            </ol>
            <hr />
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <Link href="https://ww.ningway.com" target="_blank"> 旧版网站</Link>
            </Typography>
        </Container>
    )
}
