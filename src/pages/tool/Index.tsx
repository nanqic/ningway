import TabsNav from '@/components/TabsNav'
import { searchHead } from '@/store/template'
import { getHotSearch } from '@/utils/requestUtil'
import { SearchData, TabNavProps } from '@/utils/types'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Index() {
    const [message, setMessage] = useState('请节约资源...')
    const [hotData, setHotData] = useState<SearchData[]>([])
    const siteList = [
        { title: "佛慧..", url: "https://www.fohuifayu.com" },
        { title: "明光", url: "https://mingguang.im" },
        { title: "易明..", url: "https://yimingzhiguang.com" },
        { title: "子归家", url: "https://zgj2.ningway.com" },
    ]

    useEffect(() => {
        (async () => {
            setHotData(await getHotSearch())
        })()
    }, [])
    const tabsData = () => {

        const tabs: Array<TabNavProps> = []
        const hotSearchTab: TabNavProps = {
            label: '热搜',
            value: 5,
            index: 5,
            children:
                <>
                    <Typography color={"black"}>
                        点击关键字展开
                    </Typography>
                    {hotData?.map(item => {
                        return (
                            <Box
                                key={item.nick}
                                sx={{
                                    color: '#000',
                                    backgroundColor: '#f0f0f0'
                                }}>

                                <details title='点击展开/收缩' style={{ cursor: "pointer" }}>
                                    <summary>{item.nick?.slice(7)}</summary>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: searchHead + item.orig }} />
                                </details>
                            </Box>
                        )
                    })}
                </>
        }
        siteList.forEach((item, index) => {
            const tab: TabNavProps = {
                label: item.title,
                value: index + 1,
                index: index + 1,
                children:
                    <Box>
                        {message && <Typography variant='h5' margin={1.5}>{message}</Typography>}
                        <iframe style={{
                            border: 'none',
                            height: window.innerHeight < window.innerWidth ? '80vh' : '90vh',
                            width: '100%',
                        }}
                            src={item.url}
                            onLoad={() => setMessage('')}
                        />
                    </Box>

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
