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
            serverURL: 'https://line.ningway.com/.netlify/functions/comment/',
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
                placeholder: "不登录也可以评论 ～"
            },
            dark:  'auto',
        }

        walineInstanceRef.current = init({
            ...(isEmpty(props) ? defaultOptions : props),
            el: containerRef.current,
        });

        const el = document.querySelector('.wl-power');
        if (el) el.innerHTML = ''

        return () => walineInstanceRef.current?.destroy();
    }, [location.pathname]);

    useEffect(() => {
        walineInstanceRef.current?.update(props);
    }, [props]);

    return <div ref={containerRef} />;
};
