import TabsNav, { TabData } from '@/components/TabsNav';
import { useSearchParams } from 'react-router-dom';

export default function MonthSwitcher() {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSwitch = (value: number) => {
        searchParams.set('month', `${value}`)
        setSearchParams(searchParams)
    }
    const tabsData = () => {
        const tabItems: TabData[] = []
        for (let i = 1; i <= 12; i++) {
            tabItems.push({
                label: i + '月',
                value: i,
                index: i,
                children: <></>
            });
        }
        return tabItems
    }
    return <TabsNav data={tabsData()} onSwitch={handleSwitch} />

}
