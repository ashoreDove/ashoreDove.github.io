# -*- coding=utf-8 -*-
import sys
import json
import io
from collections import OrderedDict

sort=sys.argv[1]
file_name=sys.argv[2]
title=sys.argv[3]
reload(sys)
sys.setdefaultencoding('utf-8')
with io.open('page.json','r',encoding ='utf-8') as fr:
    content=fr.read()
fr.close()
result = json.loads(content,object_pairs_hook=OrderedDict)
result[sort].append({"Title":title,"URL":file_name})
new_result = json.dumps(result,ensure_ascii=False)
print(new_result)
with io.open('page.json','w',encoding ='utf-8') as fw:
    fw.write(new_result)
fw.close()


