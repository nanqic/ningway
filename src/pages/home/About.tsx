import { Box, Container, Link, Typography } from '@mui/material'

export default function About() {
    return (
        <Container>
            <Box sx={{ mx: 1, my: 3 }}>
                <Typography variant="h4">搜索次数限制公告</Typography>
                <ol>
                    <li>由于每个IP地址搜索关键字几十次后就不可以搜了，请优先使用输入时自动出来的<Link href="/search/善行"> 标题搜索</Link>。</li>
                    <li>关键字搜索每人每天限制 10 次。标题搜索可随意使用。</li>
                    <li>若次数没用完却不能搜索，请过段时间再试</li>
                    <li>如果您真的需要更多的搜索次数，请在<Link href="https://less.ningway.com/s/iY5oj1lG">这里</Link> 留言</li>
                </ol>
                <br />
                <ol>
                    <Typography variant='h5'>功能说明</Typography>
                    <br />
                    <li><Typography variant='subtitle2' >输入关键字，回车开始搜索</Typography></li>
                    <li><Typography variant='subtitle2'>点击标题右侧的三角形按钮，播放搜索列表</Typography></li>
                    <li><Typography variant='subtitle2'>点击搜索列表上面的跳过片头开关，可跳过片头片尾</Typography></li>
                    <li><Typography variant='subtitle2'>夜间模式跟随设备系统设置</Typography></li>
                    <li><Typography variant='subtitle2'><Link href="/step/3">次第</Link>、<Link href="/meditation">静坐</Link> 同样可列表播放，点击可切换选项卡</Typography></li>
                </ol>
                <br />
                <Typography variant='h6'>需要<Link href="/help" rel="noopener noreferrer">帮助</Link>？</Typography>
                <Typography variant="body1">要查找音/视频机的编号，请访问
                    <Link href="https://www.ningway.com" target="_blank" rel="noopener noreferrer">旧版网站</Link>
                </Typography>
                <br />
                <br />
                <br />
            </Box>
        </Container >
    )
}
