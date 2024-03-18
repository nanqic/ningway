import { VserchCount, getVsearchCount } from '@/utils/dbUtil'
import { Box, Button, Link, Typography } from '@mui/material'
import NotFound from './NotFound'
import { postCountData } from '@/utils/requestUtil'


export default function Donate() {
    const count: VserchCount = getVsearchCount()

    if (count?.total < 7) {
        return <NotFound />
    }

    if (count.visitDate - (new Date().getDate()) >= 3) {
        postCountData(true)
    }
    return (
        <>
            <Box display={"flex"} alignItems={"center"}>
                <Button sx={{ m: 1 }} variant="outlined" size="small" onClick={() => history.go(-1)}> 返回</Button>
                上一个页面
            </Box>
            <Typography variant='h5' textAlign={"center"}>本站已帮您搜索关键字{count.total}次</Typography>
            <Typography textAlign={"center"} margin={1} variant="h6">
                勤劳如山王，不如积微福。<br />
                感恩能为大家服务。
            </Typography>
            <Box sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-evenly",

            }}>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <span>微信支付</span>
                    <img src="/images/wechatpay.jpg" alt="wechatpay" height={120} />
                    <p>善愿心</p>
                    <Button variant="contained" color="inherit">
                        <Link underline="none" href="/images/wechatpay.jpg" download="wechatpay.jpg">保存二维码</Link>
                    </Button>
                    <Button sx={{ mt: 2 }} variant="contained" color="success">
                        微信扫一扫
                    </Button>
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <span>支付宝（荐）</span>
                    <img src="/images/alipay.jpg" alt="alipay" height={120} />
                    <p>善愿心</p>
                    <Button variant="contained" color="inherit">
                        <Link underline="none" href="/images/alipay.jpg" download="alipay.jpg">保存二维码</Link>
                    </Button>
                    <Button variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => {
                            let open_url = "alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx11682leyfqxykxltho4c"
                            if (open_url) open_url && location.assign(open_url)
                        }}
                        color="info">
                        打开支付宝
                    </Button>
                    <Button onClick={() => alert('PayPal捐赠请联系邮箱')}> PayPal</Button>
                </Box>
            </Box>
            <Typography textAlign={"center"} sx={{ mt: 2 }} variant="subtitle2">
                内容来自老师的布施，和师兄们的付出。<p />
                愿浏览过此网站的人都能发菩提心，<br />
                愿我们的点滴善行融入诸佛的功德海，<br />
                愿众生都能信佛所说，早日获得生命大自在。<br />
                最后让我们一起念<Link href='/video/PUcwMDE4?t56' target="_blank">《佛说无量寿经》回向文</Link>
            </Typography>
        </>
    )
}
