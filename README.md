# vue-ts脚手架模板

### 步骤1、从原地址克隆一份裸版本库
```
git clone --bare https://github.com/PNfeather/vue-ts-template
```

### 步骤2、创建新的git库

### 步骤3、以镜像推送的方式上传代码到 GitCafe 服务器上
```
cd vue-ts-template.git
git push --mirror https://...(新创建的git库地址)
```

### 步骤4、删除本地代码
```
cd ..
rm -rf vue-ts-template.git
```

### 步骤5、到新服务器 GitCafe 上找到 Clone 地址，直接 Clone 到本地就可以了
```
git clone https://...(新创建的git库地址)
```

