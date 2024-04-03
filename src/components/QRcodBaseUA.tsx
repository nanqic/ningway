import { Box } from "@mui/material"
import { DisplayQR } from "./DisplayQR"
import { useEffect } from "react"
import useLocalStorageState from "use-local-storage-state"
import { postCountData } from "@/utils/requestUtil"

function QRcodBaseUA() {
    const [visit, setVisit] = useLocalStorageState<string>('visit_date', { defaultValue: '0' })
    useEffect(() => {
        if (new Date().getDate() >= parseInt(visit)) {
            postCountData('scan QR')
            setVisit(new Date().getDate() + 1 + '')
        }
    }, [])

    if (navigator.userAgent.match(/Alipay/i)) {
        location.assign("alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx11682leyfqxykxltho4c")
    } else if (navigator.userAgent.match(/MicroMessenger\//i)) {
        return <DisplayQR name='微信' url="/images/wechatpay.jpg" />
    } else
        return (
            <Box sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-evenly",

            }}>
                <DisplayQR name='微信' url="/images/wechatpay.jpg" />
                <DisplayQR name='支付宝' url="/images/alipay.jpg" />
            </Box>
        )
}

export default QRcodBaseUA