import TabsNav, { TabData } from "@/components/TabsNav"
import { useSearchParams } from "react-router-dom"
import SearchView from "./SearchView"
import MonthSwitcher from '@/components/MonthSwitcher'
import useLocalStorageState from "use-local-storage-state"
import { memo, useEffect } from "react"
import BackToPrevious from "@/components/BackToPrevious"

export interface ListHistory {
    yearIndex: number;
    monthIndex: number;
}
const YearList = memo(() => {
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
            if (history.yearIndex != 0) {
                searchParams.set('year', `${history.yearIndex === 10 ? '22' : history.yearIndex + 11}`)
            }
            if (history.monthIndex != 0) {
                searchParams.set('month', history.monthIndex + '')
            }
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
            <BackToPrevious />
            {(searchParams.get('year') || searchParams.get('month')) && <SearchView />}
        </>
    )
})

export default YearList