import { MutableRefObject } from "react"

export interface PlayerProps {
  index: number
  current: number
  playing: boolean
  videoDom: MutableRefObject<any>
  setCurrent: (arg0: number) => void
  setPlaying: (arg0: boolean) => void
}

/**
 *
 * 默认存储v2209版本info
 */
export interface VideoInfo {
  id: number,
  info: string,
}

export interface ChatVideo {
  id: number,
  title: string,
  no: number | string,
}

export interface EmptinessTheme {
  title: string,
  amount: number,
  totalTime: number
  detail: string
}

/**
* 将字符串分割为对象
* 网站视频编号: no
* 视频标题: title
*/
export interface VideoSearch {
  index?: number,
  no: string,
  title: string,
}

export interface Book {
  id: string,
  title: string,
  subTitle?: string,
  describe?: string
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value?: number;
}

export interface TabNavProps extends TabPanelProps {
  label: string;
}

export interface CommentData {
  nick: string
  orig: string
}