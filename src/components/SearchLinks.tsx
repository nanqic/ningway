import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SearchLinks = ({ keywords = [''], query = true }) => {
    const navigate = useNavigate()

    return (<>
        {keywords.map(word => {
            return <Link display='inline-block' padding={"2px 4px"} marginTop={'4px'} marginLeft={1} border={1} noWrap borderRadius={'3px'} width={"fit-content"} key={word} onClick={() => navigate(`/search?${query ? 'query' : 'title'}=${word}`)}>{word}</Link>
        })}
    </>)
}
export default SearchLinks