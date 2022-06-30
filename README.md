# 360壁纸站

[演示站点](https://wper.ztyag.com)

# 360壁纸API

1. 获取壁纸分类

> http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2&from=360chrome

2. 根据分类ID获取壁纸

> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=${分类ID}&start=${从第几张图开始}&count=${每次加载的数量}&from=360chrome

3. 获取最近更新壁纸

> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=${从第几张图开始}&count=${每次加载的数量}&from=360chrome

4. 壁纸搜索接口

> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=${kw}&start=${start}&count=${count}

5. 热门搜索

> http://openbox.mobilem.360.cn/html/api/wallpaperhot.html

## Nginx代理

> 打包上线后，需要配置nginx代理
将网站目录设置为打包上传后的文件夹

```bash
    location ^~ / {
      if (!-e $request_filename){
        rewrite ^(.*)$ /$1.html last;
        break;
      }
    }
    location /360 {
        rewrite ^.+360/?(.*)$ /$1 break;
        include uwsgi_params;
        proxy_pass http://cdn.apc.360.cn;
    }
    location /360hot {
        rewrite ^.+360hot/?(.*)$ /$1 break;
        include uwsgi_params;
        proxy_pass http://openbox.mobilem.360.cn;
    }
    location /search {
        rewrite ^.+search/?(.*)$ /$1 break;
        include uwsgi_params;
        proxy_pass http://wallpaper.apc.360.cn;
    }
```

