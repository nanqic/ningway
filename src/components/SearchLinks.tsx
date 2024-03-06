import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SearchLinks = ({ keywords = [''], wrap = false }) => {
    const navigate = useNavigate()

    return (<>
        {keywords.map(word => {
            return <Link padding={"2px 4px"} marginY={.3} border={1} borderRadius={'3px'} width={"fit-content"} display={`${wrap && 'block'}`} color={`${wrap ? 'gold' : '#64b5f6'}`} underline="hover" key={word} onClick={() => navigate(`/search/${word}?list=true`)}>{word}</Link>
        })}
    </>)
}
export default SearchLinks