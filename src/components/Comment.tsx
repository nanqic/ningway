import { useEffect, useRef } from 'react';
import { init } from '@waline/client';

import '@waline/client/style';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';


export default function () {
    const location = useLocation();

    const walineInstanceRef = useRef<any>(null);
    const containerRef = useRef(null);

    useEffect(() => {
        walineInstanceRef.current = init({
            ...defaultOptions,
            el: containerRef.current,
        });

        try {
            const siteEl = document.querySelectorAll('.wl-header-item')[2];
            //@ts-ignore
            siteEl && (siteEl.style.display = 'none')
            const actionsEl = document.querySelectorAll('.wl-action');
            if (actionsEl) {
                //@ts-ignore
                actionsEl[0].style.display = 'none';
                //@ts-ignore
                actionsEl[3].style.display = 'none';
                //@ts-ignore
                actionsEl[4].style.display = 'none';
            }
        } catch (error) {
            console.error(error)
        }

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);
    const defaultOptions = {
        serverURL: import.meta.env.VITE_WL_SERVER,
        pageview: true,
        copyright: false,
        locale: {
            placeholder: "不登录也可以留言。(填写邮箱可在被回复时收到邮件提醒)",
            level0: '布施',
            level1: '持戒',
            level2: '忍辱',
            level3: '精进',
            level4: '禅定',
            level5: '智慧',
            sofa: '留下触动的话~',
            comment: "留言",
        },
        dark: 'auto',
    }
    return <Box marginTop={20} ref={containerRef} />
};