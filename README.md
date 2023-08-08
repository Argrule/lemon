# lemon

柠檬君小程序客户端

## 启动

```md
pnpm install //安装依赖
pnpm test //开启热更新
pnpm nw //不开启热更新
```

## 页面结构

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

- request.ts: 封装了请求方法，使用时直接引入即可

## 调试

- 热重载：微信开发者工具关闭热重载，否则热重载会失效
- 谨慎使用原生HTML：之前报错了，修改其他部分代码，能看到更新起作用，但是错误却一直没有消去，原因是使用了button而非taro提供的Button组件，所以时好时坏，所以建议使用taro提供的组件，
