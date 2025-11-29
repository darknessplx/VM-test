FROM ubuntu:22.04

RUN apt update && apt install -y xfce4 xfce4-goodies x11vnc xvfb novnc websockify sudo wget

RUN useradd -m collab && echo "collab:collab" | chpasswd && adduser collab sudo
RUN mkdir /home/collab/.vnc
RUN x11vnc -storepasswd collab /home/collab/.vnc/passwd

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 5900 6080

CMD ["/start.sh"]
