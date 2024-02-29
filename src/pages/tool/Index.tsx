import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box } from '@mui/material'
import SearchCache from '../search/SearchCache'
import MessageIframe from '@/components/MessageIframe'

export default function Index() {
    const siteList = [
        { title: "佛慧..", url: "https://www.fohuifayu.com" },
        { title: "明光", url: "https://mingguang.im" },
        { title: "易明..", url: "https://yimingzhiguang.com" },
        { title: "子归家", url: "https://zgj2.ningway.com" },
    ]

    const tabsData = () => {

        const tabs: Array<TabNavProps> = []
        const hotSearchTab: TabNavProps = {
            label: '热搜',
            value: 5,
            index: 5,
            children: <SearchCache />
        }
        siteList.forEach((item, index) => {
            const tab: TabNavProps = {
                label: item.title,
                value: index + 1,
                index: index + 1,
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
