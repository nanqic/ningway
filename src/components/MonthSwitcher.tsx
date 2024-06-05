import TabsNav, { TabData } from '@/components/TabsNav';
import { useSearchParams } from 'react-router-dom';

export default function MonthSwitcher() {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSwitch = (value: number) => {
        searchParams.set('month', `${value === 0 ? '' : value}`)
        setSearchParams(searchParams)
    }
    const tabsData = () => {
        const tabItems: TabData[] = []
        for (let i = 0; i <= 12; i++) {
            tabItems.push({
                label: i === 0 ? '未选择' : i + '月',
                value: i,
                index: i,
                children: ''
            });
        }
        return tabItems
    }
    return <TabsNav data={tabsData()} onSwitch={handleSwitch} />

}
