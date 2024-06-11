import { postCountData } from "@/utils/requestUtil";
import { Link } from "@mui/material";
import { ReactNode } from "react";

interface OutLinkProps {
    href: string;
    children: ReactNode;
    record?: boolean
}
export default function OutLink({ href, children, record = false }: OutLinkProps) {
    const handleClick = () => postCountData('OutLink: ' + children)
    return <Link href={href?.startsWith('http') ? href : 'https://' + href} target="_blank"
        onClick={() => record && handleClick()}
    > {children}</Link>
}
