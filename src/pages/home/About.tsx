import Comment from '@/components/Comment'
import { getVsearchCount } from '@/utils/dbUtil'
import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { Suspense } from 'react'
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
                    <li>
                        <Typography variant='subtitle2' >手动点击搜索时，先搜索本地缓存，没有缓存时自动搜索服务器内容
                        </Typography>
                    </li>
                    <li><Typography variant='subtitle2'>点击编号，标题，播放按钮分别进入 源站跳转/单个视频/视频列表播放</Typography></li>
                </ul>
                <Typography variant='h6'>功能说明</Typography>
                <Typography variant='body1'><li>分享复制已适配微信和ios。点击分享按钮，复制视频播放进度的网址，和视频标题到剪切板</li> </Typography>
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
                </> : ''}
            </Box>
            <Typography marginTop={3} variant='h5'>功能反馈</Typography>
            <ul>
                <li><Typography variant='subtitle2'>如有问题或建议，请在下方留言或联系 <Link href="mailto:admin@ningway.com">admin@ningway.com</Link></Typography>
                </li>
            </ul>
            {count > 3 &&
                <Suspense fallback={"Loading ..."}>
                    <br />
                    <Comment />
                </Suspense>}
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <Link href="https://ww.ningway.com" target="_blank" rel="noopener noreferrer"> 旧版网站</Link>
            </Typography>
            <hr />
        </Container >
    )
}
