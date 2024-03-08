import { searchHead } from '@/store/template';
import { fetchComment, postKeywords } from '@/utils/requestUtil';
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import DocIframe from '@/components/DocIframe';
import { countVsearch } from '@/utils/dbUtil';
import { isLegalKeywords } from '@/utils/randomUtil';
import NotFound from '@/components/NotFound';

export default function ProxySearch() {
  const [src, setSrc] = useState<string>()
  let { keywords } = useParams();
  const [message, setMessage] = useState<string>("")
  const [searchParams, _] = useSearchParams()
  const page = searchParams.get('page')
  const { state } = useLocation();
  const navigate = useNavigate()
  let url = searchParams.get('url')

  if (!isLegalKeywords(keywords) || url?.trim().length == 0
  ) {
    return <><NotFound /> {keywords}{url}</>
  }

  const fetchHtml = async (keywords: string) => {
    // state true ：搜索过关键字且没有缓存
    if (!state) {
      const res = await fetchComment(keywords)
      // 已定义且不为空
      if (res?.comment && res.comment != '') {
        return navigate(`/cache/${keywords}#unique`, { state: res.comment })
      } else if (res?.comment === '') {
        return navigate(`/cache/${keywords}#unique`, { state: "没有视频符合搜索的条件。" })
      }
    }

    const serverUrl = `${import.meta.env.VITE_PROXY_URL}${btoa(encodeURI('/' + keywords.split('_p')[0]) + (page ? '?page=' + page : ''))}`
    setMessage('请求已发送，等待服务器响应...')

    const resp = await fetch(serverUrl)
    console.log(resp);

    const statusCode = resp.status; // 获取响应的状态码
    if (statusCode === 429) {
      setMessage('搜索请求过于频繁，请等一等再试')
      return setTimeout(() => navigate('/tool/5')
        , 3000)
    }
    if (statusCode !== 200) {
      setMessage('服务器出错了，3秒后跳转到缓存列表')
      return setTimeout(() => navigate('/tool/5')
        , 3000)
    }

    const text = await resp.text()

    if (text?.includes("服务")) {
      setMessage('服务繁忙，可以先搜索缓存')
      return setTimeout(() => navigate('/tool/5')
        , 3000)
    }
    setSrc(searchHead + text)
    setMessage(' ')
    if (!text.includes('DOCTYPE')) {
      // 没有搜到视频也存键和空值
      postKeywords(keywords, text)
    }
  }

  useEffect(() => {
    if (
      localStorage.getItem("visit_date") &&
      localStorage.getItem("visit_date") == (new Date().getDate()) + ""
    ) {
      setMessage('服务繁忙，可以先搜索缓存')
      setTimeout(() => navigate('/tool/5')
        , 3000)
      return;
    }

    // 处理点击下一页的搜索
    if (url) {
      const pagePram = atob(url || '').split('page=')[1]
      keywords = decodeURI(atob(url || '').slice(37).split('?')[0]) + (pagePram ? '_p' + pagePram : '')

      if (keywords !== '' && pagePram !== null) {
        navigate(`/vsearch/${keywords}?page=${pagePram}`)
      }
    }

    if (keywords) {
      fetchHtml(keywords)
      countVsearch(keywords)
    }
  }, [searchParams])

  return (
    <Box marginTop={1.5}>
      <Typography variant='h5' margin={1.5}>{message}</Typography>
      {src && <DocIframe src={src} />}
    </Box>
  )
}
