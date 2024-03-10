import Excerpt from '@/components/Excerpt'
import { Box, Container } from '@mui/material'

export default function Home() {
  document.title = '宁路 | ' + '主页'

  return (
    <Container>
      <Box>
        <Excerpt content={
          `已获暇满大舟时，为自他渡轮回海，
          日日夜夜不懈怠，闻思修持佛子行。
          贪恋亲方如沸水，嗔恨敌方如烈火，
          遗忘取舍愚暗者，抛弃故乡佛子行。
          离恶境故惑渐轻，无散乱故善自增，
          净心于法生定解，居于静处佛子行。
          长伴亲友各分离，勤积之财留后世，
          识客终离身客店，舍弃今世佛子行。`
        } />
        <Box
          sx={{
            opacity: 0,
            textAlign: 'center',
            fontSize: '13px',
            cursor: "progress"
          }}
          // onClick={() => exportData(224)}
          //@ts-ignore 2024/2/24/ 9:20 pm pv: 13166   uv: 5192 |3.8 pv: 22149   uv: 8484
          onDoubleClick={e => e.target.style.opacity = 1}
        >
          pv: <span id="busuanzi_value_site_pv"></span>&nbsp;&nbsp;
          uv: <span id="busuanzi_value_site_uv"></span>
        </Box>
      </Box>
    </Container >
  )
}
