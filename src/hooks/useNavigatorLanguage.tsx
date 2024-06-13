import { useEffect, useState } from "react";

export const useNavigatorLanguage = () => {
    // 获取navigator
    const navigator = window?.navigator;

    // 查看当前浏览器是否支持language
    const isSupported = Boolean(navigator && 'language' in navigator);

    // 存储当前language
    const [language, setLanguage] = useState(navigator?.language);

    // 监听languagechange事件，如果有变化，就更新存储的language值
    useEffect(() => {
        window.addEventListener('languagechange', () => {
            if (navigator) {
                setLanguage(navigator.language);
            }
        })
    }, [])

    return {
        isSupported,
        language,
    };
};
