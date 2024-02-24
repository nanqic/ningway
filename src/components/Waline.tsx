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
            pageview: true,
            reaction: [
                'https://unpkg.com/@waline/emojis@1.2.0/tieba/tieba_agree.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_joy.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_dog_consider.png',
                'https://unpkg.com/@waline/emojis@1.2.0/tieba/tieba_sleep.png',
                'https://unpkg.com/@waline/emojis@1.1.0/weibo/weibo_sob.png',
            ],
            locale: {
                reactionTitle: '您看过之后的感受',
                placeholder: "不登录也可以评论。填写邮箱后，评论有回复时邮件通知",
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

        const elHeader = document.querySelectorAll('.wl-header-item');
        //@ts-ignore
        elHeader[2].style.display = 'none';

        const el = document.querySelector('.wl-power');
        if (el) el.innerHTML = ''

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, [props]);

    return <div ref={containerRef} />;
};
