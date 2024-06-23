import { create } from 'zustand'
import { VideoInfo } from '@/utils/types'
import { persist, createJSONStorage } from 'zustand/middleware'

type VideoStore = {
    video: HTMLVideoElement | null,
    paused: boolean,
    playlist: VideoInfo[],
    videoIndex: number,
    pageSize: number,
    currentShow: number,
    setPlaylist: (data: VideoInfo[]) => void,
    setVideo: (i: HTMLVideoElement) => void,
    setVideoIndex: (i: number) => void,
    switchPaused: () => void,
    reverseList: () => void,
    prevVideo: () => void,
    nextVideo: () => void,
    showMore: () => void,
    setPageSize: (arg0: number) => void,
    resetStore: () => void,

}
const useVideoStore = create<VideoStore>()((set) => ({
    video: null,
    paused: true,
    playlist: [],
    videoIndex: -1,
    pageSize: 30,
    currentShow: 30,
    setPlaylist: (data) => set(() => ({ playlist: data })),
    setVideo: (i) => set(() => ({ video: i })),
    setVideoIndex: (i) => set(() => ({ videoIndex: i })),
    reverseList: () => set((state) => ({
        playlist: state.playlist.reverse(),
        videoIndex: state.playlist.length - state.videoIndex - 1
    })),
    prevVideo: () => set((state) => ({ videoIndex: state.videoIndex - 1 })),
    nextVideo: () => set((state) => ({ videoIndex: state.videoIndex + 1 })),
    showMore: () => set((state) => ({ currentShow: state.currentShow + state.pageSize })),
    setPageSize: (size) => set(() => ({ pageSize: size })),
    switchPaused: () => set((state) => ({ paused: !state.paused })),
    resetStore: () => set(() => ({
        videoIndex: -1,
        pageSize: 30,
        currentShow: 30
    })),
}))

type PlayerStore = {
    showlist: boolean,
    switchShowlist: () => void,
}
const usePlayerStore = create<PlayerStore>()(persist((set) => ({
    showlist: true,
    switchShowlist: () => set((state) => ({ showlist: !state.showlist })),
}),
    { name: 'vplayer-settings' },
))

export { useVideoStore, usePlayerStore }