import { Box, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function About() {
    const [follow, setFollow] = useState<string | undefined>('')
    const navigate = useNavigate()

    return (
        <Container>
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>关键字搜索</Typography>
                <ul>
                    <li>
                        <Typography variant='subtitle2' >输入视频标题或编号，自动搜索，如搜索<Link onClick={() => navigate(`/search/善行`)}> 善行</Link>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant='subtitle2' >输入关键字后，手动点击 <span style={{ color: 'gold' }}>搜索</span> 按钮，搜索视频关键字</Typography>
                    </li>
                </ul>
                <Typography variant='h5'>视频播放</Typography>
                <ul>
                    <li><Typography variant='subtitle2'>点击标题进入单个视频播放</Typography></li>
                    <li><Typography variant='subtitle2'>点击标题右侧的三角形播放按钮，顺序播放列表的视频</Typography></li>

                    <li><Typography variant='subtitle2'>点击视频下方的片头开关，开启/跳过片头片尾</Typography></li>
                    <li><Typography variant='subtitle2'>视频播放时，点击分享，复制当前播放进度</Typography></li>
                </ul>
                <Typography variant='h5'>点赞评论</Typography>
                <ul>
                    <li><Typography variant='subtitle2'>每个视频和标题搜索的列表都可以评论心得</Typography></li>
                </ul>
                <Typography variant='h5'>主题切换</Typography>
                <ul>
                    <li><Typography variant='subtitle2'>夜间模式跟随设备系统设置</Typography></li>
                </ul>
                <Typography variant='h5'>反馈帮助</Typography>
                <ul>
                    <li><Typography variant="body1">要查找音/视频机的编号，请访问
                        <Link href="https://www.ningway.com" target="_blank" rel="noopener noreferrer"> 旧版网站</Link>
                    </Typography>
                    </li>
                    <li><Typography>如有问题，请在下方留言评论，或发送邮件到 <Link href="mailto:admin@ningway.com">admin@ningway.com</Link></Typography>
                    </li>
                </ul>
                <FormControl sx={{ mt: .5, minWidth: 120 }}>
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
                            非常随喜
                        </MenuItem>
                        <MenuItem value='no'>
                            不随喜
                        </MenuItem>
                    </Select>
                </FormControl>
                {follow === 'yes' && <Box sx={{
                    width: 380,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <img src="https://www.ningway.com/images/assets/wechatpay.jpg" alt="wechatpay" width={120} />
                    <img src="https://www.ningway.com/images/assets/alipay.png" alt="alipay" width={120} />
                </Box>}
            </Box>
        </Container >
    )
}
