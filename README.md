# ningway

## 本地启动
1. 运行环境
- nodejs >= 16
2. 操作步骤
   - 2.1 `git clone https://github.com/nanqic/ningway.git`
   - 2.2 `cd ningway && npm install`
   - 2.3 `npm run dev`
   - 2.4 浏览器访问 [localhost:5173](http://localhost:5173)

## 代码量统计

``` shell
 git log --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'

```