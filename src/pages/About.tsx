import { Box, Container, Link, Typography } from '@mui/material'
import OutLink from '@/hooks/OutLink';
import { getPlaystatSize } from '@/utils/dbUtil';
import Excerpt from '@/components/Excerpt';
import MyAds from '@/components/MyAds';

export default function About() {
    const total: number = getPlaystatSize()
    const adList = [
        { text: '今生修行的重点与归宿', url: 'https://box.hdcxb.net/其他资料/a/sound/前行/今生修行的重點和歸宿' },
        { text: '正法念处经', url: 'https://box.hdcxb.net/其他资料/a/sound/前行/《正法念處經》' },
        { text: '了凡四训', url: 'https://box.hdcxb.net/其他资料/a/sound/了凡四訓' },
        { text: '思维无常 公案', url: 'https://box.hdcxb.net/其他资料/a/sound/前行/思维无常-公案' },
        { text: '收听有声书', url: 'https://mp3.ningway.com/guest' },
    ]

    return (
        <Container>
            <Excerpt
                title='佛子行'
                text={
                    `已获暇满大舟时，为自他渡轮回海，
                     日日夜夜不懈怠，闻思修持佛子行。`
                } />
            <Box sx={{ mx: 1, mt: 3 }}>
                <Typography variant='h5'>使用指南</Typography>
                <ul>
                    <MyAds ads={[
                        { text: '画质选择仅声音时，可在后台播放' },
                        { text: '播放模式可选择循环和随机播放' },
                        { text: '点击日期播放同一天的视频' },
                        { text: '点击片头开关，即可跳过片头和片尾' },
                        { text: '点亮⭐即可收藏视频' },
                        { text: '月份未选择时，播放所有月份的视频' }
                    ]} label='提示' />
                    <Typography component={"li"} variant='subtitle1'>
                        输入5位编号后，自动跳转对应视频
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        视频播放结束，跳转到下一个视频是暂停的，用户必须要点击才能触发播放，这是微信的限制，用浏览器打开即可
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
                    网站业余维护，因此反馈回复会有延迟，请您谅解。
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
            <MyAds ads={adList} />
        </Container>
    )
}
