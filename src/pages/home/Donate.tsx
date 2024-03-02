import { Box, Button, Link, Typography } from '@mui/material'

export default function Donate() {
    return (
        <>
            <Typography textAlign={"center"} margin={1} variant="h6">
                如 <Link href="/video/PTEwNjM0" underline="hover">《普贤行愿品》</Link>所说随喜，<br /> 随喜一分也可获得全部功德。
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
                    <Button onClick={() => window.open("https://www.paypal.com/paypalme/nanhj")}> PayPal</Button>
                </Box>
            </Box>
        </>
    )
}
