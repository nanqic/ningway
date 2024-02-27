import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
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
                    <li><Typography variant='subtitle2'>单个视频和播放列表都可以评论</Typography></li>
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
                            随喜赞叹
                        </MenuItem>
                        <MenuItem value='no'>
                            不随喜赞叹
                        </MenuItem>
                    </Select>
                </FormControl>
                {follow === 'yes' && <Box sx={{
                    width: 380,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                    >
                        <span>微信支付</span>
                        <img src="/images/wechatpay.jpg" alt="wechatpay" height={120} />
                        <p>善愿心</p>
                        <Button variant="contained" color="secondary">
                            <Link color={"white"} underline="none" href="/images/wechatpay.jpg" download="wechatpay.jpg">保存二维码</Link>
                        </Button>
                        <Button sx={{ mt: 2 }} variant="contained" color="success">
                            保存后，微信扫一扫
                        </Button>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                    >
                        <span>支付宝（荐）</span>
                        <img src="/images/alipay.jpg" alt="alipay" height={120} />
                        <p>善愿心</p>
                        <Button variant="contained" color="primary">
                            <Link color={"white"} underline="none" href="/images/alipay.jpg" download="alipay.jpg">保存二维码</Link>
                        </Button>
                        <Button variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => {
                                let open_url = "alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx11682leyfqxykxltho4c"
                                if (open_url) open_url && location.assign(open_url)
                            }}
                            color="info">
                            打开支付宝，随喜
                        </Button>
                    </Box>

                </Box>}
                {follow === 'no' && <h2>感谢支持</h2>}
            </Box>
        </Container >
    )
}
