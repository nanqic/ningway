import { Box, Container, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import OutLink from '@/hooks/OutLink';

export default function About() {
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
                    <Typography component={"li"} variant='subtitle1'>日期搜索格式：<Link onClick={() => navigate(`/search/12-02-02`)}>12-02-02</Link>
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        搜索编号时，请输入完整5位编
                    </Typography>
                    <Typography component={"li"} variant='body1'>
                        播放模式：顺序播放，循环播放,随机播放
                    </Typography>
                </ul>
            </Box>
            <Typography variant='h5'>关于本站</Typography>
            <ul style={{ listStyle: 'circle' }}>
                <li>本站是个人兴趣行为，并非商业组织安排。</li>
                <li>
                    所有资源均来源于网络，本站仅作整理和收集。
                </li>
                <li>
                    网站业余维护，反馈回复会有延迟，请您谅解。
                </li>
            </ul>
            <Typography component={"li"} variant='subtitle2'>邮箱<OutLink href="mailto:contact@ningway.com"> contact@ningway.com </OutLink></Typography>

            <hr />
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <OutLink href="ww.ningway.com"> 旧版网站</OutLink>
            </Typography>
            <Typography variant='h6'>参考站点</Typography>
            <Typography component={"li"} variant='subtitle1'>
                <OutLink href="sou.hdcxb.net">法语搜索 </OutLink>
                <OutLink href="www.fahaisouxun.com/search">法海搜寻 </OutLink>
                <OutLink href="www.huidengchanxiu.net/books/b1">禅修教材 </OutLink>
                <OutLink href="cxbbj.huidengchanxiu.net">禅修笔记 </OutLink>
            </Typography>
        </Container>
    )
}
