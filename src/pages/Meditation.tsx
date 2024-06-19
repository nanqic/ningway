import TabsNav, { TabData } from '@/components/TabsNav'
import SearchView from '@/pages/SearchView'
import { Button } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useState } from 'react';

const jingzuo = [{ title: "（一）基 础", codes: ["40588", "21386", "40518", "30919", "50139", "30902", "40504", "32343", "21687", "20306", "21440", "20516", "00028", "40256", "40534", "40535", "31099", "31784", "E0040", "21722", "21618", "20754", "32310", "21367", "20309"] }, { title: "（二）内 观", codes: ["40467", "21091", "31380", "30101", "30285", "32198", "21325", "21772", "21426", "00068", "20756", "31475", "20055", "20585", "20090#t=765", "20167#t=424", "10021", "51160", "10709", "21952", "50468", "22468", "31379", "23446"] }, { title: "（三）呼 吸", codes: ["31098", "30778", "25237", "21570", "32336", "32357", "30809", "31321", "30820", "21644", "22080", "10138", "30783", "30878", "30043", "21571", "10092", "21370", "30220"] }]

const Muisc = () => {
  const playlist = [
    { name: '养心静坐 45 分钟', src: '%E5%85%BB%E5%BF%83%E9%9D%99%E5%9D%90_192k.mp3?name=%E5%85%BB%E5%BF%83%E9%9D%99%E5%9D%90_192k.mp3' },
    { name: '海潮音 60 分钟', src: '%E8%80%B3%E6%A0%B9%E5%9C%86%E9%80%9A%EF%BC%88%E6%B5%B7%E6%BD%AE%E9%9F%B3%EF%BC%89_192k.mp3?name=%E8%80%B3%E6%A0%B9%E5%9C%86%E9%80%9A%EF%BC%88%E6%B5%B7%E6%BD%AE%E9%9F%B3%EF%BC%89_192k.mp3' },
    { name: '名号 120 分钟', src: '%E8%80%B3%E6%A0%B9%E5%9C%86%E9%80%9A%EF%BC%88%E8%A7%82%E4%B8%96%E9%9F%B3%E5%90%8D%E5%8F%B7%EF%BC%89_192k.mp3?name=%E8%80%B3%E6%A0%B9%E5%9C%86%E9%80%9A%EF%BC%88%E8%A7%82%E4%B8%96%E9%9F%B3%E5%90%8D%E5%8F%B7%EF%BC%89_192k.mp3' },
    { name: '清洗 180 分钟', src: '%E8%84%89%E8%BD%AE%E6%B8%85%E6%B4%97_192k.mp3?name=%E8%84%89%E8%BD%AE%E6%B8%85%E6%B4%97_192k.mp3' },
    { name: '海潮音 180 分钟', src: '%E8%80%B3%E6%A0%B9%E5%9C%86%E9%80%9A%EF%BC%88%E6%B5%B7%E6%BD%AE%E9%9F%B3%203%E5%B0%8F%E6%97%B6%E7%89%88%EF%BC%89_192k.mp3?name=%E8%80%B3%E6%A0%B9%E5%9C%86%E9%80%9A%EF%BC%88%E6%B5%B7%E6%BD%AE%E9%9F%B3%203%E5%B0%8F%E6%97%B6%E7%89%88%EF%BC%89_192k.mp3' },
    { name: '太极桩 56 分钟', src: '%E5%A4%AA%E6%9E%81%E6%A1%A9_192k.mp3?name=%E5%A4%AA%E6%9E%81%E6%A1%A9_192k.mp3' },
  ]
  const [src, setSrc] = useState('')
  return <>
    {src &&
      <audio
        style={{ width: '90%', margin: '1rem' }}
        controls
        autoPlay
        loop
        controlsList="nodownload"
        src={`https://download.ziguijia.com/etc/${src}`}></audio>}
    {playlist.map(item => {
      return <Button size='large' key={item.src} startIcon={<PlayCircleIcon />}
        onClick={() => setSrc(item.src)}
        sx={{
          display: 'flex',
          color: item.src === src ? 'green' : ''
        }}>{item.name}</Button>

    })}

  </>
}
export default function Meditation() {

  const tabsData = () => {
    const tabs: Array<TabData> = []

    const tabMusic: TabData = {
      label: '音乐',
      value: 0,
      index: 0,
      children: <Muisc />
    }

    jingzuo?.forEach((item: { title: string; codes: string[]; }, index: number) => {
      const tab: TabData = {
        label: item.title,
        value: index + 1,
        index: index + 1,
        children: <SearchView codes={item.codes} />
      }
      tabs.push(tab)
    })
    tabs.push(tabMusic)

    return tabs
  }
  return (
    <>
      <TabsNav data={tabsData()} />
    </>
  )
}
