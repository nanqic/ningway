import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            需要 <Link onClick={() => navigate('/about')}>帮助</Link> ？
        </div>
    );
}

export default NotFound;