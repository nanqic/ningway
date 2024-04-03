import { wordsSplit } from "@/utils/randomUtil";

interface HighlightProps {
    search?: string;
    text: string;
}

const Highlight = ({ search, text }: HighlightProps) => {
    if (!search || !text) {
        return <>{text}</>;
    }

    const searchList = wordsSplit(search)
    const parts = text.split(new RegExp(`(${searchList.join('|')})`, 'g'));

    return (
        <span>
            {parts.map((part, i) =>
                searchList.includes(part) ? (
                    <mark key={i}>{part}</mark>
                ) : (
                    part
                )
            )}
        </span>
    );
};

export default Highlight;
