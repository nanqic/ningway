import { postCountData } from "@/utils/requestUtil";
import { Link } from "@mui/material";
import { ReactNode } from "react";

interface OutLinkProps {
    href: string;
    children: ReactNode;
}
export default function OutLink({ href, children }: OutLinkProps) {
    const handleClick = () => postCountData(children as string)
    return <Link href={`https://${href}`} target="_blank" onClick={handleClick}> {children}</Link>
}
