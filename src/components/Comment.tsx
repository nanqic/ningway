import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

export default function () {
    const location = useLocation();

    const walineInstanceRef = useRef<any>(null);
    const containerRef = useRef(null);
    const loadWalineClient = async () => {
        //@ts-expect-error
        const { init } = await import('https://unpkg.com/@waline/client@v3/dist/waline.js');
        return init;
    };

    useEffect(() => {
        const linkTag = document.createElement('link');
        linkTag.rel = 'stylesheet';
        linkTag.href = 'https://unpkg.com/@waline/client@v3/dist/waline.css';
        document.head.appendChild(linkTag);
        const initWaline = async () => {
            const walineClient = await loadWalineClient();
            walineInstanceRef.current = walineClient({
                ...defaultOptions,
                el: containerRef.current
            });
        };
        initWaline();
        localStorage.setItem('WALINE_COMMENT_BOX_EDITOR', '')

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);
    const defaultOptions = {
        serverURL: import.meta.env.VITE_WL_SERVER,
        pageview: true,
        imageUploader: false,
        copyright: false,
        // login: 'force',
        meta: ['nick', 'mail'],
        search: false,
        locale: {
            placeholder: "请留言。(填写邮箱可在被回复时收到邮件提醒)",
            level0: '布施',
            level1: '持戒',
            level2: '忍辱',
            level3: '精进',
            level4: '禅定',
            level5: '智慧',
            comment: "留言",
        },
        dark: 'auto',
    }
    return <Box ref={containerRef} />
};