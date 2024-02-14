import { Container, Link, Typography } from '@mui/material'

export default function About() {
    return (
        <Container sx={{ m: 3, fontSize: '13px' }}>
            <ol>
                <Typography variant='h5'>功能说明</Typography>
                <br />
                <Typography variant='h6'>关键字搜索已恢复，有可能无常</Typography>
                <li><Typography variant='subtitle2' >输入关键字，回车或换行搜索（手机输入界面右下角 前往 或 开始 ）</Typography></li>
                <li><Typography variant='subtitle2'>目前可搜索视频标题或编号，也可搜经书名</Typography></li>
                <li><Typography variant='subtitle2'>点击搜索列表的标题，跳转到官网播放</Typography></li>
                <li><Typography variant='subtitle2'>点击标题右侧的三角形按钮，在本站播放搜索列表</Typography></li>
                <li><Typography variant='subtitle2'>点击搜索列表上面的跳过片头开关，可跳过片头片尾</Typography></li>
                <li><Typography variant='subtitle2'>夜间模式跟随设备系统设置</Typography></li>
                <li><Typography variant='subtitle2'><Link href="/step/3">次第</Link>、<Link href="/meditation">静坐</Link> 同样可列表播放，点击可切换选项卡</Typography></li>
            </ol>
            <br />
            <br />
            <Typography variant='h6'><Link href="/help" rel="noopener noreferrer">使用帮助</Link></Typography>
            <Typography variant='h6'><Link href="https://less.ningway.com/s/FHRSPu9E" target="_blank" rel="noopener noreferrer">问题反馈</Link></Typography>
            <br />
            <br />
            <Typography variant="h6">
                恒常念诵愿文
            </Typography>
            <Typography variant="subtitle2">
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
            <Typography variant='subtitle2'>不要伤害众生，不要舍弃自己的道路，不要扰乱其他人的心。</Typography>
            <br />
            <Typography variant='h6'>
                <Link href="https://www.ningway.com" target="_blank" rel="noopener noreferrer">旧版网站</Link>
            </Typography>

        </Container >
    )
}
