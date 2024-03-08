import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SearchLinks = ({ keywords = [''], wrap = false }) => {
    const navigate = useNavigate()

    return (<>
        {keywords.map(word => {
            return <Link padding={"2px 4px"} marginY={1} border={1} borderRadius={'3px'} width={"fit-content"} display={`${wrap && 'block'}`} fontWeight={"bold"}  fontSize={`${wrap ? '1.2rem' : '1rem'}`} underline="hover" key={word} onClick={() => navigate(`/search/${word}?list=true`)}>{word}</Link>
        })}
    </>)
}
export default SearchLinks