import { Box, Container, Typography } from '@mui/material'

export default function About() {
    return (
        <Container sx={{ m: 3,fontSize: '13px'}}>
            <Typography variant="h6">
                恒常念诵愿文
            </Typography>
            <Typography variant="subtitle2">
                愿我乃至生生世世中
                获得具足七德之善趣<br />
                愿我出生立即遇正法
                具有如理修持之自由<br />
                愿我能令上师生欢喜
                日日夜夜之中行正法<br />
                愿我悟法后修精华义
                彼生越过三有之大海<br />
                愿我能为众生传妙法
                成办他利无有厌倦心<br />
                愿我能以无偏大事业
                令诸有情一同成正觉<br />
            </Typography>
            <br />
            <div>
                <br />
                <div>
                    <Typography variant='h6'>业余维护</Typography>
                    
                    <br />
                    若有任何过失向佛忏悔，若对您的闻思修行有帮助
                    <br />
                    请帮助一个以上的生命，所有善根回向同生极乐🙏
                    <br />
                    <br />

                    <Typography variant='subtitle2'>不要伤害众生，不要舍弃自己的道路，不要扰乱其他人的心。☀️</Typography>
                    <br />
                </div>
            </div>
        </Container>
    )
}
