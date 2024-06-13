import { ReactNode } from 'react'

function ArticleBox({ children }: { children: ReactNode }) {
    return (
        <div style={{
            margin: '15px 10px',
            padding: '5px 10px',
            maxWidth: '100%',
            borderStyle: 'solid',
            WebkitBorderImage: 'url("/images/border-640.png") 45 15 fill stretch',
            borderWidth: '25px 8px',
            backgroundColor: 'rgb(255, 169, 33)',
            boxSizing: 'border-box',
            overflowWrap: 'break-word',
            fontSize: '20px',
            lineHeight: '2rem',
            fontFamily: '"LXGW Neo ZhiSong CHS","宋体", SimSun, serif ,"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif'
        }}>{children}</div>
    )
}

export default ArticleBox