import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";


/**
 * 主题颜色配置
 */
export const theme = createTheme({
    palette: {
        primary: {
            main: blue[200],
        },
        secondary: {
            main: green[500],
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});
