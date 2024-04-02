import { getVsearchCount } from '@/utils/dbUtil'
import { Box, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { lazy, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
const SubtitlePlayer = lazy(() => import("../components/SubtitlePlayer"));

export default function About() {
    const [follow, setFollow] = useState<string | undefined>('')
    const total: number = (getVsearchCount()?.total) || 0
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <Container>
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>使用指南</Typography>
                <ul>
                    <Typography variant='subtitle2' sx={{ display: window.innerHeight > window.innerWidth ? "inline-flex" : "none", alignItems: "flex-end" }}>
                        点击<MenuIcon />
                        图标，进入菜单选项；
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>支持日期搜索，格式：<Link onClick={() => navigate(`/search/12-02-02`)}>12-02-02</Link> (点击观看同一天的视频)
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        请避免输入长句子，使用空格分隔多个关键词，搜索视频字幕内容
                    </Typography>
                </ul>
                {total >= 21 ? <>
                    <Typography variant="h6">本站已帮您搜索关键字 <mark>{total}</mark> 次</Typography>
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
                        感谢您的理解和支持，推荐搜索 <Link target='_blank' href='https://cn.bing.com/search?q=子贡赎人'>子贡赎人</Link>
                    </Typography>}
                    <Typography sx={{ mt: 1 }} variant="subtitle2">
                        网站免费使用，可以随喜捐赠。<br />
                    </Typography>
                </> : ''}
            </Box>
            <Typography marginTop={3} variant='h5'>待开发功能</Typography>
            <ul>
                <details open={open} onToggle={() => setOpen(prev => !prev)}>
                    <summary>
                        <Typography component={'span'} variant='subtitle1'>查看字幕上下文（仅此视频有字幕）</Typography>
                    </summary>
                    {open && <SubtitlePlayer />}
                </details>
                <Typography component={"li"} marginLeft={1.8} variant='subtitle1'>播放记录，看过的自动打勾 </Typography>
                <Typography component={"li"} marginLeft={1.8} variant='subtitle1'>或随身听App，记录播放进度。<Link href='https://a.hdcxb.net/login2' target='_blank'>示例</Link> </Typography>
            </ul>

            <Typography marginTop={3} variant='h5'>问题反馈</Typography>
            <Typography marginTop={1} variant='body1'>如果发现数据，格式等任何问题，请按下面的方式反馈</Typography>
            <ol>
                <Typography component={"li"} variant='subtitle2'> 您所使用的电脑或手机型号，浏览器 </Typography>
                <Typography component={"li"} variant='subtitle2'>出错的网页地址  </Typography>
                <Typography component={"li"} variant='subtitle2'>联系邮箱<Link href="mailto:contact@ningway.com"> contact@ningway.com </Link>或QQ
                    <Link href='https://qm.qq.com/q/EuMCvavDpe'> oningway </Link>
                </Typography>
            </ol>
            <Typography variant='h5'>关于本站</Typography>
            <ul style={{ listStyle: 'circle' }}>
                <li>本站是个人兴趣行为，并非商业组织安排，没有商业收入。</li>
                <li>
                    本站旨在补充官网功能的不足，为大家提供便利。
                </li>
                <li>
                    所有资源均来源于网络，本站仅作整理和收集。
                </li>
                <li>
                    该网站是业余时间制作，因此反馈回复可能会有一定延迟，请您谅解。
                </li>
            </ul>
            <hr />
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <Link href="https://ww.ningway.com" target="_blank"> 旧版网站</Link>
            </Typography>
            <Typography variant='h6'>相关网站，供参考</Typography>
            <Typography component={"li"} variant='subtitle1'>
                <Link href="https://sou.hdcxb.net" target='_blank'>法语搜索 </Link>
                <Link href="https://www.fahaisouxun.com/search" target='_blank'>法海搜寻 </Link>
                <Link href="https://www.huidengchanxiu.net/books/b1" target='_blank'>禅修教材 </Link>
                <Link href="https://cxbbj.huidengchanxiu.net" target='_blank'>禅修笔记 </Link>
            </Typography>
        </Container>
    )
}
