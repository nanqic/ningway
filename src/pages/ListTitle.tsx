import TabsNav, { TabData } from '@/components/TabsNav';
import SearchView from './SearchView';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ListTitle() {
    const [value, setValue] = useState(1)
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
                children: <SearchView />
            });
        }

        return tabItems
    }
    return (
        <div><TabsNav data={tabsData()} onSwitch={handleSwitch} /></div>
    )
}
