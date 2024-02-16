import { Box, Container, Link, Typography } from '@mui/material'

export default function About() {
    return (
        <Container>
            <Box sx={{ mx: 1,my:3}}>
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
            <Typography variant='h6'>
                <Link href="https://www.ningway.com" target="_blank" rel="noopener noreferrer">旧版网站</Link>
            </Typography>
            </Box>
        </Container >
    )
}
