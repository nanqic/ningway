import { Box, Container, Link, Typography } from '@mui/material'

export default function About() {
    return (
        <Container>
            <Box sx={{ mx: 1, my: 3 }}>
                <Typography variant='h5'>关键字搜索</Typography>
                <ul>
                    <li><Typography variant='subtitle2' >输入关键字后，回车或点击搜索</Typography> </li>
                    <li>请优先使用输入时自动出来的<Link href="/search/善行"> 标题搜索</Link>。</li>
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
                <Typography variant='h5'>需要<Link href="/help" rel="noopener noreferrer">帮助</Link>？</Typography>
                <ul>
                    <li><Typography variant="body1">要查找音/视频机的编号，请访问
                        <Link href="https://www.ningway.com" target="_blank" rel="noopener noreferrer">旧版网站</Link>
                    </Typography>
                    </li>
                    <li><Typography>搜索次数不够？关键词搜索使用频率<Link href="https://less.ningway.com/s/iY5oj1lG">问卷反馈</Link></Typography>
                    </li>
                </ul>
            </Box>
        </Container >
    )
}
