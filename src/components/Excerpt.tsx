import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { getRandomNum } from '@/utils/randomUtil';
import excerptList from '@/store/excerpt';
import ShareButton from './ShareButton';


export default function Excerpt(props: { content: string }) {
  const [content, setContent] = React.useState(props.content)

  const handleClick = () => {
    const index = getRandomNum()
    setContent(excerptList[index])
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
            <React.Fragment key={i} >
              {item.length == 0 ? <br /> : <Typography variant='h6' gutterBottom>{item}</Typography>}
            </React.Fragment>
          )
        })}
      </Paper>
    </Box>
  );
}