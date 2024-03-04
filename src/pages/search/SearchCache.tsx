import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import DocIframe from '@/components/DocIframe';
import { searchHead } from '@/store/template';
import { Box, } from '@mui/material';
import { SearchItem, getCachedSearch, } from '@/utils/dbUtil';

type SearchLabel = {
    label: string
    index: number
}

export default function SearchCache({ keywords = '' }: { keywords?: string }) {
    const [hotData, setHotData] = useState<SearchItem[]>([])
    const [options, setOptions] = useState<SearchLabel[]>([])
    const loading = options.length === 0;
    const [src, setSrc] = useState<string | undefined>()
    const [value, setValue] = useState({ label: keywords, index: 0 });

    const fetchData = async () => {
        const cache = await getCachedSearch()

        const labelList: SearchLabel[] = cache.data.reverse().map((item, index) => {
            return { index, label: `${index + 1}-${item.keywords}` }
        })
        
        setHotData(cache.data)
        setOptions(labelList)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                margin: 1,
                "& input::-webkit-search-cancel-button": {
                    display: "none",
                },
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
                            // const regx = /<div.class="pagination">(.|\n)*?<\/div>/
                            setSrc(searchHead + hotData[index].comment)
                            setValue(option)
                        }
                    }}
                    loading={loading}
                    renderInput={(params) => <TextField type="search" {...params} label="搜索缓存内容" />}
                />
            </Box>
            <DocIframe src={src || ''} />
        </>
    );
}
