### shell-command

An application for KaiOS to execute shell commands from the Jvascript layer.

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
	{"cmd_name":"reboot","cmd":"reboot"},
]
```
