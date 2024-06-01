import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { MenuItem, Select } from '@mui/material';
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import { WeiboCard } from './WeiboDetail';
import { getWeiboList } from '@/utils/dbUtil';
import { Weibo } from '@/utils/types';
import usePagination from '@/hooks/usePagination';

export default function WeiboList() {

    const [weiboList, setWeiboList] = useState<Weibo[]>([])
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        pagi.setCurrentPage(value);
    };
    useEffect(() => {
        const getAllPost = async () => {
            const data = await getWeiboList()
            setWeiboList(data)
        }
        getAllPost()
    }, [])

    const pagi = usePagination(weiboList, rowsPerPage)

    return (
        <List sx={{
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '9px',
        }}>
            {pagi.currentData().map(post => {
                return <WeiboCard key={post.id} {...post} />
            })}
            <Stack sx={{
                flexDirection: 'row',
                justifyContent: 'center',
                my: 2
            }}>
                <Pagination count={pagi.maxPage} page={pagi.currentPage} onChange={handleChange} />
                <Select
                    sx={{
                        maxWidth: '65px',
                        maxHeight: '30px',
                        fontSize: '12px'
                    }}
                    value={rowsPerPage}
                    label={rowsPerPage}
                    size='small'
                    onChange={(e) => setRowsPerPage(parseInt(e.target.value + '', 10))}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </Stack>
        </List>
    )
}