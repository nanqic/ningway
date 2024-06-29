import { UserReg, addAuUser, getAuToken } from "@/utils/requestUtil"
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import SliderCaptcha from "rc-slider-captcha";
import { useEffect, useState } from "react"
import useSWRMutation from 'swr/mutation'

function SignUp() {
    const [verified, setVerified] = useState(false)
    const { trigger, isMutating } = useSWRMutation('https://mp3.ningway.com/api/users', addAuUser)

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
            trigger(user)
        } else {
            alert('请检查信息填写，并拖动滑块验证')
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
                    有声书App 注册
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
                                helperText="手机号仅限中国，用于找回密码"
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
                        disabled={isMutating ? true : false}
                        color='info'
                        sx={{ mt: 3, mb: 2 }}
                    >
                        注册
                    </Button>
                    <i>请牢记您的用户名和密码，如忘记，请留言或联系管理员</i>
                    <Grid container gap={2} justifyContent="flex-end">
                        <Grid item >
                            <Link href="https://jinshuju.net/f/hQVjL2" variant="body2">
                                忘记密码
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="https://mp3.ningway.com/logout" variant="body2">
                                登录
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