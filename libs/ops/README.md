## 变更信息--modifies目录
root：项目目录
ops：
    type 类型：~ 修改 + 增加 - 删除 
    dir 文件目录 
    base 文件名称

## 运行脚本--bin目录

1. 打包
node pack.js yehe qcmain
node pack.js imagecache

2. 传送物料：将物料包拷贝到相应机器/raw目录下
./transfer.sh

3. 备份、部署
node deploy.js [yehe | imagecache | qcmain] <flag> 

例如：
node deploy.js 0 // 备份yehe
node deploy.js 1 // 部署yehe
node deploy.js yehe // 备份 + 部署 yehe
