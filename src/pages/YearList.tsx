import TabsNav, { TabData } from "@/components/TabsNav"
import { useSearchParams } from "react-router-dom"
import SearchView from "./SearchView"
import MonthSwitcher from '@/components/MonthSwitcher'

const YearList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSwitch = (value: number) => {
        searchParams.set('year', `${value === 2023 ? '' : value - 2000}`)
        setSearchParams(searchParams)
    }

    const tabsData = () => {
        const tabs: Array<TabData> = []
        for (let i = 2012; i <= 2023; i++) {
            if (i === 2021) continue;
            const tab: TabData = {
                label: i === 2023 ? '所有年份' : i + '',
                value: i,
                index: i,
                children: ''
            }
            tabs.push(tab)
        }

        return tabs
    }
    return (
        <>
            <TabsNav data={tabsData()} onSwitch={handleSwitch} />
            <MonthSwitcher />
            <SearchView />
        </>
    )
}

export default YearList