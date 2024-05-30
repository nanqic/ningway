import { Box } from "@mui/material"
import { DisplayQR } from "./DisplayQR"

function QRcodBaseUA() {
    return (
        <Box sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-evenly",

        }}>
            <DisplayQR name='微信' url="/images/wechatpay_business.jpg" />
            <DisplayQR name='支付宝' url="/images/alipay.jpg" />
        </Box>
    )
}

export default QRcodBaseUA