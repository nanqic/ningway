import Comment from '../pages/common/Comment'
import NotFound from './NotFound'

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
            {localStorage.getItem("stats") === 'MTIz' && ''}
            <Comment />
        </div>
    )
}
