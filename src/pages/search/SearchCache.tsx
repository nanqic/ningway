import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import { SearchData } from '@/utils/types';
import { getHotSearch } from '@/utils/requestUtil';
import DocIframe from '@/components/DocIframe';
import { searchHead } from '@/store/template';
import { Box, Button } from '@mui/material';

type SearchLabel = {
    label: string
    index: number
}

export default function SearchCache({ keywords = '' }: { keywords?: string }) {
    const [hotData, setHotData] = useState<SearchData[]>([])
    const [hotCount, setHotCount] = useState<number>(0)
    const [hotPage, setHotPage] = useState<number>(1)
    const [options, setOptions] = useState<SearchLabel[]>([])
    const loading = options.length === 0;
    const [src, setSrc] = useState<string | undefined>()
    const [value, setValue] = useState({ label: keywords, index: 0 });

    const fetchData = async (page?: number) => {
        const resData = await getHotSearch(page)
        const newData = [...hotData, ...resData.data]
        setHotData(newData)
        setHotCount(resData.count)
        const labelList = newData.map((item: SearchData, index: number) => {
            return { index, label: item.nick.slice(7) }
        })
        setOptions(labelList)
    }
    useEffect(() => {
        fetchData(hotPage)
    }, [hotPage])

    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300, mr: 2 }}
                    value={value}
                    isOptionEqualToValue={(option, value) => {
                        return option.label?.includes(value.label) || false
                    }}
                    onChange={(e, option) => {
                        if (option) {
                            const { index }: { index: number } = option
                            setSrc(searchHead + hotData[index].orig)
                            setValue(option)
                        }
                    }}
                    loading={loading}
                    renderInput={(params) => <TextField {...params} label="搜索缓存内容" />}
                />
                {hotCount > 1 && hotData.length < hotCount && <>还有{hotCount - hotData.length}条缓存， <Button onClick={() => setHotPage(prev => prev + 1)}>加载更多 ... </Button></>}
            </Box>
            <DocIframe src={src || ''} />
        </>
    );
}
