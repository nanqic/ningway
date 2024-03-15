import { Button, ButtonOwnProps } from '@mui/material'

export default function ButtonClickAlert(props: ButtonOwnProps & { msg: string }) {
    return (<Button {...props} onClick={() => alert(props.msg)}>点击查看</Button>
    )
}
