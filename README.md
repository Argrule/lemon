# lemon

柠檬君小程序客户端

## 启动

```md
pnpm install //安装依赖
pnpm test //开启热更新
pnpm nw //不开启热更新
```

## 页面结构

````md
pages
├── index //首页
├── login //登录
├── forum //论坛
├── gather //攒局
├── personalCenter //个人中心

```md
pages
└──index //首页
       ├── index.tsx        //页面
       ├── index.scss       //样式
       ├── index.config.js  //taro页面配置文件
```

- 页面标题等在index.config.js中配置
- 页面样式在index.scss中配置
- 不明白tabbar页面对应哪个文件夹，可以在app.config.js中查看tabbar配置

## utils

- request.ts: 封装了请求方法，使用时直接引入即可，如：
    
    ```js
    import o from '$/utils/request' // $是src的别名

    const res = await o.get('/api/xxx')
    console.log(res)

    o.post('/api/xxx', {post_data: 'xxx'})
    o.put('/api/xxx', {put_data: 'xxx'})
    o.delete('/api/xxx', {delete_data: 'xxx'})
    ```


## 调试

- 热重载：微信开发者工具关闭热重载，否则热重载会失效
- 谨慎使用原生HTML：之前报错了，修改其他部分代码，能看到更新起作用，但是错误却一直没有消去，原因是使用了button而非taro提供的Button组件，所以时好时坏，所以建议使用taro提供的组件

## 问题

- 目前拦截器返回的是res.data, 但是Taro类型声明是res, 所以ts会报错

## git规范

### commit message格式
- feat: 新功能、新特性
- fix: 修改 bug
- perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
- refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改（例如分号修改）
- test: 测试用例新增、修改
- build: 影响项目构建或依赖项修改
- revert: 恢复上一次提交
- ci: 持续集成相关文件修改
- chore: 其他修改（不在上述类型中的修改）
- release: 发布新版本
- workflow: 工作流相关文件修改

### commit emoji

- :sparkles: (火花) 引入新功能
- :art: (调色板) 改进代码结构/代码格式
- :bug: (bug) 修复 bug
- :zap: (闪电) 提升性能
- :fire: (火焰) 移除代码或文件
- :ambulance: (急救车) 重要补丁
- :pencil: (备忘录) 撰写文档
- :arrow_down: (下降箭头) 降级依赖
- :arrow_up: (上升箭头) 升级依赖
- :construction: (施工) 工作进行中
- :heavy_minus_sign: (减号) 减少一个依赖
- :heavy_plus_sign: (加号) 增加一个依赖
- :rocket: (火箭) 部署功能
- :lipstick: (口红) 更新 UI 和样式文件
- :wrench: (扳手) 修改配置文件
- :tada: (庆祝) 初次提交
- :white_check_mark: (白色复选框) 增加测试
- :bookmark: (书签) 发行/版本标签
- :rotating_light: (警车灯) 移除 linter 警告
- :chart_with_upwards_trend: (上升趋势图) 添加分析或跟踪代码
- :hammer: (锤子) 重大重构
- :pencil2: (铅笔) 修复拼写错误
- :poop: (大便) 编写需要改进的错误代码
- :rewind: (倒带) 代码回滚
- :twisted_rightwards_arrows: (交叉箭头) 合并分支
- :package: (包裹) 更新编译的文件或包
- :alien: (外星人) 由于外部 API 而更新代码
- :truck: (送货车) 移动或重命名文件
- :boom: (爆炸) 引入破坏性改动
- :bento: (盒饭) 添加或更新静态资源
- :ok_hand: (OK 手势) 代码审查后更新代码
- :beers: (啤酒) 饮用啤酒庆祝
- :speech_balloon: (气球) 更新文本和文字
- :label: (标签) 添加或更新类型（Flow, TypeScript）
