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
                <Typography variant='h5'>反馈回应</Typography>
                <ol>
                    <li>记住上次打开的页面和本地收藏功能已实现✔️</li>
                    <li>暂时不会出手机app，原因如下：</li>
                    <ul>
                        <li>开发周期长，个人能力和时间有限</li>
                        <li>app能实现的功能，网站基本都有</li>
                        <li>苹果应用商店难上架❎</li>
                    </ul>
                    <li>选择了年份，月份选“未选择”，月播放完了会自动跳转到下个月✔️</li>
                    <li>
                        列表播放视频，年份未选择，仅选择月份时，播放所有年份的当月视频
                    </li>
                    <li>超过2倍速播放的需求不多，暂不添加❎</li>
                </ol>
            </Box>
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>使用指南</Typography>
                <ul>
                    <Typography variant='subtitle2' sx={{ display: window.innerHeight > window.innerWidth ? "inline-flex" : "none", alignItems: "flex-end" }}>
                        点击<MenuIcon />
                        图标，选择菜单
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        点亮❤️收藏视频，可在收藏中播放视频列表
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        输入5位编号后，自动跳转对应视频
                    </Typography>
                    <Typography component={"li"} variant='body1'>
                        关闭片头开关，即可跳过片头和片尾
                    </Typography>
                    <Typography component={"li"} variant='body1'>
                        画质选择音频时，可在后台播放。
                    </Typography>
                    <Typography component={"li"} variant='body1'>
                        如需在微信中后台播放，须按以下步骤：
                        <details>
                            <summary>查看步骤</summary>
                            <ol>
                                <li>视频下方的画质选择 音频</li>
                                <li>点击右上角 ···</li>
                                <li>左下角点 浮窗</li>
                            </ol>
                            <img width={'300'} src="/images/image_wx_bgplay.webp" />
                        </details>
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
                    网站是业余维护的，因此反馈回复会有延迟，请您谅解。
                </li>
            </ul>
            <Typography component={"li"} variant='subtitle2'>邮箱<OutLink href="mailto:contact@ningway.com"> contact@ningway.com </OutLink>
                <OutLink href='jinshuju.net/f/hQVjL2'>&nbsp; 问题反馈</OutLink>
                {total >= 3 && <Link href='/donate'>&nbsp; ❤️捐赠支持</Link>}
            </Typography>
            <hr />
            <Typography sx={{ m: 2 }} variant="subtitle2">查找音/视频机的编号，请访问
                <OutLink href="ww.ningway.com">旧版网站</OutLink><br />
            </Typography>
            <Typography variant='h6'>参考站点</Typography>
            <Typography variant='subtitle1'>
                <OutLink href="sou.hdcxb.net">法语搜索 </OutLink>
                <OutLink href="www.fahaisouxun.com/search">法海搜寻 </OutLink>
                <OutLink href="www.huidengchanxiu.net/books/b1">禅修教材 </OutLink>
            </Typography>
        </Container>
    )
}
