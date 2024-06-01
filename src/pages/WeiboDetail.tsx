import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { dateFormat } from '@/utils/dateTimeUtil';
import Link from '@mui/material/Link';
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Button, Card } from '@mui/material';
import { Weibo } from '@/utils/types';
import { getWeiboById } from '@/utils/dbUtil';
import { getRandomNum } from '@/utils/randomUtil';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';


export default function WeiboDetail() {
    let { id } = useParams()
    const navigate = useNavigate()

    const [post, setPost] = useState<Weibo>()
    useEffect(() => {
        const findPost = async (id: number) => {
            const post = await getWeiboById(id)
            setPost(post)
        }
        if (id != undefined) {
            findPost(parseInt(id))
        }
    }, [id])
    return (
        <div id='main'>
            {post &&
                <>
                    <Button startIcon={<KeyboardReturnOutlinedIcon/>} onClick={() => navigate(`/weibo`)}>返回列表</Button>
                    <Button sx={{mx:3}} startIcon={<AutoStoriesOutlinedIcon/>} onClick={() => navigate(`/weibo/${getRandomNum(281)}`)}>随机浏览</Button>
                    <WeiboCard {...post} />
                </>
            }
        </div>
    )
}

const CardBox = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        mx: 20,
        my: 5,
    },
    [theme.breakpoints.up('xs')]: {
        p: 1
    },
}))

export function WeiboCard({ id, date, content }: Weibo) {

    const navigate = useNavigate()
    return (
        <CardBox sx={{ my: 1.5 }}>
            <Card sx={{ minWidth: 375, minHeight: 500 }}>
                <CardActions sx={{ fontSize: 12, }}>
                    <Link underline="hover" onClick={() => navigate(`/weibo/${id}`)}>{`${id}、${dateFormat(date || 0)}`}</Link>
                </CardActions>
                <CardContent>
                    <Typography>
                        {content}
                    </Typography>
                </CardContent>
                <img
                    style={{ marginLeft: '1rem', marginBottom: '.5rem' }}
                    width={'400'}
                    src={`https://weibo-ning.netlify.app/static/images/post_${id}.webp`}
                    onError={(e: any) => e.target.style.display = 'none'}
                    loading="eager" />
            </Card>
        </CardBox>
    );
}