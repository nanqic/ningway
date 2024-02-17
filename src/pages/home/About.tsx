import { Box, Container, Link, Typography } from '@mui/material'

export default function About() {
    return (
        <Container>
            <Box sx={{ mx: 1, my: 3 }}>
                <Typography variant="h4">每日搜索次数限制公告</Typography>
                <ol>
                    <li>由于每台服务器 IP 搜索几十次后会被禁止访问，请大家节约资源，优先使用打完字自动出来的标题搜索，把字幕关键字搜索留给更需要的人。</li>
                    <li>关键字搜索每人每天限制 10 次。标题搜索可随意使用，不占用资源。</li>
                    <li>有过捐赠的，如果您希望有额外的搜索次数，请在<Link href="https://less.ningway.com/s/iY5oj1lG">这里</Link> 留言</li>
                    <li>如果您的捐赠只是为了利益他人，请忽略</li>
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
                <Typography variant="body1">如果需要查找音频机或视频机的编号，请访问
                    <Link href="https://www.ningway.com" target="_blank" rel="noopener noreferrer">旧版网站</Link>
                </Typography>
                <br />
                <br />
                <Typography variant="h6">
                    恒常念诵愿文
                </Typography>
                <Typography variant="subtitle1">
                    愿我乃至生生世世中
                    获得具足七德之善趣<br />
                    愿我出生立即遇正法
                    具有如理修持之自由<br />
                    愿我能令上师生欢喜
                    日日夜夜之中行正法<br />
                    愿我悟法后修精华义
                    彼生越过三有之大海<br />
                    愿我能为众生传妙法
                    成办他利无有厌倦心<br />
                    愿我能以无偏大事业
                    令诸有情一同成正觉<br />
                </Typography>
                <br />

            </Box>
        </Container >
    )
}
