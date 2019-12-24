竞斗云2.0刷大雕今天的潘朵拉正式版1.1刷机方法：

【准备工作】

刷机包在群共享\r619ac\PandoraBox-R9.12.24-ipq40xx-r619ac 那个
或者在我的镜像里下载
PB-BOOT↓
https://lietxia.github.io/rom/p2w_r619ac/pb-boot-ipq40xx-r619ac-spi-nor.bin
刷机包↓
https://lietxia.github.io/rom/p2w_r619ac/PandoraBox-R9.12.24-ipq40xx-p2w_r619ac-squashfs-sysupgrade.bin

-------【刷opboot】-------
1. 传pb-boot到/tmp

这里你可以用winscp传到/tmp （不介绍）
也可以让路由器直接下载（打下方命令）

cd /tmp;wget https://lietxia.github.io/rom/p2w_r619ac/pb-boot-ipq40xx-r619ac-spi-nor.bin;
--------------------
2. 验证估计+刷机
打命令验证md5，如果md5不一样→文件损坏→别刷机，重下文件

md5sum /tmp/pb-boot-ipq40xx-r619ac-spi-nor.bin;

如果显示 1fc93d894ce9b352531397f22e20c2c9 就代表文件没有损坏，可以刷了
打以下命令刷到Bootloader

mtd write /tmp/pb-boot-ipq40xx-r619ac-spi-nor.bin Bootloader

--------------------
3. 刷好后断电，按住RESET不放，接通电源。
有线接入路由器后打192.168.1.1进入 pb-boot 
点【格式化系统】
点【浏览】选择固件 PandoraBox-R9.12.24-ipq40xx-p2w_r619ac-squashfs-sysupgrade.bin 
点【恢复固件】

--------------------
1fc93d894ce9b352531397f22e20c2c9  pb-boot-ipq40xx-r619ac-spi-nor.bin
2b943046b9d6aa804af5dd80c3e2d747  PandoraBox-R9.12.24-ipq40xx-p2w_r619ac-squashfs-sysupgrade.bin