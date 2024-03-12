import { Button } from "@mui/material";

function NotFound() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            遇到了问题 ？<Button size='small' onClick={() => alert('QQ反馈群：54595190，备注宁路')}>点击</Button>反馈
        </div>
    );
}

export default NotFound;