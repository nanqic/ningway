import { useParams } from "react-router-dom"

export default function Redirect() {
    const { code } = useParams()
    location.replace(`${import.meta.env.VITE_OFFICIAL_SITE}/j?code=${code}`)
    return (
        <div>Redirecting to {code}</div>
    )
}
