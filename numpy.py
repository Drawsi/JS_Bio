import socket
import sys

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    print("Socket CREAT")
except socket.error as err:
    print("socket CREARE - EROARE %s" % (err))

port = 80

try:
    host_ip = socket.gethostbyname('www.google.com')
except socket.gaierror:
    print("A aparut o EROARE")
    sys.exit()

s.connect((host_ip,port))

print("Socket-ul a fost CONECTAT la google")