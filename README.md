### shell-command

An application for KaiOS to execute shell commands from the Jvascript layer.

**How does it work.

create a dir +file on your SD-Card: cmd/cmd.json
with this structur:

[
	{"cmd_name":"reboot","cmd":"reboot"},
	{"cmd_name":"xi4k","cmd":"cd /storage/sdcard/yi4k/ && curl -l --connect-timeout 5 ftp://root@192.168.42.1:21 | while read f;do curl -sO ftp://root@192.168.42.1:21/$f; done"},
	{"cmd_name":"xi4k-download","cmd":"cd /storage/sdcard/yi4k/ && for i in `seq 1 1000`;do curl -fOv http://192.168.42.1/DCIM/100MEDIA/YIAC0$i.JPG; done"}

]

