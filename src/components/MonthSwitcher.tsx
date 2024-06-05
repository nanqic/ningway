import TabsNav, { TabData } from '@/components/TabsNav';
import { useSearchParams } from 'react-router-dom';
import HotTag from './HotTag';
import OutLink from '@/hooks/OutLink';

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
                children: i === 0 && !searchParams.get('year') &&
                    <>
                        <HotTag />
                        <OutLink href="download.ziguijia.com/etc/%E3%80%8A%E6%B3%95%E5%8D%8E%E7%BB%8F%E3%80%8B%E8%AE%B2%E4%B9%89%20%5BA%20Teaching%20On%20The%20'Wonderful%20Dharma%20Lotus%20Flower%20Sutra'%5D.pdf?name=%E3%80%8A%E6%B3%95%E5%8D%8E%E7%BB%8F%E3%80%8B%E8%AE%B2%E4%B9%89%20%5BA%20Teaching%20On%20The%20%27Wonderful%20Dharma%20Lotus%20Flower%20Sutra%27%5D.pdf">法华</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E3%80%8A%E9%87%91%E5%88%9A%E7%BB%8F%E3%80%8B%E8%AE%B2%E4%B9%89%20%5BA%20Teaching%20On%20The%20'Diamond%20Sutra'%5D.pdf?name=%E3%80%8A%E9%87%91%E5%88%9A%E7%BB%8F%E3%80%8B%E8%AE%B2%E4%B9%89%20%5BA%20Teaching%20On%20The%20%27Diamond%20Sutra%27%5D.pdf">金刚</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E4%BA%86%E8%A7%A3%E4%BD%9B%E6%95%99%20%5BHistory%20Of%20Buddhism%5D.pdf?name=%E4%BA%86%E8%A7%A3%E4%BD%9B%E6%95%99%20%5BHistory%20Of%20Buddhism%5D.pdf">了解</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E5%AD%A6%E4%B9%A0%E4%BD%9B%E6%B3%95%20%5BStudy%20Buddhism%5D.pdf?name=%E5%AD%A6%E4%B9%A0%E4%BD%9B%E6%B3%95%20%5BStudy%20Buddhism%5D.pdf">学习</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E4%BF%AE%E8%AF%81%E4%BD%9B%E6%B3%95%20%5BPractice%20Buddhism%5D.pdf?name=%E4%BF%AE%E8%AF%81%E4%BD%9B%E6%B3%95%20%5BPractice%20Buddhism%5D.pdf">修证</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E7%99%BE%E6%97%A5%E7%AD%91%E5%9F%BA%20%5BBuilding%20A%20Foundation%20In%20100%20Days%5D.pdf?name=%E7%99%BE%E6%97%A5%E7%AD%91%E5%9F%BA%20%5BBuilding%20A%20Foundation%20In%20100%20Days%5D.pdf">百日</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E6%B3%95%E7%95%8C%E4%B9%8B%E5%BF%83%20%5BHeart%20Of%20Dharma%20Realm%5D.pdf?name=%E6%B3%95%E7%95%8C%E4%B9%8B%E5%BF%83%20%5BHeart%20Of%20Dharma%20Realm%5D.pdf">界心</OutLink>
                        <OutLink href="download.ziguijia.com/etc/%E6%98%9F%E8%B7%AF%20%5BAwaken%20Journey%5D.pdf?name=%E6%98%9F%E8%B7%AF%20%5BAwaken%20Journey%5D.pdf">星路</OutLink>
                    </>
            });
        }
        return tabItems
    }
    return <TabsNav data={tabsData()} onSwitch={handleSwitch} />

}
