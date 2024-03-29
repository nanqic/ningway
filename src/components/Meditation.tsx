import { Box } from '@mui/material'
import TabsNav, { TabData } from '@/components/TabsNav'
import TitleSearch from '@/pages/TitleSearch'

export default function Meditation() {
  function tabsData() {
    const jingzuo = [{ title: "（一）基 础", codes: ["40588", "21386", "40518", "30919", "50139", "30902", "40504", "32343", "21687", "20306", "21440", "20516", "00028", "40256", "40534", "40535", "31099", "31784", "E0040", "21722", "21618", "20754", "32310", "21367", "20309"] }, { title: "（二）内 观", codes: ["40467", "21091", "31380", "30101", "30285", "32198", "21325", "21772", "21426", "00068", "20756", "31475", "20055", "20585", "20090#t=765", "20167#t=424", "10021", "51160", "10709", "21952", "50468", "22468", "31379", "23446"] }, { title: "（三）呼 吸", codes: ["31098", "30778", "25237", "21570", "32336", "32357", "30809", "31321", "30820", "21644", "22080", "10138", "30783", "30878", "30043", "21571", "10092", "21370", "30220"] }]

    const tabs: Array<TabData> = []
    jingzuo?.forEach((item: { title: string; codes: string[]; }, index: number) => {

      const tab: TabData = {
        label: item.title,
        value: index + 1,
        index: index + 1,
        children: <TitleSearch codes={item.codes} />
      }
      tabs.push(tab)
    })

    return tabs
  }
  return (
    <>
      <TabsNav data={tabsData()} />
    </>
  )
}
