import sqlite3
import requests
from bs4 import BeautifulSoup as bs
import time
import re

# 余分な文字列の削除


def replace_str(s):
    s = s.replace('\r\n', ' ')
    s = s.replace(u'\n', ' ')
    s = s.replace(u'\xa0', ' ')
    s = s.replace(u'\xa0\xa0', ' ')
    # s=s.replace()
    return s


url = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/curri/2020/10/040/202010040010010ZZ_.html?nendo=0;bu=0;gakubu=4;gakka=0;senko=1;couse=0;def_gakubu="
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(url, headers=header).content, 'html.parser')

# 科目名とシラバスリンクと曜日の抽出
subject = []
syllabus = []
term = []
subjectId=[]

# 商学科単発科目スクレイピング

for i in soup.find_all('ul', class_="spclearfix single"):
    # codeを含む授業名の抽出
    # for j in i.find_all('li', class_="name col2 pt03"):
    #     subject.append(j.text)

    # codeを含まない授業名の抽出
  for j in i.find_all('li', class_="name col2 pt03"):
    deletecode=re.sub('\d+','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(deletebrackets)
    for link in j.find_all('a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[31:54])
    for k in i.select('li:last-child', class_="spclearfix single"):
        term.append(replace_str(k.text))
        # time.sleep(1)
    for id in i.select('li:last-child', class_="spclearfix single"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
# # # # print(subject)
# # # # print(syllabus)
# # # # print(term)
# # # # print(subjectId)


# # # 商学科複数科目スクレイピング


for i in soup.select('[class^="single curriculumbtn"]'):
  for j in i.find_all('li', class_="child_li name col2 pt03"):
    deletecode=re.sub('\d+','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(deletebrackets)
    for link in j.find_all('a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[31:54])
    for k in i.select('li:last-child'):
        term.append(replace_str(k.text))
        # time.sleep(1)
    for id in i.select('li:last-child'):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])



# # 英語科目スクレイピング

englishurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo1.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(englishurl, headers=header).content, 'html.parser')

#   for j in i.find_all('li', class_="name"):
for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]


# ドイツ語科目スクレイピング↓

germanurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo2.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(germanurl, headers=header).content, 'html.parser')

#   for j in i.find_all('li', class_="name"):
for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]

# フランス語科目スクレイピング↓

frenchurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo3.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(frenchurl, headers=header).content, 'html.parser')

#   for j in i.find_all('li', class_="name"):
for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]

# ロシア語↓

russianurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo4.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(russianurl, headers=header).content, 'html.parser')


for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]


# スペイン語　続きここから

spanishurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo5.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(spanishurl, headers=header).content, 'html.parser')


for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]

# 中国語科目↓

chineseurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo6.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(chineseurl, headers=header).content, 'html.parser')


for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]

# 朝鮮語科目　↓

koreanurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo7.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(koreanurl, headers=header).content, 'html.parser')


for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]


# 日本語科目↓

japaneseurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/Gaikokugo8.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(japaneseurl, headers=header).content, 'html.parser')


for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]

# プロフェッショナル英語科目

professionalenglishurl = "http://syllabus3.jm.kansai-u.ac.jp/syllabus/search/kamoku/Gaikokugo/GaikokugoP.html"
header = {"User-Agent": "Mozilla/5.0"}
# html = requests.get(load_url)
soup = bs(requests.get(professionalenglishurl, headers=header).content, 'html.parser')


for i in soup.find_all('ul'):
  for j in i.select('li a'):
    deletecode=re.sub('\d{4,}','',j.text)
    deletebrackets=deletecode.replace('()','')
    subject.append(replace_str(deletebrackets))
    # for link in j.find_all('a'):
    for link in i.select('div.tableblock02 div.tableblock_in ul li a'):
        syllabus.append(
            'http://syllabus3.jm.kansai-u.ac.jp/syllabus/search' + link.get('onclick')[25:48])
    for k in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        term.append(replace_str(k.text))
    term=[l for l in term if l != '  ' ]
    for id in i.select("div.tableblock02 div.tableblock_in ul li:last-child"):
        if '集中' in id.text:
            subjectId.append(37)
        elif 'クォーター' in id.text:
            subjectId.append(37)
        elif '他' in id.text:
            subjectId.append(37)
        elif '月7' in id.text:
            subjectId.append(37)
        elif '火7' in id.text:
            subjectId.append(37)
        elif '水7' in id.text:
            subjectId.append(37)
        elif '木7' in id.text:
            subjectId.append(37)
        elif '金7' in id.text:
            subjectId.append(37)
        elif '土7' in id.text:
            subjectId.append(37)
        else: 
            if  '月1' in id.text:
                subjectId.append(0)
            elif '月2' in id.text:
                subjectId.append(6)
            elif '月3' in id.text:
                subjectId.append(12)
            elif '月4' in id.text:
                subjectId.append(18)
            elif '月5' in id.text:
                subjectId.append(24)
            elif '月6' in id.text:
                subjectId.append(30)
            elif '火1' in id.text:
                subjectId.append(1)
            elif '火2' in id.text:
                subjectId.append(7)
            elif '火3' in id.text:
                subjectId.append(13)
            elif '火4' in id.text:
                subjectId.append(19)
            elif '火5' in id.text:
                subjectId.append(25)
            elif '火6' in id.text:
                subjectId.append(31)
            elif '水1' in id.text:
                subjectId.append(2)
            elif '水2' in id.text:
                subjectId.append(8) 
            elif '水3' in id.text:
                subjectId.append(14)
            elif '水4' in id.text:
                subjectId.append(20)
            elif '水5' in id.text:
                subjectId.append(26)
            elif '水6' in id.text:
                subjectId.append(32)
            elif '木1' in id.text:
                subjectId.append(3)
            elif '木2' in id.text:
                subjectId.append(9)
            elif '木3' in id.text:
                subjectId.append(15)
            elif '木4' in id.text:
                subjectId.append(21)
            elif '木5' in id.text:
                subjectId.append(27)
            elif '木6' in id.text:
                subjectId.append(33)
            elif '金1' in id.text:
                subjectId.append(4)
            elif '金2' in id.text:
                subjectId.append(10)
            elif '金3' in id.text:
                subjectId.append(16)
            elif '金4' in id.text:
                subjectId.append(22)
            elif '金5' in id.text:
                subjectId.append(28)
            elif '金6' in id.text:
                subjectId.append(34)
            elif '土1' in id.text:
                subjectId.append(5)
            elif '土2' in id.text:
                subjectId.append(11)
            elif '土3' in id.text:
                subjectId.append(17)
            elif '土4' in id.text:
                subjectId.append(23)
            elif '土5' in id.text:
                subjectId.append(29)
            elif '土6' in id.text:
                subjectId.append(35)
            else:
                 subjectId.append(replace_str(id.text)[6:8])
        subjectId=[l for l in subjectId if l != '' ]



# print(subject)
# print(syllabus)
# print(term)
# print(subjectId)

# データベースの作成


con = sqlite3.connect('kulms.db')
cur = con.cursor()
cur.executescript("""
drop table if exists subject_data;
CREATE TABLE subject_data(subject,syllabus,term,subjectId)""")

for a, b, c,d in zip(subject, syllabus, term,subjectId):
    cur.execute("INSERT INTO subject_data VALUES(?,?,?,?);", (a, b, c, d))
con.commit()


# link.get('href').slice(11)
