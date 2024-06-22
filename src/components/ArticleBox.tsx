import { styled } from '@mui/material'

export const ArticleBox = styled('div')(({ theme }) => ({
    margin: '15px 10px',
    padding: '5px 10px',
    maxWidth: '100%',
    borderStyle: 'solid',
    WebkitBorderImage: theme.palette.mode === 'dark' ? 'url("/images/border-dark-640.png") 45 15 fill stretch' : 'url("/images/border-640.png") 45 15 fill stretch',
    borderWidth: '25px 8px',
    backgroundColor: 'rgb(255, 169, 33)',
    boxSizing: 'border-box',
    fontSize: '20px',
    lineHeight: '2rem',
    fontFamily: 'SimSun, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", sans-serif'
}));
