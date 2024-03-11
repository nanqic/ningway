import { Box, Link } from '@mui/material'
import SearchLinks from '@/components/SearchLinks'

export default function ClassicNav() {
    const titles = ['法华经', '金刚经', '无量寿经', '百日', '空性', '佛教', '佛法', '微博', '二零零九年佛教史略讲']
    return (
        <Box>
            <Box ml={2}><SearchLinks keywords={titles} wrap />
                <Link href={'https://ziguijia.com/download/awaken-journey'} target='_blank'>星路</Link> <br />
                <Link href={'https://ziguijia.com/download/heart-of-dharma-realm'} target='_blank'>法界之心</Link>
            </Box>
        </Box>
    )
}
