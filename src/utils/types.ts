
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
* 视频日期: date
* 网站视频编号: no
* 视频标题: title
* 视频时长: duration
*/
export interface VideoInfo {
  index: number,
  date?: string,
  no: string,
  title: string,
  duration: number,
  next?: string
}

export interface CommentData {
  nick: string
  orig: string
}

export interface SearchConfig {
  showDuration:boolean;
  showMonth:boolean;
  orderReverse:boolean;
}