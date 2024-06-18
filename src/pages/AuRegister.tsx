import { UserReg, addAuUser, getAuToken } from "@/utils/requestUtil"
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import SliderCaptcha from "rc-slider-captcha";
import { useEffect, useState } from "react"

function SignUp() {
    const [verified, setVerified] = useState(false)
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user: UserReg = {
            username: data.get('username') ?? '',
            email: data.get('email') ?? '',
            password: data.get('password') ?? '',
            type: 'user'
        };
        if (verified &&
            user.username &&
            user.email &&
            user.password) {
            addAuUser(user)
        } else {
            alert('请检查信息填写')
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    注册 有声书App
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="用户名"
                                autoFocus
                                helperText="字母、中文、数字都可以，3位以上"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="手机号或邮箱"
                                name="email"
                                autoComplete="email"
                                helperText="手机号仅限中国，用于接收注册消息"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="密码"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                helperText="6位以上，不可以是汉字"
                            />
                        </Grid>
                    </Grid><br />
                    <SliderCaptcha
                        tipText={{
                            default: '请按住滑块，拖动到最右边',
                            moving: '请按住滑块，拖动到最右边',
                            error: '验证失败，请重新操作',
                            success: '验证成功'
                        }}
                        mode="slider"
                        onVerify={async (data) => {
                            if (data.sliderOffsetX === 278) {
                                setVerified(true)
                                return Promise.resolve();
                            }

                            return Promise.reject();
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        注册
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="https://mp3.ningway.com" variant="body2">
                                已有账号？点击登录
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

function AuRegister() {
    useEffect(() => {
        if (!sessionStorage.getItem('au-token'))
            getAuToken()
    }, [])

    return (
        <>
            <SignUp />
        </>
    )
}

export default AuRegister