# NetEaseCloudMusic
网易云音乐RN版

## 截图
<p>
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/find.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/findBottom.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/topList.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/toplistBottom.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/topListDetail.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/Dj.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/djType.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/payQuality.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/mv.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/mvTop.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/mvPlay.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/mvFullScreen.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/mine.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/playlist.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/audioPlay.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/friends.png" width="250" height="444" />
<img alt="NetEaseCloudMusic" src="https://raw.githubusercontent.com/DaiYz/NetEaseCloudMusic/master/screenshot/account.png" width="250" height="444" /></p>

## 运行
```
git clone https://github.com/DaiYz/NetEaseCloudMusic

yarn or npm install

react-natvie run-android

cd ios

pod install

react-native run-ios

```

## Api（详情请戳 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)）

```
 git clone https://github.com/Binaryify/NeteaseCloudMusicApi
 
 yarn or npm install
 
 node App.js （默认为3000端口）
 
 Android需要替换为本地ip地址
 
```

## 项目结构

 ```
 ├── README.md                      // README
 ├── application                    // Ract Native
 │   ├── components                 // Ract Native 通用组件
 │   │    ├── bage                     // 角标组件
 │   │    ├── homeList                 // 首页列表组件
 │   │    ├── imagePlaceholder         // 图片组件
 │   │    ├── naviItem                 // 图标加文字的item组件
 │   │    ├── parallaxStickView        // 带有粘性头部下拉放大背景图片列表组件（具体效果详见find/toplist/TopListDetail.js）
 │   │    ├── scrollTabView            // 重写scrollTabView组件 未修改完
 │   │    ├── searchHeader             // 带有搜索框的动画导航头组件
 │   │    ├── segmentedControl         // 分段控制器组件
 │   │    └── wave                     // 波形加载动画组件
 │   ├── localize                   // 本地化
 │   │    ├── strings               // 多语言
 │   │    └── theme                 // 主题色 
 │   ├── navigator.config.js        // 导航配置
 │   ├── source                     // 资源目录（图片/动画/svg/icon）
 │   ├── stores                     // mobx stores
 │   ├── utils                   
 │   │    ├── api.js                // axios/Api接口配置 
 │   │    ├── global.js             // 全局变量存储
 │   │    ├── tool.js               // 全局函数工具
 │   │    └── index.js              // 入口          
 │   ├── views                      // 视图
 │   │    ├── account               // 账号
 │   │    ├── find                  // 发现
 │   │    │    ├── model               // 发现 Tab页的局部mobx store 用于替代state
 │   │    │    ├── Personalized.js     // 个性化推荐
 │   │    │    ├── Host.js             // 个性化推荐
 │   │    │    ├── dj                  // 电台相关
 │   │    │    ├── toplist             // 排行榜相关
 │   │    │    └── index.js            // 入口
 │   │    ├── friends               // 朋友
 │   │    │    ├── model               // 朋友Tab页的局部mobx store 用于替代state
 │   │    │    └── index.js            // 入口
 │   │    ├── load                  // 加载
 │   │    ├── login                 // 登录
 │   │    ├── mine                  // 我的
 │   │    │    ├── model               // 我的 Tab页的局部mobx store 用于替代state
 │   │    │    └── index.js            // 入口
 │   │    ├── search                // 搜索
 │   │    ├── video                 // MV
 │   │    │    ├── model               // MV Tab页的局部mobx store 用于替代state
 │   │    │    ├── toplist             // MV 排行榜相关
 │   │    │    └── index.js            // 入口
 │   │    └── index.js              // 入口
 │   └── index.js                   // Ract Native 入口页
 ├── ios                            // ios原生部分
 ├── index.js                       // 项目注册入口文件
 ├── android                        // android原生部分
 ├── node_modules                   // 项目依赖包
 ├── __test__                       // 自动化测试
 ├── package.json                   // 依赖
 └── babel.config.js                // babel配置
 ``` 

### To Be Continued



