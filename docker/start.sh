#!/bin/bash
Xvfb :1 -screen 0 1024x768x16 &
export DISPLAY=:1
startxfce4 &
x11vnc -display :1 -forever -usepw -shared &
websockify -D --web=/usr/share/novnc/ 6080 localhost:5900
tail -f /dev/null
