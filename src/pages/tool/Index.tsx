import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Link } from '@mui/material'
import SearchCache from '../search/SearchCache'
import MessageIframe from '@/components/MessageIframe'
import SearchLinks from '@/components/SearchLinks'

export default function Index() {
    const siteList = [
        // { title: "佛慧..", url: "https://www.fohuifayu.com" },
        // { title: "明光", url: "https://mingguang.im" },
        // { title: "易明..", url: "https://yimingzhiguang.com" },
        { title: "子归家", url: "https://zgj.ningway.com" },
    ]

    const ClassicNav = () => {
        const titles = ['法华经', '金刚经', '无量寿经', '百日', '空性', '佛教', '佛法', '微博', '二零零九年佛教史略讲']
        return <Box ml={2}><SearchLinks keywords={titles} wrap />
            <Link href={'https://ziguijia.com/download/awaken-journey'} target='_blank'>星路</Link> <br />
            <Link href={'https://ziguijia.com/download/heart-of-dharma-realm'} target='_blank'>法界之心</Link>
        </Box>
    }

    const tabsData = () => {
        const tabs: Array<TabNavProps> = []
        const hotSearchTab: TabNavProps = {
            label: '热搜',
            value: 5,
            index: 5,
            children: <SearchCache />
        }
        const navTab: TabNavProps = {
            label: '导航',
            value: 1,
            index: 1,
            children: <ClassicNav />
        }
        tabs.push(navTab)

        siteList.forEach((item, index) => {
            const tab: TabNavProps = {
                label: item.title,
                value: index + 2,
                index: index + 2,
                children:
                    <MessageIframe src={item.url} />
            }
            tabs.push(tab)
        })
        tabs.push(hotSearchTab)
        return tabs
    }
    return (
        <Box>
            <TabsNav data={tabsData()} />
        </Box>
    )
}
