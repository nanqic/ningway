import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { getRandomNum } from '@/utils/randomUtil';
import ShareButton from './ShareButton';
import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


export default function Excerpt(props: { content: string }) {
  const [excerpts, setExcerpts] = useState<string[]>()
  let location = useLocation()
  let hash_index: number = parseInt(location.hash.slice(1))
  const [content, setContent] = useState(Number.isNaN(hash_index) ? props.content : '')

  const fetchData = async () => {
    const res = await fetch('/api/excerpt_list.json')
    const ex = await res.json()
    setExcerpts(ex)
  }

  useEffect(() => {
    if (hash_index <= 12 && hash_index > 0) {
      if (!excerpts) {
        fetchData()
      }
      excerpts && setContent(excerpts[hash_index])
    }
  }, [location.hash, excerpts])


  const handleClick = () => {
    window.location.hash = getRandomNum(12, hash_index) + ''
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Paper elevation={0} square sx={{
        my: 3,
        '& p': { mt: 3, lineHeight: 1 }
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          maxWidth: '392px',
          alignItems: 'center',
          mb: 1.5
        }}>
          <Typography variant='h5' sx={{ cursor: "pointer" }}
            onClick={handleClick}
          >佛子行</Typography>
          <AutorenewIcon
            sx={{
              ml: 1,
              mr: 3,
              "&:hover": {
                color: 'green'
              },
              cursor: 'pointer'
            }}
            onClick={handleClick}
          />
          {location.hash.length > 0 && <ShareButton />}
        </Box>
        {content?.split('\n').map((item, i) => {
          return (
            <Fragment key={i} >
              {item.length > 0 && <Typography variant='h6' gutterBottom>{item}</Typography>}
            </Fragment>
          )
        })}
      </Paper>
    </Box>
  );
}