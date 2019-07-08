### shell-command

An application for KaiOS to execute shell commands from the Javascript layer.

![image1](images/screenshot1.png)



**Install.**


download the dir shell-comand make nested zip files from the dirs **shell-command** and **application**
for informations how to install please check: https://sites.google.com/view/bananahackers/install-omnisd/OmniSD

shell-command
    ├── application
    │   ├── app.js
    │   ├── assets
    │   │   ├── css
    │   │   │   ├── grid.css
    │   │   │   ├── grid.min.css
    │   │   │   ├── main.css
    │   │   │   └── main.min.css
    │   │   └── js
    │   │       ├── applait.finder.min.js
    │   │       ├── jQuery-3.1.0.js
    │   │       ├── script.js
    │   │       └── script.min.js
    │   ├── icons
    │   │   ├── icon-112-112.png
    │   │   ├── icon-112-112.svg
    │   │   ├── icon-56-56.png
    │   │   └── icon-56-56.svg
    │   ├── index.html
    │   └── manifest.webapp
    └── metadata.json


create a dir +file on your SD-Card: cmd/cmd.json
with this structur:
```
[
	{"cmd_name":"title of command","cmd":"shell command"},
]
```

**Examples**

reboot

```
[
	{"cmd_name":"reboot","cmd":"reboot"}
]
```


download .JPG files from a Yi4k+ Camera

```
[
		{"cmd_name":"xi4k-download","cmd":"cd /storage/sdcard/yi4k/ && for i in `seq 1 1000`;do curl -fOv http://192.168.42.1/DCIM/100MEDIA/YIAC0$i.JPG; done"}

]
```
