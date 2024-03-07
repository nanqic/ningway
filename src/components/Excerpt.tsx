import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { getRandomNum } from '@/utils/randomUtil';
import ShareButton from './ShareButton';
import { Fragment, useState } from 'react';


export default function Excerpt(props: { content: string }) {
  const [content, setContent] = useState(props.content)
  const [excerpts, setExcerpts] = useState(undefined)

  const fetchData = async () => {
    const res = await fetch('/api/excerpt_list.json')
    return await res.json()
  }

  const handleClick = async () => {
    let ex = excerpts
    if (!excerpts) {
      ex = await fetchData()
      setExcerpts(ex)
    }
    const index = getRandomNum()
    ex && setContent(ex[index])
    location.hash = index + ''
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
        {content.split('\n').map((item, i) => {
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