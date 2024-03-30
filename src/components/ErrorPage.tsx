import { Button, Link } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';

export default function ErrorPage() {
    return (
        <>出错了，请 <Button startIcon={<RefreshIcon />} onClick={() => location.reload()} >刷新</Button> 或返回<Link href="/"> 主页</Link> </>
    )
}
