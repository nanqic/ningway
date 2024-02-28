import TabsNav from '@/components/TabsNav'
import { searchHead } from '@/store/template'
import { getHotSearch } from '@/utils/requestUtil'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export default function Index() {
    const [message, setMessage] = useState('请节约资源...')
    const [hotData, setHotData] = useState([])
    const siteList = [
        { title: "佛慧..", url: "https://www.fohuifayu.com" },
        { title: "明光", url: "https://mingguang.im" },
        { title: "易明..", url: "https://yimingzhiguang.com" },
        { title: "子归家", url: "https://zgj.ningway.com" },
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
                    <Typography>
                    点击展开搜索结果
                    </Typography>
                    {hotData?.map(item => {
                        return (
                            //@ts-ignore
                            <details title='点击展开/收缩' style={{ cursor: "pointer" }} key={item.nick}>
                                <summary>{item.nick?.slice(7)}</summary>
                                <div
                                    //@ts-ignore
                                    dangerouslySetInnerHTML={{ __html: searchHead + item.orig }} />
                            </details>
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
        <Container>
            <TabsNav data={tabsData()} />
        </Container>
    )
}
