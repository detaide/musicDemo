
本项目仅仅作为交流学习使用！！！

本项目仅仅作为交流学习使用！！！

本项目仅仅作为交流学习使用！！！

项目使用方案为vite构建的vue3 + pinia

这是一个练手的项目，没有前端经验，在练习Github上的50天前端项目(https://github.com/bradtraversy/50projects50days) 当做到Movie App的时候用python爬了豆瓣一个页面，突发奇想看看有没有什么API，然后找到了站上的网易云音乐 API(https://github.com/Binaryify/NeteaseCloudMusicApi)

仿照着QQ音乐的页面风格，并且想要学习一下优质的代码风格，照猫画虎的学习了https://github.com/Chanzhaoyu/chatgpt-web的风格

由于第一次使用ts，没想到类型检查居然这么严格，打包过程中把代码给搞出了点bug，现在这份是没打包之前的备份(还好备份了)

代码内部还是比较臃肿的，尝试了很多方案，是一个非常不成熟的代码片段，当前仅是1.0版本，说不定回头看会觉得这就是shit山，不过好处就是shit山的框架在我个人看来已经搭建好了

请在vite.config.ts中修改target为自己部署的地址，API来源网易云音乐 API(https://github.com/Binaryify/NeteaseCloudMusicApi)

然后
```
npm install

npm run dev --port xxxx
```
其中xxxx为端口号，应该就可以运行了

运行没有设立根目录，访问ip:port/search访问
当前三个路由为

/search

/play

/mv
