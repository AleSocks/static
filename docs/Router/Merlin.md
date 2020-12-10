## 应用概述
大部分 NETGEAR 和 ASUS  LinkSys 路由器的高端型号都可以刷入基于 ASUS-WRT 的 Merlin 固件 Koolshare 修改版。这个固件提供了 Koolshare 软件中心功能，可以安装插件后方便地通过友好的图形化界面配置 AleSocks 服务。

然而，由于普通路由器的性能有限，加之 Koolshare 实现很多功能时存在性能问题，导致大部分路由器上使用 AleSocks 服务并不能达到足够高的速度，除非用户购买 2000 元级别的路由器。

## 系统环境

> 测试环境<br>
ASUS GT-AC5300<br>
Koolshare Modified ROM 3.0.0.4.382_15984_koolshare<br>
KoolSS 1.1.6(Merlin)

## 注意事项

由于大部分家用级路由器都是基于 ARMv7 架构的 CPU 设计，甚至部分低端型号使用的 MIPS 架构，且路由器 CPU 普遍功耗极低，因此这些 CPU 的计算性能非常贫弱。在一般的中低端型号路由器上使用 KoolSS 插件可能普遍无法达到 100Mbps 的速率。

---

## 从软件中心安装 KoolSS

!> 安装前可能有额外操作

Koolshare Modified ROM 在使用软件中心前需要先清空并格式化 JFFS2 分区，由于此不属于我们文档应当包含的一部分，因此阁下需要自行前往 Koolshare 社区了解不同机型的不同清除方法。

---

由于 Koolshare 自我审查的原因，现在软件中心不再提供 KoolSS 插件的安装，且插件名称也有所改变，但其实质代码和运作方式并无较大变化。

点击[这里](https://github.com/hq450/fancyss)可以下载最新的 KoolSS 离线安装包。

对于不同机型需要下载不同的离线安装包，请根据你的路由器型号选择。

下载完成后，通过浏览器访问 Koolshare Modified ROM（改版固件） 管理页面。

?>由于 Koolshare Modified ROM 的页面存在一些兼容性问题，建议使用 Google Chrome 浏览器

在管理页面底部点击「软件中心」，然后点击「离线安装」选项卡，将之前下载的离线安装包重命名为 shadowsocks.tar.gz，然后添加到离线安装中并点击「安装」。之后等待安装完成。

---

## 获取订阅

此处将显示您的订阅链接，请注意为登录状态：

[cinwell website](/sublink?type=ssr ':include :type=markdown')

!> 这个 **订阅链接** 非常重要，你应当把它当做密码一样妥善保管。

---

## 配置 KoolSS

点击「已安装」选项卡中的「科学上网」插件进入插件管理页面。

如果是第一次使用此插件，则可能弹出此会话框：

![01.png](https://i.loli.net/2020/04/17/t2FLeAsjPJlWxNZ.png)

进入「更新管理」页面后，滑动页面到下方的「SSR 订阅设置」区域。

![02.png](https://i.loli.net/2020/04/17/ez9YMbQw1miLyCl.png)

在「订阅地址管理」中粘贴我们之前复制的 AleSocks API URI，然后进行如下设定：

?> 将「订阅节点模式设定」设置为「游戏模式」<br>
将「订阅节点混淆参数设定」设置为「使用订阅设定」<br>
将「下载订阅时走 SS 网络」设置为「不走 SS」<br>
开启「订阅计划任务」，并选择一个你可能不会使用网络的时间。<br>

设置完成后，点击「保存并订阅」按钮。页面会打开一个新的提示框并出现类似下图中的内容：

![03.png](https://i.loli.net/2020/04/17/dB65fiFrkOszoAy.png)

订阅完成后，页面会自动跳转到主页面，此时 KoolSS 的开关可能将会再次出于关闭状态，点击开关来打开它。

![04.png](https://i.loli.net/2020/04/17/3ojW2wEuf87dqCJ.png)

---

## 附加设置

为了使我们的使用更加舒适，我们需要进行一些附加设置。

点击「更新管理」选项卡，将「规则定时更新任务」设置为「开启」，然后选择一个你可能不会使用网络的时间段。并将所有规则的更新全部勾选，然后点击「保存设置」

![05.png](https://i.loli.net/2020/04/17/7qHJfIhUybvEXFe.png)

页面将会自动跳转，完成后应当再次返回此页面，然后点击「立即更新」。以确保 KoolSS 已经获取到最新的规则。

点击「DNS 设定」选项卡，然后进行以下设定

?> 将选择国内 DNS 设置为运营商 DNS，如果你的运营商 DNS 存在劫持，则可以使用 119.29.29.29 或自定义设置为 119.28.28.28<br>
将「选择国外 DNS」设置为 ss-tunnel，然后设置为 1.1.1.1<br>
打开 DNS 劫持功能<br>
将「节点域名解析 DNS」设置为 119.29.29.29<br>

![06.png](https://i.loli.net/2020/04/17/JuP1YHO6B2taK5y.png)

为了获得最佳性能，建议启用 dnsmasq-fastlookup 替换功能，可以将原来遍历查询的 dnsmasq 替换为 hash 查询的 dnsmasq，经 AleSocks 和用户测试可以极大的降低 CPU 消耗，加快 DNS 查询速度，有助于解放更多 CPU 算力给 SSR 客户端本身，以提升路由器上的国际网络连接速率。

点击「附加功能」选项卡，将替换 dnsmasq-fastlookup 设置为开启后替换，是否在关闭插件后替换回原版需要您自行决定。

![07.png](https://i.loli.net/2020/04/17/vWuO65FTle7hPEj.png)

---

## 开启 KoolSS

完成附加设置后，点击「账号设置」选项卡，选择需要的接入点，然后点击底部的「提交」按钮。KoolSS 将会启动。

一段时间后，页面将会自动刷新并返回到账号设置页面，此时 KoolSS 会自动检测状态，如果国内国外均为 OK 状态即可正常使用。

![08.png](https://i.loli.net/2020/04/17/ewjT9Or2py1qMUC.png)


