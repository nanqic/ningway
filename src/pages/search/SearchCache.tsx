import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { SearchData } from '@/utils/types';
import { getHotSearch } from '@/utils/requestUtil';
import MessageIframe from '@/components/MessageIframe';
import { createSrc, searchHead } from '@/store/template';

export default function SearchCache({ keywords = '' }: { keywords?: string }) {
    const [hotData, setHotData] = useState<SearchData[]>([])
    const [options, setOptions] = useState<[]>([])
    const [src, setSrc] = useState<string | undefined>()

    useEffect(() => {
        (async () => {
            const data = await getHotSearch()
            setHotData(data)
            const labelList = data.map((item: SearchData, index: number) => { return { index, label: item.nick.slice(7) } })
            setOptions(labelList)
        })()
    }, [])

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: 300 }}
                autoHighlight
                value={{ label: keywords, index: 0 }}
                isOptionEqualToValue={(option, value) => {
                    return option.label?.includes(value.label) || false
                }}
                onChange={(e, option) => {
                    if (option) {
                        const { index }: { index: number } = option
                        setSrc(createSrc(searchHead + hotData[index].orig))
                    }
                }}
                renderInput={(params) => <TextField {...params} label="搜索缓存内容" />}
            />
            {src && <MessageIframe src={src} />}
        </>
    );
}
