import { create } from 'zustand'
import { VideoInfo } from '@/utils/types'
import { persist } from 'zustand/middleware'
import { getRandomNum, getRandomNumber } from '@/utils/randomUtil'
import { findVideoByIndex, getTitleList } from '@/utils/dbUtil'

interface PlayerConfig {
    speed?: number;
    skipIntro?: boolean;
    quality?: string;
    mode?: string;
    orderReverse?: boolean;
}

type VideoStore = {
    config: PlayerConfig,
    setConfig: (conf?: PlayerConfig) => void,
    paused: boolean,
    playlist: VideoInfo[],
    videoIndex: number,
    setPlaylist: (data: VideoInfo[]) => void,
    setVideoIndex: (i: number) => void,
    switchPaused: () => void,
    setPaused: (arg: boolean) => void,
    reverseList: () => void,
    prevVideo: () => void,
    nextVideo: () => void,
    randomVideo: () => void,
    resetStore: () => void,
    showlist: boolean,
    showMenu: boolean,
    switchShowlist: () => void,
    switchShowMenu: () => void,
}

const useVideoStore = create<VideoStore>()(persist((set, get) => ({
    config: { speed: 1, skipIntro: false, quality: '480', mode: 'order', orderReverse: false },
    setConfig: (conf) => {
        if (conf?.orderReverse != undefined) {
            get().setPlaylist(get().playlist.toReversed())
        }
        set(state => ({ config: { ...state.config, ...conf } }))
    },
    paused: true,
    playlist: [],
    videoIndex: -1,
    setPlaylist: (data) => set(() => ({ playlist: data })),
    setVideoIndex: (i) => set(() => ({ videoIndex: i })),
    reverseList: () => set((state) => ({
        playlist: state.playlist.reverse(),
        videoIndex: state.playlist.length - state.videoIndex - 1
    })),
    prevVideo: async () => {
        if (get().playlist.length > 1) {
            set((state) => ({ videoIndex: state.videoIndex - 1 }))
        } else {
            const list = await getTitleList()
            set((state) => ({
                playlist: findVideoByIndex(list, state.playlist[state.videoIndex]?.index == 0 ? 9205 : state.playlist[state.videoIndex]?.index - 1)
            }))
        }
    },
    nextVideo: async () => {
        if (get().playlist.length > 1) {
            set((state) => ({
                videoIndex:
                    state.videoIndex === state.playlist.length - 1 ? 0 : state.videoIndex + 1
            }))
        } else {
            const list = await getTitleList()
            set((state) => ({
                playlist: findVideoByIndex(list, state.playlist[state.videoIndex]?.index == 9205 ? 0 : state.playlist[state.videoIndex]?.index + 1)
            }))
        }
    }
    ,
    randomVideo: async () => {
        if (get().playlist.length > 1) {
            set((state) => ({ videoIndex: getRandomNumber(state.playlist.length - 1) }))
        } else {
            const list = await getTitleList()
            set({ playlist: findVideoByIndex(list, getRandomNum(9206)) })
        }
    },
    switchPaused: () => set((state) => ({ paused: !state.paused })),
    setPaused: (arg) => set({ paused: arg }),
    resetStore: () => set(() => ({
        videoIndex: -1,
        pageSize: 30,
        currentShow: 30
    })),
    showlist: true,
    showMenu: true,
    switchShowlist: () => set((state) => ({ showlist: !state.showlist })),
    switchShowMenu: () => set((state) => ({ showMenu: !state.showMenu })),
}),
    { name: 'vplayer-playstat' },
))

type PlayerStore = {
    videoRef: React.RefObject<HTMLVideoElement> | null,
    setVideoRef: (ref: React.MutableRefObject<any>) => void,
    viewlist: VideoInfo[],
    setViewlist: (data: VideoInfo[]) => void,
    currentShow: number,
    setCurrentShow: (index?: number) => void,
    pageSize: number,
    setPageSize: (arg0: number) => void,
}

const usePlayerStore = create<PlayerStore>()((set) => ({
    videoRef: null,
    viewlist: [],
    currentShow: 30,
    setVideoRef: (ref) => set({ videoRef: ref }),
    setViewlist: (data) => set(() => ({ viewlist: data })),
    setCurrentShow: (index) => set((state) => ({ currentShow: index || state.currentShow + state.pageSize })),
    pageSize: 30,
    setPageSize: (size) => set(() => ({ pageSize: size })),
}))

export { useVideoStore, usePlayerStore }