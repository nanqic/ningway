import { getVsearchCount } from '@/utils/dbUtil'
import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const [follow, setFollow] = useState<string | undefined>('')
    const navigate = useNavigate()
    const count: number = (getVsearchCount()?.total) || 0

    return (
        <Container>
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>使用指南</Typography>
                <ul>
                    <li>
                        <Typography variant='subtitle2' >输入视频标题或编号，自动搜索；点击搜索按钮，手动搜索关键字
                        </Typography>
                    </li>

                    <li><Typography variant='subtitle2'>点击编号，标题，播放按钮分别进入 源站跳转/单个视频/视频列表播放</Typography></li>
                    <li>
                        <Typography variant='subtitle2' >点击分享按钮，复制视频进度的网址到剪贴板。
                        </Typography>
                    </li>
                </ul>
                <Typography variant='h6'>功能说明</Typography>
                <Typography variant='body1'><li>分享网址功能已适配安卓微信，ios设备未知。
                </li> </Typography>
                <Typography variant='body1'><li>搜索过的页面自动缓存，可以分享，不会占用服务资源。</li> </Typography>
                <Typography variant='body1'><li>目前搜索功能稳定，如遇不可用，<Button size='small' onClick={() => alert('QQ反馈群：54595190，备注宁路')}>点击</Button>反馈。</li> </Typography>
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
                                随喜赞叹
                            </MenuItem>
                            <MenuItem value='no'>
                                不随喜赞叹
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    {follow === 'yes' && <Button variant="outlined" onClick={() => navigate(`/donate`)}>前往随喜</Button>}
                    {follow === 'no' && <span>感谢支持</span>}
                    <Typography sx={{ mt: 2 }} variant="subtitle2">
                        使用网站不会收费，所有内容来自老师布施<br />
                        为避免新师兄误会，多次搜索才会展示此项
                    </Typography>
                    <Typography variant='subtitle2'>
                        感谢理解和包容，推荐搜索 <Link target='_blank' href='https://cn.bing.com/search?q=%E5%AD%90%E8%B4%A1%E8%B5%8E%E4%BA%BA%E5%92%8C%E5%AD%90%E8%B7%AF%E5%8F%97%E7%89%9B'>子贡赎人</Link>
                    </Typography>
                </> : ''}
            </Box>
            <Typography marginTop={3} variant='h5'>功能反馈</Typography>
            <ul>
                <li><Typography variant='subtitle2'>如有问题或建议，请在下方留言或联系 <Link href="mailto:admin@ningway.com">admin@ningway.com</Link></Typography>
                </li>
            </ul>
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <Link href="https://ww.ningway.com" target="_blank" rel="noopener noreferrer"> 旧版网站</Link>
            </Typography>
            <hr />
        </Container >
    )
}
