import { Box, Link, Typography } from '@mui/material'
import SearchLinks from '@/components/SearchLinks'
import { getHotWords } from '@/utils/requestUtil'
import { useEffect, useState } from 'react'

export default function ClassicNav() {
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
                <SearchLinks keywords={titles} />
            </Box>
            {words && <>
                <Typography variant='h6'>热门搜索</Typography>
                <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    fontSize={"12px"}
                    sx={{
                        'a': { m: .5 }
                    }}
                >
                    <SearchLinks keywords={words} list={false} />
                </Box>
            </>}
            <Typography variant='h6'>有声读物</Typography>
            <Box>
                <Link href={'https://ziguijia.com/download/awaken-journey'} target='_blank'>星路</Link> <br />
                <Link href={'https://ziguijia.com/download/heart-of-dharma-realm'} target='_blank'>法界之心</Link>
            </Box>
        </Box>
    )
}
