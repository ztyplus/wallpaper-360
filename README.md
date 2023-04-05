# 一个基于360壁纸接口的壁纸网站

[演示站](https://wper.ztyang.com):https://wper.ztyang.com

![](images/Snipaste_2023-04-05_13-18-22.png)
![](images/Snipaste_2023-04-05_13-19-22.png)
![](images/Snipaste_2023-04-05_13-19-41.png)

# 服务端 Nginx 配置解决跨域

![](images/Snipaste_2023-04-05_13-22-35.png)

```sh
location /search {
    proxy_pass http://wallpaper.apc.360.cn/index.php;
}

location /imglist {
    proxy_pass http://wallpaper.apc.360.cn/index.php;
}
```