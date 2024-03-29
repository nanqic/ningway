import List from '@mui/material/List';
import { EmptinessTheme } from "@/utils/types";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Box, Divider, Link, Stack } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { getUri } from '@/utils/requestUtil';
import ShareButton from '@/pages/common/ShareButton';


export default function EmptyList() {
    const navigate = useNavigate()
    const [themes, setThemes] = useState<EmptinessTheme[][]>()
    useEffect(() => {
        getUri('emptiness/empti_list.json')
            .then(json => setThemes(json))
    }, [])
    const ListThemeInfo = (props: { theme: EmptinessTheme[] }) => {
        return (
            <List>
                {props.theme.map((themeItem, index) => (
                    <Stack key={index}
                        spacing={2}>
                        <Link onClick={() => navigate(`/emptiness/${themeItem.detail}?keywords=${themeItem.title}`)}>
                            {`《${themeItem.title}》`}
                        </Link>
                        <Typography variant={'subtitle2'}>
                            总时长：{themeItem.totalTime}小时
                        </Typography>
                        <Typography variant={'subtitle2'}>
                            视频数量：{themeItem.amount}
                        </Typography>
                    </Stack>
                ))}
            </List>
        )
    }
    const ListThemes = () => {
        return (
            <>{themes &&
                themes.map((theme, index) => {
                    return (
                        <Fragment key={index}>
                            <Typography variant={"h6"}>{`第${index + 1}期`}</Typography>
                            <ListThemeInfo theme={theme} />
                            <Divider sx={{ my: 2 }} />
                        </Fragment>
                    )
                })
            }</>
        )
    }

    return (
        <Box margin={2}>
            <ListThemes />
            <Link paddingRight={5} href={'/store/空性12期全.html'} target='_blank'>访问经典版</Link>
            <ShareButton name='分享本页' />
        </Box>
    )
}
