def makelog(pid, lvl, knm, bnm, fnm, lno, txt):
    import json
    from datetime import datetime

    now = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    logtxt = '[{}][{}][{}]{}[{}][{}] {}'.format(pid, now, knm, bnm, fnm, lno, txt)
    dict = {
        'type': pid,
        'level': lvl,
        'text': logtxt
    }
    return json.dumps(dict)

def logout(lvl, knm, bnm, txt):
    import urllib2, inspect, yskpepperproperties
    reload(yskpepperproperties)
    from yskpepperproperties import *
    from naoqi import ALProxy
    
    fnm = inspect.stack()[1][3]
    lno = inspect.stack()[1][2]
    
    try:
        memory = ALProxy("ALMemory")
        rid = memory.getData(ROBOT_ID)
        domain = memory.getData(SERVER_URL)
        jsonlog = makelog(rid, lvl, knm, bnm, fnm, lno, txt)
        url = 'http://' + domain + API_CALL_NAME
        req = urllib2.Request(url)
        req.add_header('Content-Type', 'application/json')
        r = urllib2.urlopen(req, jsonlog)
        response = r.read()
        r.close()
    except Exception as e:
        return e