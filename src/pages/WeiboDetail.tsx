import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { dateFormat } from '@/utils/dateTimeUtil';
import Link from '@mui/material/Link';
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card } from '@mui/material';
import { Weibo } from '@/utils/types';
import { getWeiboById } from '@/utils/dbUtil';
import { getRandomNum } from '@/utils/randomUtil';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ShareButton from '@/components/ShareButton';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import { ArticleBox } from '@/components/ArticleBox';

export default function WeiboDetail() {
    let id = useParams()['id']
    const navigate = useNavigate()

    const [post, setPost] = useState<Weibo>()
    useEffect(() => {
        const findPost = async (id: number) => {
            const post = await getWeiboById(id)
            setPost(post)
        }
        if (id == undefined) { id = getRandomNum(281) + '' }
        findPost(parseInt(id))
    }, [id])
    return (
        <>
            {post &&
                <>
                    <WeiboCard {...post} />
                    <Box display={'flex'} justifyContent={'space-around'}>
                        {location.pathname.includes('weibo') &&
                            <Button startIcon={<ChromeReaderModeOutlinedIcon />} onClick={() => navigate(`/weibo?page=${(id && Math.ceil(parseInt(id) / 5))}`)}>列表浏览</Button>
                        }
                        <Button startIcon={<AutoStoriesOutlinedIcon />} onClick={() => navigate(`/weibo/${getRandomNum(281)}`)}>换一篇</Button>
                        {location.pathname.includes('weibo') && <ShareButton />}
                    </Box>
                </>
            }
        </>
    )
}

const CardBox = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        mx: 20,
        my: 5,
    }
}))

export function WeiboCard({ id, date, content }: Weibo) {

    const navigate = useNavigate()
    return (
        <ArticleBox>
            <CardBox>
                <Card sx={{
                    minWidth: 335,
                    minHeight: 200,
                }}>
                    <CardActions sx={{ fontSize: 14, pb: 0 }}>
                        <Link underline="hover" onClick={() => navigate(`/weibo/${id}`)}>{`${dateFormat(date || 0)}`}</Link>
                    </CardActions>
                    <CardContent sx={{
                        fontSize: 18,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        {content}
                        <img
                            style={{ paddingTop: '1em' }}
                            src={`https://weibo-ning.netlify.app/static/images/post_${id}.webp`}
                            onError={(e: any) => e.target.style.display = 'none'}
                            loading="eager" />
                    </CardContent>
                </Card>
            </CardBox>
        </ArticleBox>
    );
}