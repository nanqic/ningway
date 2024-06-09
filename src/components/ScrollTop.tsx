import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {Fab, Fade, useScrollTrigger} from "@mui/material";
import Box from "@mui/material/Box";

export const handleScrollTop = (event: any) => {
    const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
        anchor.scrollIntoView({
            block: "center"
        });
    }
};
export default function ScrollTop() {
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100
    });



    return (
        <Fade in={trigger}>
            <Box
                onClick={handleScrollTop}
                role="presentation"
                sx={{ position: "fixed", bottom: 60, right: 16 }}
            >
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Fade>
    );
}
