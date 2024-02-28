import TabsNav from '@/components/TabsNav'
import { TabNavProps } from '@/utils/types'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'

export default function Index() {
    const [message, setMessage] = useState('请节约资源...')

    const siteList = [
        { title: "佛慧..", url: "https://www.fohuifayu.com" },
        { title: "明光", url: "https://mingguang.im" },
        { title: "易明..", url: "https://yimingzhiguang.com" },
        { title: "子归家", url: "https://zgj.ningway.com" },
    ]
    const tabsData = () => {
        const tabs: Array<TabNavProps> = []
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
        return tabs
    }
    return (
        <Container>
            <TabsNav data={tabsData()} />
        </Container>
    )
}
