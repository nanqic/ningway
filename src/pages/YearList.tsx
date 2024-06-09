import TabsNav, { TabData } from "@/components/TabsNav"
import { useSearchParams } from "react-router-dom"
import SearchView from "./SearchView"
import MonthSwitcher from '@/components/MonthSwitcher'
import useLocalStorageState from "use-local-storage-state"
import { useEffect } from "react"

export interface ListHistory {
    yearIndex: number;
    monthIndex: number;
}
const YearList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [history, setHistory] = useLocalStorageState<ListHistory>('list_history', { defaultValue: { yearIndex: 0, monthIndex: 0 } })

    let yearIndex = searchParams.get('year') == '22' ? 10 : parseInt(searchParams.get('year') || '') - 11

    const handleSwitch = (value: number) => {
        searchParams.set('year', `${value === 2011 ? '' : value - 2000}`)
        setSearchParams(searchParams)

        yearIndex = value == 2022 ? 10 : value - 2011
        setHistory({ yearIndex, monthIndex: history.monthIndex })
    }

    useEffect(() => {
        if (!searchParams.get('year') || !searchParams.get('month')) {
            searchParams.set('year', `${history.yearIndex === 0 ? '' : history.yearIndex + 11}`)
            searchParams.set('month', `${history.monthIndex === 0 ? '' : history.monthIndex}`)
            setSearchParams(searchParams)
        }
    }, [])

    const tabsData = () => {
        const tabs: Array<TabData> = []
        for (let i = 2011; i <= 2022; i++) {
            if (i === 2021) continue;
            const tab: TabData = {
                label: i === 2011 ? '未选择' : i + '',
                value: i,
                index: i,
            }
            tabs.push(tab)
        }

        return tabs
    }
    return (
        <>
            <TabsNav data={tabsData()} onSwitch={handleSwitch} defaultIndex={yearIndex || history.yearIndex} />
            <MonthSwitcher />
            <SearchView />
        </>
    )
}

export default YearList