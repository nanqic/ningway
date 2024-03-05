import { useState } from 'react'
import NotFound from './NotFound'
import Waline from './Waline'

export default function UserStat() {
    const [pass, setPass] = useState("")
    return (
        <div>
            <NotFound />
            <p onDoubleClick={() => {
                let input = prompt("") || ''
                setPass(input)
            }}> &nbsp;</p>
            {btoa(pass) === 'MTIz' && < Waline />}
        </div>
    )
}
