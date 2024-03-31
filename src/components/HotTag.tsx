import { Box, Typography } from '@mui/material'
import SearchLinks from '@/components/SearchLinks'
import { getHotWords } from '@/utils/requestUtil'
import { useEffect, useState } from 'react'

export default function HotTag() {
    const titles = ['法华经', '金刚经', '无量寿经', '百日', '空性', '佛教', '佛法', '微博', '视频摘录', '佛教史']

    const [words, setWords] = useState<string[]>()
    useEffect(() => {
        (async () => {
            setWords(await getHotWords())
        })()
    }, [])

    return (
        <Box padding={2} sx={{
            '& div': {
                marginBottom: 2
            }
        }}>
            <Typography variant='h6'>视频列表</Typography>
            <Box
                display={'flex'}
                flexWrap={'wrap'}
            >
                <SearchLinks keywords={titles} query={false} />
            </Box>
            {words && <>
                <Typography variant='h6'>热门搜索</Typography>
                <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    fontSize={"14px"}
                >
                    <SearchLinks keywords={words} />
                </Box>
            </>}
        </Box>
    )
}
