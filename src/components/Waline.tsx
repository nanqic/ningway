import React, { useEffect, useRef } from 'react';
import {
    type WalineInstance,
    type WalineInitOptions,
    init,
} from '@waline/client';

import '@waline/client/style';
import { isEmpty } from '@/utils/randomUtil';
import { useLocation } from 'react-router-dom';

export type WalineOptions = Omit<WalineInitOptions, 'el'>;

export default function (props: WalineOptions | any) {
    const walineInstanceRef = useRef<WalineInstance | null>(null);
    const containerRef = React.createRef<HTMLDivElement>();
    const location = useLocation();

    useEffect(() => {
        const defaultOptions: WalineOptions = {
            serverURL: import.meta.env.VITE_WL_SERVER,
            pageview: false,
            reaction: [
                'https://unpkg.com/@waline/emojis@1.2.0/tieba/tieba_agree.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_smile.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_yum.png',
                'https://unpkg.com/@waline/emojis@1.2.0/tieba/tieba_sleep.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
            ],
            locale: {
                login: '登录（可选）',
                reactionTitle: '观后感受',
                reaction0: '赞同',
                reaction1: '满意',
                reaction2: '调皮',
                reaction3: '困意',
                reaction4: '流泪',
                placeholder: "请留言。(填写邮箱可在被回复时收到邮件提醒)",
                level0: '布施',
                level1: '持戒',
                level2: '忍辱',
                level3: '精进',
                level4: '禅定',
                level5: '智慧',
            },
            dark: 'auto',
        }

        walineInstanceRef.current = init({
            ...(isEmpty(props) ? defaultOptions : props),
            el: containerRef.current,
        });

        const siteEl = document.querySelectorAll('.wl-header-item')[2];
        //@ts-ignore
        siteEl.style.display = 'none';

        const actionsEl = document.querySelectorAll('.wl-action');
        //@ts-ignore
        actionsEl[0].style.display = 'none';
        //@ts-ignore
        actionsEl[3].style.display = 'none';
        //@ts-ignore
        actionsEl[4].style.display = 'none';


        const el = document.querySelector('.wl-power');
        if (el) el.innerHTML = ''

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, [props]);

    return <div ref={containerRef} />
};
