### shell-command

An application for KaiOS to execute shell commands from the Javascript layer.

![image1](images/screenshot1.png)



**How does it work.**

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
