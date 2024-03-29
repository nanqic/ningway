import TabsNav, { TabData } from '@/components/TabsNav';
import TitleSearch from './TitleSearch';
import { useState } from 'react';

export default function ListTitle() {
    const [value, setValue] = useState(1)
    const tabsData = () => {
        const tabItems: TabData[] = []
        for (let i = 1; i <= 12; i++) {
            tabItems.push({
                label: i + '月',
                value: i,
                index: i,
                children: <TitleSearch month={value} />
            });
        }

        return tabItems
    }
    return (
        <div><TabsNav data={tabsData()} onSwitch={setValue} /></div>
    )
}
