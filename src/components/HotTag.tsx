import { Box, Typography } from '@mui/material'
import SearchLinks from '@/components/SearchLinks'
import { getHotWords } from '@/utils/requestUtil'
import { useContext, useEffect, useState } from 'react'
import { DbContext } from '@/App'

export default function HotTag() {
    let titles = ['百日','微博', '视频摘录', '佛教史', '闲话', '闲聊', '闲谈', '圆满', '清净',  '宇宙', '光明']
    const dbContext = useContext(DbContext);

    if (dbContext?.enableSearch) {
        titles = titles.concat(['法华经', '金刚经', '无量寿经', '空性','法界', '佛教', '佛法', ])
    }
    const [words, setWords] = useState<string[]>()
    useEffect(() => {
        (async () => {
            dbContext?.enableSearch && setWords(await getHotWords())
        })()
    }, [])

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
