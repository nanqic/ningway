import { getPlaystatSize } from '@/utils/dbUtil'
import { Box, Container, FormControl, InputLabel, Link, MenuItem, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import OutLink from '@/hooks/OutLink';

export default function About() {
    const [follow, setFollow] = useState<string | undefined>('')
    const total: number = getPlaystatSize()
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
                    <Typography component={"li"} variant='subtitle1'>支持日期搜索，格式：<Link onClick={() => navigate(`/search/12-02-02`)}>12-02-02</Link> (点击观看同一天的视频)
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        点击搜索框左边的下拉（三角），可以选择多个年份
                    </Typography>
                    <Typography component={"li"} variant='subtitle1'>
                        搜索编号时，请输入完整5位编
                    </Typography>
                    <Typography component={"li"} variant='body1' color={'green'}>
                        新增播放模式，支持顺序播放，循环播放和随机播放
                    </Typography>
                </ul>
                <details>
                    <summary>捐赠说明</summary>
                    <h3>由于审查原因，使用完整功能需要登录，请按以下方式注册评论系统</h3>
                    <ol>
                        <Typography component={"li"}>滑到下方留言区，依次点击 登录→用户注册</Typography>
                        <Typography component={"li"} marginY={1}>注册示例 （仅供参考，<b>实际请填自己的</b>）
                            昵称: 梵语（将在留言时显示），邮箱: fanyu097@ningway.com(登录时用)，密码: 请自己填写并记好
                        </Typography>
                        <Typography component={"li"}>注册后，请留言或联系邮箱、QQ等，告知您注册的邮箱和捐赠信息（时间、数额、名字，支付平台等，留言别人看不到）</Typography>
                        <Typography component={"li"}>上述信息确认无误后，会通过注册（约有半天延迟）</Typography>
                        <Typography component={"li"}>注册通过后，可使用邮箱和密码登录</Typography>
                        <i>提示：邮箱用本站的 @ningway.com 注册，才可以使用</i>
                    </ol>
                </details>
                {total > 10 && <>
                    <FormControl sx={{ my: 2, minWidth: 120 }}>
                        <InputLabel id="follow-label">是否随喜</InputLabel>
                        <Select
                            label="是否随喜"
                            labelId="follow-label"
                            value={follow}
                            size="medium"
                            onChange={e => setFollow(e.target.value)}>
                            <MenuItem value=''>
                                <em>请选择</em>
                            </MenuItem>
                            <MenuItem value='yes'>
                                前往捐赠
                            </MenuItem>
                            <MenuItem value='no'>
                                不捐赠
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    {follow === 'yes' && <Navigate to={'/donate'} />}
                    {follow === 'no' && <Typography variant='subtitle2'>
                        感谢您的理解和支持，参考 <Link href='cn.bing.com/search?q=子贡赎人'>子贡赎人</Link>的公案
                    </Typography>}
                    <Typography sx={{ mt: 1 }} variant="subtitle2">
                        网站免费使用，可以随喜捐赠。<br />
                    </Typography>
                </>}
            </Box>
            <Typography marginTop={3} variant='h5'>问题反馈</Typography>
            <Typography marginTop={1} variant='body1'>如果发现数据，格式等任何问题，请按下面的方式反馈</Typography>
            <ol>
                <Typography component={"li"} variant='subtitle2'> 您的设备型号，浏览器 </Typography>
                <Typography component={"li"} variant='subtitle2'>出错的网页地址  </Typography>
                <Typography component={"li"} variant='subtitle2'>联系邮箱<OutLink href="mailto:contact@ningway.com"> contact@ningway.com </OutLink>或QQ
                    <OutLink href='qm.qq.com/q/EuMCvavDpe'> oningway </OutLink>
                </Typography>
            </ol>
            <Typography variant='h5'>关于本站</Typography>
            <ul style={{ listStyle: 'circle' }}>
                <li>本站是个人兴趣行为，并非商业组织安排，没有商业收入。</li>
                <li>
                    所有资源均来源于网络，本站仅作整理和收集。
                </li>
                <li>
                    该网站是业余时间制作，因此反馈回复可能会有一定延迟，请您谅解。
                </li>
                <li>代码量统计（仅前端）：<br />added lines: 20346, removed lines: 12490, total lines: 7856, date: 2024-04-23</li>
            </ul>
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
