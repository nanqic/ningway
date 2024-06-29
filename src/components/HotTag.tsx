import { Box, Typography } from '@mui/material'
import SearchLinks from '@/components/SearchLinks'
import { getHotWords } from '@/utils/requestUtil'
import { useContext } from 'react'
import { DbContext } from '@/App'
import useSWR from 'swr'

export default function HotTag() {
    let titles = ['了解@', '学习@', '修证@', '百日', '微博', '视频摘录', '生活', '闲话', '闲聊', '闲谈', '圆满', '清净', '宇宙', '光明']
    const dbContext = useContext(DbContext);

    if (dbContext?.enableSearch) {
        titles = titles.concat(['法华经', '金刚经', '无量寿经', '空性', '法界', '佛教', '佛法',])
    }

    const { data, error, isLoading } = useSWR(dbContext?.enableSearch ? "/api/hotwords" : null, getHotWords)

    if (error) return <div>failed to load data</div>
    if (isLoading) return <div>loading...</div>

    return (
        <Box padding={2} sx={{
            '& div': {
                marginBottom: 2
            }
        }}>
            <Typography variant='h6'>视频标签</Typography>
            <Box
                display={'flex'}
                flexWrap={'wrap'}
            >
                <SearchLinks keywords={titles} query={false} />
            </Box>

            {data && <>
                <Typography variant='h6'>热门搜索</Typography>
                <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    fontSize={"14px"}
                >
                    <SearchLinks keywords={data} />
                </Box>
            </>}
        </Box>
    )
}
