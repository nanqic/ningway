import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SearchLinks = ({ keywords = [''], list = true }) => {
    const navigate = useNavigate()

    return (<>
        {keywords.map(word => {
            return <Link padding={"2px 4px"} margin={1} border={1} borderRadius={'3px'} width={"fit-content"} key={word} onClick={() => navigate(`/search/${word}${list ? '?list=true' : ''}`)}>{word}</Link>
        })}
    </>)
}
export default SearchLinks