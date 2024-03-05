import NotFound from './NotFound'
import Waline from './Waline'

export default function UserStat() {
    return (
        <div>
            <NotFound />
            <p onDoubleClick={() => {
                let input = prompt("") || ''
                if (btoa(input) === 'MTIz') {
                    localStorage.setItem("stats", 'MTIz',)
                }
            }}> &nbsp;</p>
            {localStorage.getItem("stats") === 'MTIz' && < Waline />}
        </div>
    )
}
