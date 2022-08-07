import sys
import json
sort=sys.argv[1]
file_name=sys.argv[2]
with open('page.json','r') as fr:
    content=json.load(fr)
fr.close()
content[sort].append(file_name)
print(content[sort])
with open('page.json','w') as fw:
    json.dump(content,fw,ensure_ascii=False)
fw.close()