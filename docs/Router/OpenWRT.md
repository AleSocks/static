## 应用概述

Koolshare 论坛释出的修改版 OpenWRT 增加了 Koolshare 特有的软件中心功能，可以很方便地通过图形化界面配置 AleSocks 服务。虽然 OpenWRT 作为一个 Linux 类发行版也可以通过安装特定软件包来配置，但不适用于大部分人的使用，且各种配置项较为复杂。

但是同时，Koolshare 在实现了丰富的功能的同时，也导致稳定性大幅下降，在某些固件版本中还可能大幅影响网络速度，AleSocks 建议用户通过虚拟化部署 OpenWRT 软路由并只使用稳定版本，且需要经常备份你的虚拟机和 OpenWRT 配置文件，避免因为固件稳定性问题影响家庭内整体网络。

!>我们仅在特定平台和版本上进行过测试，并以此撰写文档<br>
此软件更新较为频繁且有多个版本，文档中的部分内容可能和实际存在差异。

## 系统环境

>Windows Server 2016 Datacenter<br>
Hyper-V Hypervisor<br>
Koolshare OpenWRT x64 v2.8<br>
KoolSS (Software center) 1.9.7<br>

## 从软件中心中安装 KoolSS

通过浏览器访问 OpenWRT 管理页面。

?> 由于 Koolshare OpenWRT 的页面存在一些兼容性问题，建议使用 Google Chrome 浏览器

点击左侧侧边栏的「酷软」。

![01.png](https://i.loli.net/2020/04/17/gkHcxzUqTjl9B3I.png)

在软件中心的「未安装」列表中找到「科学上网插件」，如下图：

![02.png](https://i.loli.net/2020/04/17/xVPa2d8v4ZpjfGF.png)

!> 由于 Koolshare 自我审查的原因，现在软件中心不再提供 KoolSS 插件的安装，且插件名称也有所改变，但其实质代码和运作方式并无较大变化。<br>
点击[这里](https://github.com/hq450/fancyss_history_package)可以下载最新的 KoolSS 离线安装包。<br>

点击插件的「安装」按钮安装，页面将会在安装完成够自动跳转。

---

## 获取订阅

此处将显示您的订阅链接，请注意为登录状态：

[cinwell website](/sublink?type=ssr ':include :type=markdown')

!> 这个 **订阅链接** 非常重要，你应当把它当做密码一样妥善保管。

---

## 配置 KoolSS

打开软件中心，然后从「已安装」的插件列表中打开 KoolSS。

如果 KoolSS 出于关闭状态，则点击开关打开它。

点击「节点管理」选项卡， 然后点击二级的「节点管理」选项卡。

![03.png](https://i.loli.net/2020/04/17/veFXulS4tryjN8Y.png)

在下方的 SSR 节点订阅中填写一些必要信息。

将我们刚才复制的 AleSocks 订阅信息 粘贴到「SSR 节点订阅地址」中；将「订阅节点模式设定」选择为「游戏模式」；然后将订阅节点混淆参数设定设置为「使用订阅设定」。

![04.png](https://i.loli.net/2020/04/17/EzX8eIgGRQ1BHOs.png)

>订阅节点模式设定」可以根据你的需求来设置，但最佳使用体验是设置为「游戏模式」。

配置完成后点击「保存订阅设置」，页面将会自动跳转。

完成后，再次返回此页面，并点击「手动更新订阅」。页面将会自动跳转并刷出类似下图的日志信息：

![05.png](https://i.loli.net/2020/04/17/YyMZjWlrhKd8Opv.png)

此时 AleSocks 接入点信息已经添加到你的 KoolSS 中了，现在让我们来做一些附加设置以便更好地使用。

---

## KoolSS 附加设置

点击「规则管理」选项卡，将下方的 KoolSS 规则自动更新设置为「开启」，将时间设置为你可能不会使用网络的时间，然后勾选所有规则复选框。

![07.png](https://i.loli.net/2020/04/17/CLQpjazHnmwlUYe.png)

>你可以只勾选图中红框框选的「chnroute」和「chn_list」，但建议全部勾选。

点击「DNS 设定」选项卡，进行如下设定：

将「选择国内 DNS」设置为「运营商 DNS」或「自定义」，然后输入 119.28.28.28

将「选择国外 DNS」设置为「ss-tunnel」，然后输入 1.1.1.1:53

如果之后发现使用此 DNS 方式会导致「国外连接不可用」，则考虑设置为「dns2socks」方式，然后输入 1.1.1.1:53

勾选「chromecast 支持」以劫持局域网内设备的 DNS 解析，避免受到 DNS 缓存污染

![06.png](https://i.loli.net/2020/04/17/nk4HtDqXFPvfRi9.png)

!> 该图片为AleSocks用户提供。

---

## 开启 KoolSS

返回到 KoolSS 主页面「账号设置」，选择需要使用的接入点，然后点击下方的「提交」按钮。

![08.png](https://i.loli.net/2020/04/17/7PTwenaqDp6ANhB.png)

页面会自动跳转并刷出类似下图的日志信息：

![09.png](https://i.loli.net/2020/04/17/JlhOnW2jPfesN9o.png)

完成后，页面会自动跳转回主页面，并启动连接测试，如果如下图显示则连接成功，所有连接到此路由器的设备都可以通过 AleSocks 网络连接到国际互联网。

![10.png](https://i.loli.net/2020/04/17/ZV9muSrA48OHfRc.png)






