import { useParams } from "react-router-dom"

export default function Redirect() {
    const { code } = useParams()
    location.replace(`${import.meta.env.VITE_OFFICIAL_SITE}/${atob(code||'')}`)
    return (
        <div>Redirecting ...</div>
    )
}
