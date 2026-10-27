import random

tunnel = "f290.kdltps.com:15818"

username = 'tt19182064816778'
password = 'm0my10ty'
tunnel_host = 'f290.kdltps.com'
tunnel_port = '15818'

def get_Proxy_Requests():
    return {"http": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": tunnel},
            "https": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": tunnel}};

def get_Proxy_Selenium():
    return '--proxy-server=http://' + tunnel_host + ':' + tunnel_port;






