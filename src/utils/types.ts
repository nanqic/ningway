
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
* 
* 视频日期: date
* 网站视频编号: no
* 视频标题: title
* 视频时长: duration
*/
export interface VideoInfo {
  date?: string,
  no: string,
  title: string,
  duration: number,
}

export interface CommentData {
  nick: string
  orig: string
}

export interface Weibo {
  id: number,
  date: number,
  content: string,
}