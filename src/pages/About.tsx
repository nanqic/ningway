import { Box, Container, Link, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import OutLink from '@/hooks/OutLink';
import { getPlaystatSize } from '@/utils/dbUtil';
import Excerpt from '@/components/Excerpt';

export default function About() {
    const total: number = getPlaystatSize()

    return (
        <Container>
            <Excerpt
                title='佛子行'
                text={
                    `已获暇满大舟时，为自他渡轮回海，
          日日夜夜不懈怠，闻思修持佛子行。
          `
                } />
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>使用指南</Typography>
                <ul>
                    <Typography variant='subtitle2' sx={{ display: window.innerHeight > window.innerWidth ? "inline-flex" : "none", alignItems: "flex-end" }}>
                        点击<MenuIcon />
                        图标，选择菜单
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        搜索编号时，输入完整5位编号后自动跳转到视频
                    </Typography>
                    <Typography component={"li"} variant='body1'>
                        如需后台播放，请选择画质为音频，仅声音可在后台播放
                    </Typography>
                    <Typography component={"li"} variant='body1'>
                        关闭片头开关，即可跳过片头和片尾
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
            <Typography component={"li"} variant='subtitle2'>邮箱<OutLink href="mailto:contact@ningway.com"> contact@ningway.com </OutLink>
                <OutLink href='jinshuju.net/f/hQVjL2'>问题反馈</OutLink>
            </Typography>
            <hr />
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <OutLink href="ww.ningway.com">&nbsp; 旧版网站</OutLink>
                {total >=3 && <Link href='/donate'>&nbsp; ❤️捐赠支持</Link>}
            </Typography>
            <Typography variant='h6'>参考站点</Typography>
            <Typography component={"li"} variant='subtitle1'>
                <OutLink href="sou.hdcxb.net">法语搜索 </OutLink>
                <OutLink href="www.fahaisouxun.com/search">法海搜寻 </OutLink>
                <OutLink href="www.huidengchanxiu.net/books/b1">禅修教材 </OutLink>
            </Typography>
        </Container>
    )
}
