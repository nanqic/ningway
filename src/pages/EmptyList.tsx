import List from '@mui/material/List';
import { useNavigate } from "react-router-dom";
import { Divider, ListItemButton } from '@mui/material';
import empinessTheme from '@/store/emptiness';
import { blue } from '@mui/material/colors';


export default function EmptyList() {
    const navigate = useNavigate()

    return (
        <div onClick={e => e.stopPropagation()}>

            {
                empinessTheme.map(({ title, codes }, index) => (
                    <List key={index} sx={{ color: blue[400] }}>
                        <ListItemButton
                            onClick={() => navigate(`/search?codes=${codes.join(',')}&title=${title}`)}
                        >
                            {`《${title}》`}
                        </ListItemButton>
                        <Divider sx={{ mt: 2 }} />
                    </List>
                ))
            }
        </div>
    )
}
