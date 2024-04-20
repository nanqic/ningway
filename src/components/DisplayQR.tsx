import { Box, Button } from "@mui/material"


interface DisplayQRProps {
    name: string;
    url: string
}

export const DisplayQR = ({ name, url }: DisplayQRProps) => {
    return <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
    >
        <p>{name}支付</p>
        <img src={url} alt={url} height={120} />
        <p>善愿心</p>
        <Button component='a' href={url} download={url} variant='outlined'>
            保存二维码
        </Button>
    </Box>
}