import { postCountData } from "@/utils/requestUtil";
import { Link, LinkProps } from "@mui/material";
import { ReactNode } from "react";

interface OutLinkProps extends LinkProps {
    href: string;
    children: ReactNode;
    record?: boolean
}
export default function OutLink({ href, children, record = false, ...linkProps }: OutLinkProps) {
    const handleClick = () => postCountData('OutLink: ' + children)
    return <Link href={href?.startsWith('http') ? href : 'https://' + href} target="_blank"
        onClick={() => record && handleClick()}
        {...linkProps}
    > {children}</Link>
}
