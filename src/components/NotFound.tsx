import { Link, Typography } from "@mui/material";

function NotFound() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            遇到了问题 ？
            <Typography component={"li"} variant='subtitle2'>QQ反馈
                <Link href='https://qm.qq.com/q/EuMCvavDpe'> oningway </Link>(搜索或点击添加)
            </Typography>
        </div>
    );
}

export default NotFound;