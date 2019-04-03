import React, { Component } from 'react'
import { observable, action, computed } from 'mobx'
import utils from '../../../utils'
import * as iconPath from '../../../source/svg'
import IconFont from 'react-native-svg-iconfont'
import { NavigationActions } from 'react-navigation'
import moment from 'moment'

class FriendsModel {
  @observable list = [
    {
      'actName': null,
      'forwardCount': 7,
      'lotteryEventData': null,
      'rcmdInfo': null,
      'json': '{"msg":"你曾是那个站在桥下的人吗？ @谢春花 用单曲《桥下》表达了人在被命运安排时的无奈，有所期待却得不到的无力，冷雨之下，风吹散了幻想，结局尘埃落定，我们都在过被交付的人生。爱而不得，事与愿违，人生百态，苦辣酸甜[星星]","song":{"name":"桥下","id":1355940642,"position":0,"alias":[],"status":0,"fee":8,"copyrightId":1416154,"disc":"01","no":0,"artists":[{"name":"谢春花","id":1039895,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"桥下","id":78274425,"type":"EP/Single","size":0,"picId":109951163968049652,"blurPicUrl":"http://p1.music.126.net/bN0IDUrAhhQub-uIQmh41g==/109951163968049652.jpg","companyId":0,"pic":109951163968049652,"picUrl":"http://p1.music.126.net/bN0IDUrAhhQub-uIQmh41g==/109951163968049652.jpg","publishTime":1554220800000,"description":"","tags":"","company":"心喜文化","briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":0,"copyrightId":1416154,"commentThreadId":"R_AL_3_78274425","artists":[{"name":"谢春花","id":1039895,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p2.music.126.net/bN0IDUrAhhQub-uIQmh41g==/109951163968049652.jpg?param=80x80x1"},"starred":false,"popularity":0.0,"score":0,"starredNum":0,"duration":231280,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":"","crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_1355940642","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":0,"hMusic":{"name":null,"id":3735243180,"size":9253660,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":231280,"volumeDelta":-8300.0},"mMusic":{"name":null,"id":3735243181,"size":5552213,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":192000,"playTime":231280,"volumeDelta":-5600.0},"lMusic":{"name":null,"id":3735243182,"size":3701490,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":231280,"volumeDelta":-3800.0},"bMusic":{"name":null,"id":3735243182,"size":3701490,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":231280,"volumeDelta":-3800.0},"rtype":0,"rurl":null,"mvid":0,"mp3Url":null}}',
      'pics': [
        {
          'originUrl': 'https://p2.music.126.net/v7R8GPnh-irCuBTMiR4M9g==/109951163971383295.jpg',
          'squareUrl': 'https://p2.music.126.net/ZB1v8-LMOL2yJ3ZM82w9ZQ==/109951163971390508.jpg',
          'rectangleUrl': 'https://p2.music.126.net/QMoNCRIa_Vp7X_FzP0DcUA==/109951163971388603.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/MB6XVrABc4j2R2geallRMA==/109951163971387714.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/v-wX0531DbIg1uOoIooeXA==/109951163971380918.jpg',
          'width': 1080,
          'height': 1080,
          'format': 'jpg'
        }
      ],
      'showTime': 1554257165968,
      'tmplId': 0,
      'actId': 0,
      'expireTime': 0,
      'eventTime': 1554227736541,
      'user': {
        'defaultAvatar': false,
        'province': 110000,
        'authStatus': 1,
        'followed': true,
        'avatarUrl': 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',
        'accountStatus': 0,
        'gender': 1,
        'city': 110101,
        'birthday': -2209017600000,
        'userId': 1,
        'userType': 2,
        'nickname': '网易云音乐',
        'signature': '网易云音乐是6亿人都在使用的音乐平台，致力于帮助用户发现音乐惊喜，帮助音乐人实现梦想。\n客服在线时间：9：00 - 24：00，如您在使用过程中遇到任何问题，欢迎私信咨询@云音乐客服 ，我们会尽快回复。\n如果仍然不能解决您的问题，请邮件我们：\n用户：ncm5990@163.com\n音乐人：yyr599@163.com\n',
        'description': '网易云音乐官方账号',
        'detailDescription': '网易云音乐官方账号',
        'avatarImgId': 1420569024374784,
        'backgroundImgId': 2002210674180202,
        'backgroundUrl': 'http://p1.music.126.net/pmHS4fcQtcNEGewNb5HRhg==/2002210674180202.jpg',
        'authority': 3,
        'mutual': false,
        'expertTags': null,
        'experts': null,
        'djStatus': 10,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '2002210674180202',
        'avatarImgIdStr': '1420569024374784',
        'urlAnalyze': true,
        'followeds': 99999
      },
      'uuid': 'D10A579944FB4CA2C166A24CDE934D03',
      'id': 6700595523,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 4,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6700595523_1',
          'resourceInfo': {
            'id': 6700595523,
            'userId': 1,
            'name': '分享单曲：「桥下」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 10,
          'likedCount': 93,
          'shareCount': 7,
          'hotCount': 1,
          'latestLikedUsers': [
            {
              's': 1808234203,
              't': 1554259629412
            },
            {
              's': 609414113,
              't': 1554259608475
            },
            {
              's': 308087708,
              't': 1554259543623
            },
            {
              's': 1375246537,
              't': 1554259539718
            },
            {
              's': 1643927643,
              't': 1554259537741
            },
            {
              's': 431884973,
              't': 1554259525533
            },
            {
              's': 549897407,
              't': 1554259523888
            },
            {
              's': 56426239,
              't': 1554259516055
            },
            {
              's': 426457572,
              't': 1554259455804
            },
            {
              's': 1575933421,
              't': 1554259446911
            }
          ],
          'resourceId': 6700595523,
          'resourceTitle': '分享单曲：「桥下」',
          'resourceOwnerId': 1
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6700595523,
        'commentCount': 10,
        'likedCount': 93,
        'threadId': 'A_EV_2_6700595523_1',
        'shareCount': 7
      }
    },
    {
      'actName': null,
      'forwardCount': 164,
      'lotteryEventData': null,
      'rcmdInfo': {
        'reason': '为你发现生活点滴',
        'alg': 'hotEvent_t3',
        'type': 1,
        'scene': 'social',
        'userReason': '5362粉丝'
      },
      'json': '{"msg":"网上看到的，好厉害的说，懂得人自然看得懂[爱心][爱心][爱心]","song":{"name":"蜉蝣","id":34228112,"position":3,"alias":[],"status":0,"fee":8,"copyrightId":636011,"disc":"1","no":3,"artists":[{"name":"华晨宇","id":861777,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"异类","id":3292678,"type":"EP/Single","size":11,"picId":109951163077613693,"blurPicUrl":"http://p1.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg","companyId":0,"pic":109951163077613693,"picUrl":"http://p1.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg","publishTime":1450368000007,"description":"","tags":"","company":"天娱传媒","briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":1,"copyrightId":636011,"commentThreadId":"R_AL_3_3292678","artists":[{"name":"华晨宇","id":861777,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p1.music.126.net/UsSAd3Bdf77DjhCuTSEvUw==/109951163077613693.jpg?param=80x80x1"},"starred":false,"popularity":100.0,"score":100,"starredNum":0,"duration":307738,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":null,"crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_34228112","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":2,"hMusic":{"name":null,"id":102711233,"size":12312075,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":307738,"volumeDelta":-31000.0},"mMusic":{"name":null,"id":102711234,"size":7387262,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":192000,"playTime":307738,"volumeDelta":-28599.0},"lMusic":{"name":null,"id":102711235,"size":4924856,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":307738,"volumeDelta":-26900.0},"bMusic":{"name":null,"id":102711235,"size":4924856,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":307738,"volumeDelta":-26900.0},"mp3Url":null,"rtype":0,"rurl":null,"mvid":499147}}',
      'pics': [
        {
          'originUrl': 'https://p2.music.126.net/OAnoi-kNyI3UcNACBADpKg==/109951163761056021.jpg',
          'squareUrl': 'https://p2.music.126.net/aivqWgBCCIuFOV_PA2hJjA==/109951163761052702.jpg',
          'rectangleUrl': 'https://p2.music.126.net/oGakHiPkqNSFpicXL2x1dA==/109951163761050265.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/Yu9d_nCGKuZ5YP6aBkaeqQ==/109951163761049295.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/BBljeEvhfjwbXrWtxctnag==/109951163761055598.jpg',
          'width': 960,
          'height': 1280,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/Q87u1pb2paHK97PByUmnwg==/109951163761054638.jpg',
          'squareUrl': 'https://p2.music.126.net/yqncDK6_lr9Ht9l3FIGeVQ==/109951163761046952.jpg',
          'rectangleUrl': 'https://p2.music.126.net/xSUnHjpM6G9R8WaDCj_KDw==/109951163761057033.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/3sDLHOL4dkYW6b2HTfGKOA==/109951163761049789.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/OdV4sG8ygFpv0pUkLFMMjQ==/109951163761050783.jpg',
          'width': 960,
          'height': 1257,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/0fBV0AKznpU_TmvRprX2KA==/109951163761057531.jpg',
          'squareUrl': 'https://p2.music.126.net/Vl_y7IkeX9GX0znubY7R_g==/109951163761046964.jpg',
          'rectangleUrl': 'https://p2.music.126.net/aj1uUPtms-bOILsxQFKJFQ==/109951163761058510.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/0A2TgCrFrMnPTjJq_1ieew==/109951163761054665.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/V59BEGuqa2ZM4xeTY1EyxQ==/109951163761047891.jpg',
          'width': 960,
          'height': 1280,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/WszvarP0wU2uRN5o_kDZsg==/109951163761057550.jpg',
          'squareUrl': 'https://p2.music.126.net/9l-2Y2Z4Svj20CQcE70wUg==/109951163761058548.jpg',
          'rectangleUrl': 'https://p2.music.126.net/ANnY7o1Y0Ck99PzUaA_l8Q==/109951163761054261.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/synS90dZh3ltQMzdNSt9Ig==/109951163761048406.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/RKfM_fi53IwQ-55JjoSaKw==/109951163761060015.jpg',
          'width': 843,
          'height': 1265,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/U-bDGeo_8ffe2DUN9vFO7A==/109951163761049363.jpg',
          'squareUrl': 'https://p2.music.126.net/j4tku3-hAQkfqsHDjhhwQw==/109951163761056186.jpg',
          'rectangleUrl': 'https://p2.music.126.net/KFsqHTRa9R7mxKdh3na5xg==/109951163761047948.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/axt4ifnVSMYqeOzTxP0-nw==/109951163761053321.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/hmfLku-XuUJ9QhnAVLuKHg==/109951163761054295.jpg',
          'width': 960,
          'height': 1497,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/3jG0LEg7RLxn4Lp5_OdR7A==/109951163761048955.jpg',
          'squareUrl': 'https://p2.music.126.net/bNvzl1kxATjmPUMFr6321w==/109951163761056196.jpg',
          'rectangleUrl': 'https://p2.music.126.net/_DVsZqI9VUZiuPwllt-i-A==/109951163761055711.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/FEXnKvcEoDNIh3fNz3dOLg==/109951163761049424.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/FJkEOiSAOSb8C_NbMw4jYg==/109951163761048459.jpg',
          'width': 960,
          'height': 1508,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/ewKmYxsZQZtvAGdeT5gs8Q==/109951163761059562.jpg',
          'squareUrl': 'https://p2.music.126.net/wImahHBwx8zAFp_auv0Cnw==/109951163761053807.jpg',
          'rectangleUrl': 'https://p2.music.126.net/0lGoBd2egllGQBNb4mhjJA==/109951163761057648.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/9YC2rVpYG7MxXOeR2XeyEQ==/109951163761057160.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/Ty2A-mgG8xMfBlehIh2t9A==/109951163761048988.jpg',
          'width': 960,
          'height': 1481,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/UY108qqcnCH3Jb6Y30wU_Q==/109951163761056681.jpg',
          'squareUrl': 'https://p2.music.126.net/IuhqamFB7oCRDwPUqjks3w==/109951163761048994.jpg',
          'rectangleUrl': 'https://p2.music.126.net/EZxdIOGRi-DCPUQFzzA4Rw==/109951163761058639.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/TfTyl7GhtZhYEq838y4XcQ==/109951163761054771.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/pzfQJG1y2dghNJ-ZtvREGg==/109951163761049445.jpg',
          'width': 960,
          'height': 1537,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/MkvW4ZfJbISnDueVSb4M-g==/109951163761055251.jpg',
          'squareUrl': 'https://p2.music.126.net/LiMzju_7-73nKgfpFQ01ug==/109951163761058129.jpg',
          'rectangleUrl': 'https://p2.music.126.net/cgjgSuYRJyC_FtOvMi9Y_A==/109951163761048495.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/6GC-HgSB1aZ0zDqKfHXMJA==/109951163761049449.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/dYDgmxCCqmkaUOXPnCrgUQ==/109951163761056220.jpg',
          'width': 400,
          'height': 300,
          'format': 'gif'
        }
      ],
      'showTime': 1546265626556,
      'tmplId': 0,
      'actId': 0,
      'expireTime': 0,
      'eventTime': 1554211781038,
      'user': {
        'defaultAvatar': false,
        'province': 1000000,
        'authStatus': 0,
        'followed': false,
        'avatarUrl': 'http://p1.music.126.net/62GBbYU8ixPaYVyxhCqNVQ==/109951163953173067.jpg',
        'accountStatus': 0,
        'gender': 2,
        'city': 1006600,
        'birthday': 294595200000,
        'userId': 354765716,
        'userType': 201,
        'nickname': '清菡涟漪',
        'signature': '',
        'description': '',
        'detailDescription': '',
        'avatarImgId': 109951163953173070,
        'backgroundImgId': 109951163846511660,
        'backgroundUrl': 'http://p1.music.126.net/5FDBTHaXEA2uXACRbJljag==/109951163846511660.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': {
          '1': '视频达人(华语、音乐现场)',
          '2': '华语音乐资讯达人'
        },
        'djStatus': 0,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '109951163846511660',
        'avatarImgIdStr': '109951163953173067',
        'urlAnalyze': false,
        'avatarImgId_str': '109951163953173067',
        'followeds': 5362
      },
      'uuid': '68987F61A8AA115C6CC258861F9B2D8B',
      'id': 6182286864,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 112,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6182286864_354765716',
          'resourceInfo': {
            'id': 6182286864,
            'userId': 354765716,
            'name': '分享单曲：「蜉蝣」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 232,
          'likedCount': 3522,
          'shareCount': 164,
          'hotCount': 5,
          'latestLikedUsers': [
            {
              's': 376206127,
              't': 1554258354604
            },
            {
              's': 52767762,
              't': 1554258134593
            },
            {
              's': 1502292755,
              't': 1554257333822
            },
            {
              's': 73016590,
              't': 1554253385027
            },
            {
              's': 1783167842,
              't': 1554253258006
            },
            {
              's': 451225709,
              't': 1554252538381
            },
            {
              's': 345646403,
              't': 1554252307706
            },
            {
              's': 1812709827,
              't': 1554251453137
            },
            {
              's': 482273352,
              't': 1554250535268
            },
            {
              's': 453749839,
              't': 1554248558701
            }
          ],
          'resourceId': 6182286864,
          'resourceTitle': '分享单曲：「蜉蝣」',
          'resourceOwnerId': 354765716
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6182286864,
        'commentCount': 232,
        'likedCount': 3522,
        'threadId': 'A_EV_2_6182286864_354765716',
        'shareCount': 164
      }
    },
    {
      'actName': '早安世界',
      'forwardCount': 22,
      'lotteryEventData': null,
      'rcmdInfo': null,
      'json': '{"msg":"#早安世界# 2019已经过去四分之一了鸭[晕][晕]","playlist":{"name":"2019已经过去¼ 你的目标完成的怎么样了？","id":2735889770,"trackNumberUpdateTime":1554197564606,"status":0,"userId":450639585,"createTime":1554112681627,"updateTime":1554197641446,"subscribedCount":10650,"trackCount":44,"cloudTrackCount":0,"coverImgUrl":"http://p2.music.126.net/cyalcz3IYAXormx2TvGiuA==/109951163968036196.jpg","coverImgId":109951163968036196,"description":"时间一晃 2019居然过去了四分之一？？？\\n（不要再纠结是四分之一还是三分之一了 我这里按天数算吧 四分之一 希望你们能谅解）\\n\\n不知不觉 也马上到了2019的一半了\\n不知你正在看我写的简介的时候\\n能否想到自己的目标是什么？\\n\\n追求自己喜欢的人？\\n事业上的成败？\\n又或许是\\n2019年高考的一句\\n“你考上了”\\n\\n不管你的目标是什么\\n只希望你能努力\\n为心所想 为梦而奋斗\\n\\n歌单选曲为诉说故事与励志一面（欧美为热血一面）\\n希望你听完歌单后\\n更加的为此奋斗\\n\\n加油!","tags":["华语","欧美","流行"],"playCount":895812,"trackUpdateTime":1554201170930,"specialType":0,"totalDuration":0,"creator":{"defaultAvatar":false,"province":1000000,"authStatus":0,"followed":false,"avatarUrl":"http://p1.music.126.net/xdeJm_BJsVcqdhYIGjdtgA==/109951163755481507.jpg","accountStatus":0,"gender":1,"city":1000500,"birthday":-2209017600000,"userId":450639585,"userType":200,"nickname":"四季里的懒睡猫","signature":"Do what you like to do.\\n\\nTIM：2972519130","description":"","detailDescription":"","avatarImgId":109951163755481507,"backgroundImgId":109951163950454405,"backgroundUrl":"http://p1.music.126.net/gkQEtbboTrkuo_dMqJBwoA==/109951163950454405.jpg","authority":0,"mutual":false,"expertTags":["另类/独立","流行","欧美"],"experts":null,"djStatus":0,"vipType":11,"remarkName":null,"avatarImgIdStr":"109951163755481507","backgroundImgIdStr":"109951163950454405","avatarImgId_str":"109951163755481507"},"tracks":null,"subscribers":[],"subscribed":null,"commentThreadId":"A_PL_0_2735889770","newImported":false,"adType":0,"highQuality":false,"privacy":0,"ordered":true,"anonimous":false,"coverImgId_str":"109951163968036196"}}',
      'pics': [
        {
          'originUrl': 'https://p2.music.126.net/Imb78Jk-2seiwIGVsjy__A==/109951163971323064.jpg',
          'squareUrl': 'https://p2.music.126.net/8Kr8SEaW5cQ6yTuRmpONaw==/109951163971322588.jpg',
          'rectangleUrl': 'https://p2.music.126.net/6xvC-jq1d1zlHaDCfJMUzQ==/109951163971312464.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/Xud2y2uJ3LN7j-xue9iuOA==/109951163971324039.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/uLpTrzfES2OCCosk0rwmnA==/109951163971316845.jpg',
          'width': 750,
          'height': 1500,
          'format': 'jpg'
        }
      ],
      'showTime': 1554253498440,
      'tmplId': 0,
      'actId': 2507050,
      'expireTime': 0,
      'eventTime': 1554203803287,
      'user': {
        'defaultAvatar': false,
        'province': 110000,
        'authStatus': 1,
        'followed': true,
        'avatarUrl': 'http://p1.music.126.net/_aEPXmHuskM-g140GROZnQ==/109951163879490620.jpg',
        'accountStatus': 0,
        'gender': 0,
        'city': 110101,
        'birthday': 631123200000,
        'userId': 9003,
        'userType': 10,
        'nickname': '云音乐小秘书',
        'signature': '网易云音乐是6亿人都在使用的音乐平台，致力于帮助用户发现音乐惊喜，帮助音乐人实现梦想。\n客服@云音乐客服 在线时间：9：00 - 24：00，如您在使用过程中遇到任何问题，欢迎私信咨询，我们会尽快回复。\n如果仍然不能解决您的问题，请邮件我们：\n用户：ncm5990@163.com\n音乐人：yyr599@163.com',
        'description': '云音乐小甜心',
        'detailDescription': '云音乐小甜心',
        'avatarImgId': 109951163879490620,
        'backgroundImgId': 2867526325260039,
        'backgroundUrl': 'http://p1.music.126.net/bKMPa2ExjGaNPXRjCISOZg==/2867526325260039.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': null,
        'djStatus': 0,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '2867526325260039',
        'avatarImgIdStr': '109951163879490620',
        'urlAnalyze': true,
        'avatarImgId_str': '109951163879490620',
        'followeds': 99999
      },
      'uuid': '85BFE356118BAE9C1BAB476CC07980EF',
      'id': 6700363256,
      'type': 13,
      'topEvent': false,
      'insiteForwardCount': 18,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6700363256_9003',
          'resourceInfo': {
            'id': 6700363256,
            'userId': 9003,
            'name': '分享歌单：「2019已经过去¼ 你的目标完成的怎么样了？」',
            'imgUrl': null,
            'creator': null,
            'eventType': 13
          },
          'resourceType': 2,
          'commentCount': 92,
          'likedCount': 438,
          'shareCount': 22,
          'hotCount': 6,
          'latestLikedUsers': [
            {
              's': 382465410,
              't': 1554259620458
            },
            {
              's': 1598658946,
              't': 1554259614545
            },
            {
              's': 431884973,
              't': 1554259558012
            },
            {
              's': 49912422,
              't': 1554259548898
            },
            {
              's': 572573361,
              't': 1554259536723
            },
            {
              's': 583229272,
              't': 1554259529944
            },
            {
              's': 86530068,
              't': 1554259503892
            },
            {
              's': 287623996,
              't': 1554259501881
            },
            {
              's': 595672845,
              't': 1554259485014
            },
            {
              's': 252785078,
              't': 1554259470172
            }
          ],
          'resourceId': 6700363256,
          'resourceTitle': '分享歌单：「2019已经过去¼ 你的目标完成的怎么样了？」',
          'resourceOwnerId': 9003
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6700363256,
        'commentCount': 92,
        'likedCount': 438,
        'threadId': 'A_EV_2_6700363256_9003',
        'shareCount': 22
      }
    },
    {
      'actName': '晚安时光',
      'forwardCount': 265,
      'lotteryEventData': null,
      'rcmdInfo': null,
      'json': '{"msg":"#晚安时光# “要说人生有什么开心的，那就是，哪怕发生了悲伤到无法承受的事情，也会在未来某一天重获笑容吧。”🌙","song":{"name":"早开的晚霞","id":108294,"position":8,"alias":[],"status":0,"fee":8,"copyrightId":677020,"disc":"1","no":8,"artists":[{"name":"林宥嘉","id":3685,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"美妙生活","id":10757,"type":"专辑","size":11,"picId":109951163177954238,"blurPicUrl":"http://p1.music.126.net/nJlpALEtfmeFzb_k8RkDuQ==/109951163177954238.jpg","companyId":0,"pic":109951163177954238,"picUrl":"http://p1.music.126.net/nJlpALEtfmeFzb_k8RkDuQ==/109951163177954238.jpg","publishTime":1304611200007,"description":"","tags":"","company":"华研国际","briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":40,"copyrightId":1004,"commentThreadId":"R_AL_3_10757","artists":[{"name":"林宥嘉","id":3685,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p1.music.126.net/nJlpALEtfmeFzb_k8RkDuQ==/109951163177954238.jpg?param=80x80x1"},"starred":false,"popularity":100.0,"score":100,"starredNum":0,"duration":320586,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":"","crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_108294","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":2,"bMusic":{"name":null,"id":1426671390,"size":5130493,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":320586,"volumeDelta":788.0},"mp3Url":null,"rtype":0,"rurl":null,"mvid":0,"hMusic":{"name":null,"id":1426671388,"size":12826166,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":320586,"volumeDelta":0.0},"mMusic":{"name":null,"id":1426671389,"size":7695717,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":192000,"playTime":320586,"volumeDelta":997.0},"lMusic":{"name":null,"id":1426671390,"size":5130493,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":320586,"volumeDelta":788.0}}}',
      'pics': [
        {
          'originUrl': 'https://p1.music.126.net/sbr4ltJbe-6k5FbMlHHgWg==/109951163970809753.jpg',
          'squareUrl': 'https://p1.music.126.net/HAtDLt2v9dZGrRIMMXRdsg==/109951163970815021.jpg',
          'rectangleUrl': 'https://p1.music.126.net/8FTPuaMJTl9XT7lzmusdIA==/109951163970809760.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/ZQYmGAaW_Kih1JMSgA3Q5A==/109951163970815022.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/Q57HHHCjNV8PQgtT4Diwow==/109951163970812610.jpg',
          'width': 1280,
          'height': 942,
          'format': 'jpg'
        }
      ],
      'showTime': 1554218093316,
      'tmplId': 0,
      'actId': 2683051,
      'expireTime': 0,
      'eventTime': 1554199814411,
      'user': {
        'defaultAvatar': false,
        'province': 110000,
        'authStatus': 1,
        'followed': true,
        'avatarUrl': 'http://p1.music.126.net/_aEPXmHuskM-g140GROZnQ==/109951163879490620.jpg',
        'accountStatus': 0,
        'gender': 0,
        'city': 110101,
        'birthday': 631123200000,
        'userId': 9003,
        'userType': 10,
        'nickname': '云音乐小秘书',
        'signature': '网易云音乐是6亿人都在使用的音乐平台，致力于帮助用户发现音乐惊喜，帮助音乐人实现梦想。\n客服@云音乐客服 在线时间：9：00 - 24：00，如您在使用过程中遇到任何问题，欢迎私信咨询，我们会尽快回复。\n如果仍然不能解决您的问题，请邮件我们：\n用户：ncm5990@163.com\n音乐人：yyr599@163.com',
        'description': '云音乐小甜心',
        'detailDescription': '云音乐小甜心',
        'avatarImgId': 109951163879490620,
        'backgroundImgId': 2867526325260039,
        'backgroundUrl': 'http://p1.music.126.net/bKMPa2ExjGaNPXRjCISOZg==/2867526325260039.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': null,
        'djStatus': 0,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '2867526325260039',
        'avatarImgIdStr': '109951163879490620',
        'urlAnalyze': true,
        'avatarImgId_str': '109951163879490620',
        'followeds': 99999
      },
      'uuid': '09A46DAA94AB4348B57D07041751797A',
      'id': 6698708539,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 181,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6698708539_9003',
          'resourceInfo': {
            'id': 6698708539,
            'userId': 9003,
            'name': '分享单曲：「早开的晚霞」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 239,
          'likedCount': 2460,
          'shareCount': 265,
          'hotCount': 18,
          'latestLikedUsers': [
            {
              's': 431884973,
              't': 1554259597894
            },
            {
              's': 1774837490,
              't': 1554259552612
            },
            {
              's': 1408972162,
              't': 1554259543006
            },
            {
              's': 1306887704,
              't': 1554259539568
            },
            {
              's': 512777782,
              't': 1554259515570
            },
            {
              's': 595672845,
              't': 1554259507207
            },
            {
              's': 332955428,
              't': 1554259451550
            },
            {
              's': 1724207811,
              't': 1554259432799
            },
            {
              's': 1596499554,
              't': 1554259425249
            },
            {
              's': 541621660,
              't': 1554259312553
            }
          ],
          'resourceId': 6698708539,
          'resourceTitle': '分享单曲：「早开的晚霞」',
          'resourceOwnerId': 9003
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6698708539,
        'commentCount': 239,
        'likedCount': 2460,
        'threadId': 'A_EV_2_6698708539_9003',
        'shareCount': 265
      }
    },
    {
      'actName': null,
      'forwardCount': 0,
      'lotteryEventData': null,
      'rcmdInfo': {
        'reason': '最赞粉丝作品，我敬你是个人才！',
        'alg': 'qrt_event',
        'type': 1,
        'scene': 'social',
        'userReason': '6699粉丝'
      },
      'json': '{"msg":"篮球真的好难打～我自闭了。。。。我不会。。。蔡老师的舞真的好难～","video":{"vid":0,"coverUrl":"http://p3.music.126.net/6vGJbPYdUh4NpuQIXmmSvA==/109951163971086314.jpg","duration":201,"playTime":2226,"height":1080,"width":1920,"size":88431800,"state":1,"coverType":0,"urlInfo":null,"videoId":"DEA2F8F76B60B8D721774D290FBE9818","threadId":null,"title":"看小姐姐第一次学蔡徐坤篮球舞《只因你太美》","description":"篮球真的好难打～我自闭了。。。。我不会。。。蔡老师的舞真的好难～","creator":{"defaultAvatar":false,"province":310000,"authStatus":1,"followed":false,"avatarUrl":"http://p1.music.126.net/80756Gn_WIUC2MfxrTnFKg==/3433774821909683.jpg","accountStatus":0,"gender":2,"city":310101,"birthday":732643200000,"userId":295439729,"userType":4,"nickname":"丁译林","signature":"微博:丁译林connyrabbit ,上海财经大学校园十大歌手冠军 Echo 合唱团女高音","description":"","detailDescription":"","avatarImgId":3433774821909683,"backgroundImgId":109951163208890177,"backgroundUrl":"http://p1.music.126.net/VKajepQqipL6vLnwYkY9uA==/109951163208890177.jpg","authority":0,"mutual":false,"expertTags":null,"experts":{"1":"音乐原创视频达人"},"djStatus":10,"vipType":0,"remarkName":null,"backgroundImgIdStr":"109951163208890177","avatarImgIdStr":"3433774821909683"},"videoStatus":0,"resolutions":[{"resolution":0,"size":88431800}],"durationms":201813}}',
      'pics': [],
      'showTime': 1554226656622,
      'tmplId': 0,
      'actId': 0,
      'expireTime': 0,
      'eventTime': 1554197819973,
      'user': {
        'defaultAvatar': false,
        'province': 310000,
        'authStatus': 1,
        'followed': false,
        'avatarUrl': 'http://p1.music.126.net/80756Gn_WIUC2MfxrTnFKg==/3433774821909683.jpg',
        'accountStatus': 0,
        'gender': 2,
        'city': 310101,
        'birthday': 732643200000,
        'userId': 295439729,
        'userType': 4,
        'nickname': '丁译林',
        'signature': '微博:丁译林connyrabbit ,上海财经大学校园十大歌手冠军 Echo 合唱团女高音',
        'description': '',
        'detailDescription': '',
        'avatarImgId': 3433774821909683,
        'backgroundImgId': 109951163208890180,
        'backgroundUrl': 'http://p1.music.126.net/VKajepQqipL6vLnwYkY9uA==/109951163208890177.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': {
          '1': '音乐原创视频达人'
        },
        'djStatus': 10,
        'vipType': 0,
        'remarkName': null,
        'backgroundImgIdStr': '109951163208890177',
        'avatarImgIdStr': '3433774821909683',
        'urlAnalyze': true,
        'followeds': 6699
      },
      'uuid': null,
      'id': 6699498390,
      'type': 39,
      'topEvent': false,
      'insiteForwardCount': 0,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6699498390_295439729',
          'resourceInfo': null,
          'resourceType': 2,
          'commentCount': 7,
          'likedCount': 7,
          'shareCount': 0,
          'hotCount': 0,
          'latestLikedUsers': [
            {
              's': 616086170,
              't': 1554259536849
            },
            {
              's': 424367600,
              't': 1554259105684
            },
            {
              's': 573489886,
              't': 1554258662693
            },
            {
              's': 1745705820,
              't': 1554256870405
            },
            {
              's': 294363523,
              't': 1554252599596
            },
            {
              's': 354336400,
              't': 1554246864722
            },
            {
              's': 1787076667,
              't': 1554230029702
            }
          ],
          'resourceId': 0,
          'resourceTitle': null,
          'resourceOwnerId': 0
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6699498390,
        'commentCount': 7,
        'likedCount': 7,
        'threadId': 'A_EV_2_6699498390_295439729',
        'shareCount': 0
      }
    },
    {
      'actName': null,
      'forwardCount': 29,
      'lotteryEventData': null,
      'rcmdInfo': null,
      'json': '{"msg":"十几岁就产出这样高质量的作品，真正的未来可期。","song":{"name":"listen before i go","id":1355149440,"position":0,"alias":[],"status":0,"fee":8,"copyrightId":7003,"disc":"01","no":12,"artists":[{"name":"Billie Eilish","id":11972054,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?","id":78243642,"type":"专辑","size":14,"picId":109951163959066909,"blurPicUrl":"http://p1.music.126.net/ARn_7WFEy81bwiDwwgm2AA==/109951163959066909.jpg","companyId":0,"pic":109951163959066909,"picUrl":"http://p1.music.126.net/ARn_7WFEy81bwiDwwgm2AA==/109951163959066909.jpg","publishTime":1553788800000,"description":"","tags":"","company":"环球唱片","briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":3,"copyrightId":7003,"commentThreadId":"R_AL_3_78243642","artists":[{"name":"Billie Eilish","id":11972054,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p2.music.126.net/ARn_7WFEy81bwiDwwgm2AA==/109951163959066909.jpg?param=80x80x1"},"starred":false,"popularity":100.0,"score":100,"starredNum":0,"duration":242652,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":"","crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_1355149440","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":1,"rtype":0,"rurl":null,"mvid":0,"bMusic":{"name":null,"id":3733406437,"size":3883720,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":242652,"volumeDelta":630.0},"mp3Url":null,"hMusic":{"name":null,"id":3733406435,"size":9709236,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":242652,"volumeDelta":-2.0},"mMusic":{"name":null,"id":3733406436,"size":5825559,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":192000,"playTime":242652,"volumeDelta":2566.0},"lMusic":{"name":null,"id":3733406437,"size":3883720,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":242652,"volumeDelta":630.0}}}',
      'pics': [],
      'showTime': 1554213297417,
      'tmplId': 0,
      'actId': 0,
      'expireTime': 0,
      'eventTime': 1554196822754,
      'user': {
        'defaultAvatar': false,
        'province': 330000,
        'authStatus': 1,
        'followed': true,
        'avatarUrl': 'http://p1.music.126.net/qQdmaI7Pezm8__LyKN8qFg==/109951163661625142.jpg',
        'accountStatus': 0,
        'gender': 1,
        'city': 330100,
        'birthday': -2209017600000,
        'userId': 48353,
        'userType': 10,
        'nickname': '网易UFO丁磊',
        'signature': '做音乐，是为了灵魂的对话与沟通。感谢你一直喜欢云音乐。\n做网易考拉， 是为了让你足不出户，就可以用当地价买遍全世界的好商品。网易自营，保证正品，假一赔十。http://www.kaola.com/\n做有道精品课，是为了让每个孩子都可以跟一流名师学习，享受最高质量的在线教育课程，提高成绩。 http://ke.youdao.com/\n做网易严选，是为了将好产品做到普世价格。网易自己严选产地、材质、工艺和设计，都是为了让你不用选。http://you.163.com/',
        'description': '网易公司创始人、CEO',
        'detailDescription': '网易公司创始人、CEO',
        'avatarImgId': 109951163661625140,
        'backgroundImgId': 2812550743861251,
        'backgroundUrl': 'http://p1.music.126.net/ifqMyD-v2RfJ9HiXGJeVJg==/2812550743861251.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': null,
        'djStatus': 0,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '2812550743861251',
        'avatarImgIdStr': '109951163661625142',
        'urlAnalyze': true,
        'avatarImgId_str': '109951163661625142',
        'followeds': 99999
      },
      'uuid': 'C11D6E4FF6EC9A0C9AB4D79BE35D03BB',
      'id': 6697939574,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 16,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6697939574_48353',
          'resourceInfo': {
            'id': 6697939574,
            'userId': 48353,
            'name': '分享单曲：「listen before i go」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 218,
          'likedCount': 1588,
          'shareCount': 29,
          'hotCount': 33,
          'latestLikedUsers': [
            {
              's': 629216855,
              't': 1554259635995
            },
            {
              's': 369237790,
              't': 1554259538652
            },
            {
              's': 340986133,
              't': 1554259498076
            },
            {
              's': 1553299061,
              't': 1554259447043
            },
            {
              's': 510241682,
              't': 1554259390943
            },
            {
              's': 567393030,
              't': 1554259343922
            },
            {
              's': 93588758,
              't': 1554259248886
            },
            {
              's': 75163692,
              't': 1554258890580
            },
            {
              's': 1667168119,
              't': 1554258811383
            },
            {
              's': 514157044,
              't': 1554258806096
            }
          ],
          'resourceId': 6697939574,
          'resourceTitle': '分享单曲：「listen before i go」',
          'resourceOwnerId': 48353
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6697939574,
        'commentCount': 218,
        'likedCount': 1588,
        'threadId': 'A_EV_2_6697939574_48353',
        'shareCount': 29
      }
    },
    {
      'actName': null,
      'forwardCount': 16,
      'lotteryEventData': null,
      'rcmdInfo': null,
      'json': '{"msg":"琵琶女神赵聪老师入驻云村！不知那只锦鲤能听到“国家队”老师的亲口回答，快来转发吧~","event":{"actName":null,"forwardCount":47,"lotteryEventData":null,"rcmdInfo":null,"json":"{\\"msg\\":\\"我是琵琶演奏家赵聪，很高兴入驻云音乐！希望大家喜欢我的《新编十面埋伏》《琵琶语》《水龙吟》等演奏作品。为方便更多同学了解音乐，我们制作了《聪老师的世界音乐之旅》，带你听遍各地曲风！截至4月14日，转发此动态并说出你关于音乐的疑问，我将抽取3位朋友的问题在节目中回答、送出签名专辑！\\",\\"djRadio\\":{\\"id\\":792584376,\\"dj\\":{\\"defaultAvatar\\":false,\\"province\\":110000,\\"authStatus\\":0,\\"followed\\":false,\\"avatarUrl\\":\\"http://p1.music.126.net/tV_VXztOiO2jYk9QYfhCHA==/18789554209163253.jpg\\",\\"accountStatus\\":0,\\"gender\\":0,\\"city\\":110101,\\"birthday\\":-2209017600000,\\"userId\\":644390236,\\"userType\\":0,\\"nickname\\":\\"中信书院\\",\\"signature\\":\\"\\",\\"description\\":\\"\\",\\"detailDescription\\":\\"\\",\\"avatarImgId\\":18789554209163253,\\"backgroundImgId\\":109951162868126486,\\"backgroundUrl\\":\\"http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg\\",\\"authority\\":0,\\"mutual\\":false,\\"expertTags\\":null,\\"experts\\":null,\\"djStatus\\":10,\\"vipType\\":0,\\"remarkName\\":null,\\"backgroundImgIdStr\\":\\"109951162868126486\\",\\"avatarImgIdStr\\":\\"18789554209163253\\",\\"avatarImgId_str\\":\\"18789554209163253\\"},\\"name\\":\\"聪老师的世界音乐之旅\\",\\"picUrl\\":\\"http://p1.music.126.net/891XIlGWdUBVRsNSOY_hwg==/109951163787867618.jpg\\",\\"desc\\":\\"2019年新年第一课\\\\n聪老师的世界音乐之旅\\\\n\\\\n一个从小学习音乐的孩子，无论人生是否成功，TA的内心都将是高贵、丰盈、美好、从容的。 —— 赵聪\\\\n\\\\n中央民族乐团副团长赵聪老师\\\\n首档音频课程\\\\n囊括亚洲、欧洲、拉丁美洲、非洲、大洋洲\\\\n最典型的音乐知识与人文故事\\\\n\\\\n以音乐为载体，以美的启蒙为目标\\\\n定制一套适用全家的音乐通识课\\",\\"subCount\\":0,\\"programCount\\":28,\\"createTime\\":1547193986192,\\"categoryId\\":14,\\"category\\":\\"亲子宝贝\\",\\"radioFeeType\\":2,\\"feeScope\\":0,\\"buyed\\":false,\\"videos\\":null,\\"finished\\":false,\\"underShelf\\":false,\\"purchaseCount\\":0,\\"price\\":0,\\"originalPrice\\":0,\\"discountPrice\\":null,\\"lastProgramCreateTime\\":1554116400000,\\"lastProgramName\\":null,\\"lastProgramId\\":2060271815,\\"picId\\":109951163787867618,\\"rcmdText\\":\\"国家级琵琶演奏家首档音乐通识课\\",\\"composeVideo\\":false,\\"img80x80\\":\\"https://p1.music.126.net/891XIlGWdUBVRsNSOY_hwg==/109951163787867618.jpg?param=80x80x1\\"}}","pics":[{"originUrl":"https://p2.music.126.net/qyIqPfAXINwZhJsQhCyJuw==/109951163969611706.jpg","squareUrl":"https://p2.music.126.net/jrjDtto1C3W7T_byp3rX4g==/109951163969608416.jpg","rectangleUrl":"https://p2.music.126.net/-HxxpcmQZcNRg54xiWYwnQ==/109951163969609341.jpg","pcSquareUrl":"https://p2.music.126.net/Hsx64bs63VD9AjUMu7OHoQ==/109951163969609857.jpg","pcRectangleUrl":"https://p2.music.126.net/shSO--nR3CgVHgU_p_s6xg==/109951163969607418.jpg","width":1000,"height":3690,"format":"jpg"},{"originUrl":"https://p2.music.126.net/Crb1j1jL-hv5rCdFlxeL0g==/109951163969608419.jpg","squareUrl":"https://p2.music.126.net/ZHYcNiuJD7XF5CKS2dKm5w==/109951163969613672.jpg","rectangleUrl":"https://p2.music.126.net/JWvDUbX3Ix3nd5yDerTD2A==/109951163969610340.jpg","pcSquareUrl":"https://p2.music.126.net/izvUuwXbmVSJxcGh-1tAYw==/109951163969616077.jpg","pcRectangleUrl":"https://p2.music.126.net/FwB30yieORuXVcY3sSuLpQ==/109951163969607423.jpg","width":500,"height":495,"format":"jpg"}],"showTime":1554179780687,"tmplId":0,"actId":0,"expireTime":0,"eventTime":1554179780687,"user":{"defaultAvatar":false,"province":110000,"authStatus":1,"followed":false,"avatarUrl":"http://p1.music.126.net/bmV7awX_PkPOUV71ZCOS0Q==/3426078237420183.jpg","accountStatus":0,"gender":2,"city":110105,"birthday":-2209017600000,"userId":286333459,"userType":2,"nickname":"琵琶聪","signature":"","description":"著名琵琶演奏家赵聪","detailDescription":"著名琵琶演奏家赵聪","avatarImgId":3426078237420183,"backgroundImgId":2002210674180198,"backgroundUrl":"http://p1.music.126.net/i0qi6mibX8gq2SaLF1bYbA==/2002210674180198.jpg","authority":0,"mutual":false,"expertTags":null,"experts":null,"djStatus":0,"vipType":11,"remarkName":null,"backgroundImgIdStr":"2002210674180198","avatarImgIdStr":"3426078237420183","urlAnalyze":false,"followeds":13469},"uuid":"8AFAE0831E7FBF60AAF5F8205FBDA397","id":6694389209,"type":28,"topEvent":false,"insiteForwardCount":22,"info":{"commentThread":{"id":"A_EV_2_6694389209_286333459","resourceInfo":{"id":6694389209,"userId":286333459,"name":"分享电台：「聪老师的世界音乐之旅」","imgUrl":null,"creator":null,"eventType":28},"resourceType":2,"commentCount":27,"likedCount":84,"shareCount":47,"hotCount":1,"latestLikedUsers":[{"s":431884973,"t":1554259616437},{"s":304473891,"t":1554255967233},{"s":301534658,"t":1554253687914},{"s":1322834929,"t":1554253549296},{"s":1539753586,"t":1554227373598},{"s":602620667,"t":1554226968245},{"s":127859536,"t":1554225251267},{"s":280922458,"t":1554225096457},{"s":387710955,"t":1554224859754},{"s":336254693,"t":1554224858262}],"resourceId":6694389209,"resourceTitle":"分享电台：「聪老师的世界音乐之旅」","resourceOwnerId":286333459},"latestLikedUsers":null,"liked":false,"comments":null,"resourceType":2,"resourceId":6694389209,"commentCount":27,"likedCount":84,"threadId":"A_EV_2_6694389209_286333459","shareCount":47}}}',
      'pics': [],
      'showTime': 1554202932773,
      'tmplId': 0,
      'actId': 0,
      'expireTime': 0,
      'eventTime': 1554196324145,
      'user': {
        'defaultAvatar': false,
        'province': 110000,
        'authStatus': 1,
        'followed': true,
        'avatarUrl': 'http://p1.music.126.net/QWMV-Ru_6149AKe0mCBXKg==/1420569024374784.jpg',
        'accountStatus': 0,
        'gender': 1,
        'city': 110101,
        'birthday': -2209017600000,
        'userId': 1,
        'userType': 2,
        'nickname': '网易云音乐',
        'signature': '网易云音乐是6亿人都在使用的音乐平台，致力于帮助用户发现音乐惊喜，帮助音乐人实现梦想。\n客服在线时间：9：00 - 24：00，如您在使用过程中遇到任何问题，欢迎私信咨询@云音乐客服 ，我们会尽快回复。\n如果仍然不能解决您的问题，请邮件我们：\n用户：ncm5990@163.com\n音乐人：yyr599@163.com\n',
        'description': '网易云音乐官方账号',
        'detailDescription': '网易云音乐官方账号',
        'avatarImgId': 1420569024374784,
        'backgroundImgId': 2002210674180202,
        'backgroundUrl': 'http://p1.music.126.net/pmHS4fcQtcNEGewNb5HRhg==/2002210674180202.jpg',
        'authority': 3,
        'mutual': false,
        'expertTags': null,
        'experts': null,
        'djStatus': 10,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '2002210674180202',
        'avatarImgIdStr': '1420569024374784',
        'urlAnalyze': true,
        'followeds': 99999
      },
      'uuid': null,
      'id': 6696535183,
      'type': 22,
      'topEvent': false,
      'insiteForwardCount': 11,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6696535183_1',
          'resourceInfo': {
            'id': 6696535183,
            'userId': 1,
            'name': '转发动态：琵琶女神赵聪老师入驻云村！不知那只锦鲤能听到“国家队”老师的亲口回答，快来转发吧~',
            'imgUrl': null,
            'creator': null,
            'eventType': 22
          },
          'resourceType': 2,
          'commentCount': 24,
          'likedCount': 853,
          'shareCount': 3,
          'hotCount': 2,
          'latestLikedUsers': [
            {
              's': 487732647,
              't': 1554259100030
            },
            {
              's': 1693560329,
              't': 1554259030399
            },
            {
              's': 59983146,
              't': 1554258531761
            },
            {
              's': 342142724,
              't': 1554258525995
            },
            {
              's': 432529882,
              't': 1554258498038
            },
            {
              's': 1422426202,
              't': 1554258141631
            },
            {
              's': 532619055,
              't': 1554257180920
            },
            {
              's': 451315634,
              't': 1554257110524
            },
            {
              's': 340054583,
              't': 1554256697938
            },
            {
              's': 1578325921,
              't': 1554256534211
            }
          ],
          'resourceId': 6696535183,
          'resourceTitle': '转发动态：琵琶女神赵聪老师入驻云村！不知那只锦鲤能听到“国家队”老师的亲口回答，快来转发吧~',
          'resourceOwnerId': 1
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6696535183,
        'commentCount': 24,
        'likedCount': 853,
        'threadId': 'A_EV_2_6696535183_1',
        'shareCount': 3
      }
    },
    {
      'actName': null,
      'forwardCount': 374,
      'lotteryEventData': null,
      'rcmdInfo': {
        'reason': '为你发现生活点滴',
        'alg': 'hotEvent_t3',
        'type': 1,
        'scene': 'social',
        'userReason': '40543粉丝'
      },
      'json': '{"msg":"如果有一天，能走的更稳更远了，就去见Ta吧[爱心]","song":{"name":"Rain","id":26418808,"position":2,"alias":[],"status":0,"fee":8,"copyrightId":7003,"disc":"1","no":2,"artists":[{"name":"秦基博","id":14153,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"言ノ葉","id":2489133,"type":"EP/Single","size":5,"picId":18345351510230167,"blurPicUrl":"http://p2.music.126.net/Wpd4B7lLDV_F1uOe3fTtcQ==/18345351510230167.jpg","companyId":0,"pic":18345351510230167,"picUrl":"http://p2.music.126.net/Wpd4B7lLDV_F1uOe3fTtcQ==/18345351510230167.jpg","publishTime":1369785600000,"description":"","tags":"","company":"环球唱片","briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":3,"copyrightId":7003,"commentThreadId":"R_AL_3_2489133","artists":[{"name":"秦基博","id":14153,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p1.music.126.net/Wpd4B7lLDV_F1uOe3fTtcQ==/18345351510230167.jpg?param=80x80x1"},"starred":false,"popularity":100.0,"score":100,"starredNum":0,"duration":293040,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":"","crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_26418808","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":2,"hMusic":{"name":null,"id":1185097542,"size":11723798,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":293040,"volumeDelta":-2.62},"mMusic":{"name":null,"id":1185097543,"size":5861921,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":160000,"playTime":293040,"volumeDelta":-2.18},"lMusic":{"name":null,"id":1185097544,"size":3517170,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":96000,"playTime":293040,"volumeDelta":-2.19},"bMusic":{"name":null,"id":1185097544,"size":3517170,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":96000,"playTime":293040,"volumeDelta":-2.19},"mp3Url":null,"rtype":0,"rurl":null,"mvid":339336}}',
      'pics': [
        {
          'originUrl': 'https://p1.music.126.net/0y3IH0NEGjbrSH9WElfEGA==/109951163627010918.jpg',
          'squareUrl': 'https://p1.music.126.net/q2Iz9haU-aUY88o0ghpMWA==/109951163627014278.jpg',
          'rectangleUrl': 'https://p1.music.126.net/JckLVCTDannrUn63Aana6w==/109951163627012346.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/rWzkTSBVQpu4Q3gvJw9XGA==/109951163627019662.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/qqRYoC1PoFo1QvPOoPJBAQ==/109951163627011365.jpg',
          'width': 690,
          'height': 1411,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/J_j2TRMw7TU4gvKTxv4Jrg==/109951163627008494.jpg',
          'squareUrl': 'https://p1.music.126.net/BO_5b30Mmiou9BnpvK6cGw==/109951163627011371.jpg',
          'rectangleUrl': 'https://p1.music.126.net/0P3TVtXI5ZwrfsbDGqKsPw==/109951163627022057.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/e_-czEiMNEHnRSmb11Sc_A==/109951163627020651.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/KqwHCbW9bfmG6QeVfCqckQ==/109951163627009992.jpg',
          'width': 690,
          'height': 1466,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/QdrAikP7xz7w4BDKkt4fKQ==/109951163627022502.jpg',
          'squareUrl': 'https://p1.music.126.net/hP43ivUCe0U3owDmiiH1fg==/109951163627012831.jpg',
          'rectangleUrl': 'https://p1.music.126.net/uAyappta9_h_KDayWFsOFg==/109951163627011381.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/D7h5PL11iTvXng567lAsyA==/109951163627013311.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/k2LND1dC4PX0_i-mXbbZ3w==/109951163627013824.jpg',
          'width': 690,
          'height': 1494,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/Vd7QI60qR0cqMbMOtNaUCQ==/109951163627021566.jpg',
          'squareUrl': 'https://p1.music.126.net/IvhqzyXc2AFs3xMCX2Rw-g==/109951163627023503.jpg',
          'rectangleUrl': 'https://p1.music.126.net/_HeYVK0UiZuB7fbnlYDRCA==/109951163627023005.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/T_lWsbNKxBimMwUYI72SHA==/109951163627010945.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/P8LLr9k_YngXPfz1PCY5Cg==/109951163627013318.jpg',
          'width': 690,
          'height': 1553,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/iu0F3b4Iu1Stp3P75qCwFA==/109951163627010467.jpg',
          'squareUrl': 'https://p1.music.126.net/RZ5RYowLDr3psHK3cN-ihg==/109951163627013839.jpg',
          'rectangleUrl': 'https://p1.music.126.net/KM7cJcTg93MoR1ScZQR8wg==/109951163627011392.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/yYRHeXGL1L7FpClyJPv49A==/109951163627020669.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/NtsdFPtRrFhTCLNTyyHnQQ==/109951163627012846.jpg',
          'width': 690,
          'height': 1553,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/Kf3wQJp1skPMfrzFNITsdQ==/109951163627022080.jpg',
          'squareUrl': 'https://p1.music.126.net/HwxjCVa03Kw3KwUcAQUt_w==/109951163627022533.jpg',
          'rectangleUrl': 'https://p1.music.126.net/FRNp7NiVQZdzmbjsdqCI7w==/109951163627014856.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/deNogE4XA9K6FbM3d11AqA==/109951163627014322.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/k9YErZCsb1M38OR2GQXFSA==/109951163627013332.jpg',
          'width': 690,
          'height': 1465,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/hk7Ob_anuqRtaZsn6U8XmQ==/109951163627016295.jpg',
          'squareUrl': 'https://p1.music.126.net/aN2-O1uTDiXzHC0ZJGJQ6Q==/109951163627013341.jpg',
          'rectangleUrl': 'https://p1.music.126.net/JduS-0Siati6vpZGEtjH1Q==/109951163627023025.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/ENSYjD0rXG2oVIjb0VQnRA==/109951163627017303.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/DGG43kFhJVqPlnPl024tqQ==/109951163627019195.jpg',
          'width': 690,
          'height': 1522,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/H7isF3_TO3IcVxQar8-ZJA==/109951163627018272.jpg',
          'squareUrl': 'https://p1.music.126.net/VjEhsyLl5uS657y8A4Tuzg==/109951163627015841.jpg',
          'rectangleUrl': 'https://p1.music.126.net/2hwGB8mRZ5fELJ3gqPftGw==/109951163627010976.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/M5pnMVbO85uILXT-VFvhfg==/109951163627023037.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/9pA-0Vz4oimJ6Ra5o2159Q==/109951163627023543.jpg',
          'width': 690,
          'height': 1468,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p1.music.126.net/xGQMJg-az60nImDn-_g_4w==/109951163627023039.jpg',
          'squareUrl': 'https://p1.music.126.net/9FnRuhm0yZLighSnAfyaXg==/109951163627022106.jpg',
          'rectangleUrl': 'https://p1.music.126.net/IHzqEkcTmXSuWx8of8AU4g==/109951163627019716.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/G1nQZoD-iGbnicbLsMtXFw==/109951163627022107.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/wpz_jy0ZrkyYtdffG_FbiQ==/109951163627012873.jpg',
          'width': 690,
          'height': 1432,
          'format': 'jpg'
        }
      ],
      'showTime': 1540559187320,
      'tmplId': 0,
      'actId': 0,
      'expireTime': 0,
      'eventTime': 1554196074840,
      'user': {
        'defaultAvatar': false,
        'province': 340000,
        'authStatus': 0,
        'followed': false,
        'avatarUrl': 'http://p1.music.126.net/LYf78QNH8qGSbguiHWzf8A==/109951163576979031.jpg',
        'accountStatus': 0,
        'gender': 1,
        'city': 340100,
        'birthday': 779040000000,
        'userId': 48115956,
        'userType': 200,
        'nickname': '杉茶先生',
        'signature': '私信太多，争取一个月内回复您~（不收“急，在线等”这类的投稿）',
        'description': '',
        'detailDescription': '',
        'avatarImgId': 109951163576979020,
        'backgroundImgId': 109951163946447920,
        'backgroundUrl': 'http://p1.music.126.net/y1JJ9G5oUzJ5a12BhRYTOA==/109951163946447927.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': [
          '日语',
          '华语',
          '流行'
        ],
        'experts': {
          '1': '二次元视频达人',
          '2': '生活资讯达人'
        },
        'djStatus': 10,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '109951163946447927',
        'avatarImgIdStr': '109951163576979031',
        'urlAnalyze': false,
        'avatarImgId_str': '109951163576979031',
        'followeds': 40543
      },
      'uuid': 'C103310033F038AAEB84F6C66CD9BDE0',
      'id': 5884352546,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 242,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_5884352546_48115956',
          'resourceInfo': {
            'id': 5884352546,
            'userId': 48115956,
            'name': '分享单曲：「Rain」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 141,
          'likedCount': 1812,
          'shareCount': 374,
          'hotCount': 9,
          'latestLikedUsers': [
            {
              's': 1295012298,
              't': 1554259597593
            },
            {
              's': 1502292755,
              't': 1554257338656
            },
            {
              's': 274943660,
              't': 1554257203716
            },
            {
              's': 436405278,
              't': 1554257152993
            },
            {
              's': 1813420987,
              't': 1554256898464
            },
            {
              's': 1745139658,
              't': 1554256307418
            },
            {
              's': 477233428,
              't': 1554254853725
            },
            {
              's': 1812898161,
              't': 1554253896238
            },
            {
              's': 260799727,
              't': 1554253293024
            },
            {
              's': 1757611705,
              't': 1554252692910
            }
          ],
          'resourceId': 5884352546,
          'resourceTitle': '分享单曲：「Rain」',
          'resourceOwnerId': 48115956
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 5884352546,
        'commentCount': 141,
        'likedCount': 1812,
        'threadId': 'A_EV_2_5884352546_48115956',
        'shareCount': 374
      }
    },
    {
      'actName': '古装美女',
      'forwardCount': 351,
      'lotteryEventData': null,
      'rcmdInfo': {
        'reason': '为你搜罗娱乐八卦',
        'alg': 'hotEvent_t3',
        'type': 1,
        'scene': 'social',
        'userReason': '2353粉丝'
      },
      'json': '{"msg":"#哈妮克孜# #古装美女#\\n(｡･ω･｡)ﾉ♡   为什么会这么美，还这么仙～\\n简直就是仙女本仙了            ～","song":{"name":"浪人琵琶","id":566442496,"position":1,"alias":[],"status":0,"fee":8,"copyrightId":722019,"disc":"","no":1,"artists":[{"name":"胡66","id":12947071,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"浪人琵琶","id":39266160,"type":"EP/Single","size":3,"picId":109951163318974870,"blurPicUrl":"http://p1.music.126.net/G5YxAyt9812z9MROfWarkg==/109951163318974870.jpg","companyId":0,"pic":109951163318974870,"picUrl":"http://p1.music.126.net/G5YxAyt9812z9MROfWarkg==/109951163318974870.jpg","publishTime":1527696000007,"description":"","tags":"","company":"亿格艾科技","briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":0,"copyrightId":722019,"commentThreadId":"R_AL_3_39266160","artists":[{"name":"胡66","id":12947071,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p2.music.126.net/G5YxAyt9812z9MROfWarkg==/109951163318974870.jpg?param=80x80x1"},"starred":false,"popularity":100.0,"score":100,"starredNum":0,"duration":224263,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":null,"crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_566442496","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":2,"rtype":0,"rurl":null,"mvid":0,"bMusic":{"name":null,"id":1488601075,"size":3589477,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":224263,"volumeDelta":-12200.0},"mp3Url":null,"mMusic":{"name":null,"id":1488601074,"size":5384194,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":192000,"playTime":224263,"volumeDelta":-13700.0},"lMusic":{"name":null,"id":1488601075,"size":3589477,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":224263,"volumeDelta":-12200.0},"hMusic":{"name":null,"id":1488601073,"size":8973627,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":224263,"volumeDelta":-16300.0}}}',
      'pics': [
        {
          'originUrl': 'https://p1.music.126.net/GwtOWGPK6u960L-APmEoJg==/109951163701120475.jpg',
          'squareUrl': 'https://p1.music.126.net/v1zioCsBl1IuoNFOJbzcZw==/109951163701132034.jpg',
          'rectangleUrl': 'https://p1.music.126.net/VJ7WFfiOfWHDS2Vo-vJSKg==/109951163701121422.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/rngc8X26qP8q86fOpNNEfA==/109951163701128171.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/2VXbvOUxwXgypuAhYdhPZw==/109951163701129668.jpg',
          'width': 896,
          'height': 504,
          'format': 'gif'
        },
        {
          'originUrl': 'https://p1.music.126.net/1gMjp-7gCxM613SMOnmXXw==/109951163701129183.jpg',
          'squareUrl': 'https://p1.music.126.net/8PwCqMi-Fz1RBIPHZoY5Ug==/109951163701122947.jpg',
          'rectangleUrl': 'https://p1.music.126.net/uz7f_pPxVsQ-bHnu-LNJYQ==/109951163701121430.jpg',
          'pcSquareUrl': 'https://p1.music.126.net/uY3575w2-p6lp-cBmFBPDQ==/109951163701127670.jpg',
          'pcRectangleUrl': 'https://p1.music.126.net/9NAZT9wqW6KwZQd7r3ayCA==/109951163701122459.jpg',
          'width': 900,
          'height': 850,
          'format': 'gif'
        },
        {
          'originUrl': 'https://p1.music.126.net/7aTyM6jSRPy9jNLCEezYyw==/109951163701132532.jpg',
          'squareUrl': 'https://p2.music.126.net/PD7W-y0-chi_36FxtBlepg==/109951163701128674.jpg',
          'rectangleUrl': 'https://p2.music.126.net/nE-qeYkyE4_k6VAsQkX3iw==/109951163701129688.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/yFF43ASfKqTvAb4FciG2QA==/109951163701121964.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/GlDLneYw8o1GZl2T4fAGNw==/109951163701128199.jpg',
          'width': 900,
          'height': 725,
          'format': 'gif'
        },
        {
          'originUrl': 'https://p2.music.126.net/WyCg82lGR14urTa7-VY8rg==/109951163701124893.jpg',
          'squareUrl': 'https://p2.music.126.net/xOUa5TFiMQ9rw8-SLZZ4Yg==/109951163701124362.jpg',
          'rectangleUrl': 'https://p2.music.126.net/1Len4dm3W6OPzMiMfbFvQg==/109951163701123843.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/thHV-5vKzB6qcp8VkcHsqQ==/109951163701126339.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/4YHb04LJl9XsYgEkMED0cA==/109951163701131119.jpg',
          'width': 961,
          'height': 1080,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/jydPOZDnHJfLiYJ-3tiDDg==/109951163701125339.jpg',
          'squareUrl': 'https://p2.music.126.net/K5UxCJ-eeAG8903yrqzH1Q==/109951163701125341.jpg',
          'rectangleUrl': 'https://p2.music.126.net/oJc4NXlP85IxFyb2t2O3og==/109951163701134006.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/1vpJpgZxq40bDxbnE6AaDA==/109951163701124901.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/7PZ8LoXWQkpP1EH1XFEXFw==/109951163701121978.jpg',
          'width': 960,
          'height': 1792,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/83nyR3nXsJ5FxrD4VYyt2g==/109951163701125344.jpg',
          'squareUrl': 'https://p2.music.126.net/TlNCG9MBoXJGz3gQD6CfSw==/109951163701129703.jpg',
          'rectangleUrl': 'https://p2.music.126.net/WeCkl4ZVmErJyGU1pEEt_g==/109951163701121456.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/8dqrXoiicsnrWRtFu0p58Q==/109951163701131125.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/95PmJY2F-SkFNL6rC3OTEA==/109951163701133038.jpg',
          'width': 960,
          'height': 1574,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/c3_Bdd_kAYPQFrZZenWlOg==/109951163701121457.jpg',
          'squareUrl': 'https://p2.music.126.net/wz7MDYX5IrBdn03mfP5l6A==/109951163701121981.jpg',
          'rectangleUrl': 'https://p2.music.126.net/F7oFFhybVtHV-MgKL6_xcg==/109951163701131126.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/OkinTupJDkcL7Y8osYBEAA==/109951163701121982.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/MPMuRxHZYiz_Alzbze8Byg==/109951163701124909.jpg',
          'width': 1080,
          'height': 1822,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/OUrYniv6BFlF3Tt1rWK7Nw==/109951163701124911.jpg',
          'squareUrl': 'https://p2.music.126.net/WS58JVNeOJnV_FGQu4YzQg==/109951163701126359.jpg',
          'rectangleUrl': 'https://p2.music.126.net/UZN81I-FBXUKDVV4V7CR3Q==/109951163701129216.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/gMl2EjI2CuDCv7WBtpzQ-A==/109951163701128683.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/gboriDhtlM8aDtlLXw62Ng==/109951163701124374.jpg',
          'width': 960,
          'height': 1080,
          'format': 'jpg'
        },
        {
          'originUrl': 'https://p2.music.126.net/7Ub1cNdwbV6nS1wvxW6cyQ==/109951163701124375.jpg',
          'squareUrl': 'https://p2.music.126.net/5wlSKFyMgE366mh3XMuFjg==/109951163701126725.jpg',
          'rectangleUrl': 'https://p2.music.126.net/iXXu2jMghbLyA5xuazWKvQ==/109951163701130658.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/VJUTBHhQmk7xvig-AtLwAA==/109951163701129220.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/gWnUdC6LIpFQMACuX8-BpA==/109951163701127699.jpg',
          'width': 961,
          'height': 1080,
          'format': 'jpg'
        }
      ],
      'showTime': 1543709579640,
      'tmplId': 0,
      'actId': 20189136,
      'expireTime': 0,
      'eventTime': 1554195950188,
      'user': {
        'defaultAvatar': false,
        'province': 320000,
        'authStatus': 0,
        'followed': false,
        'avatarUrl': 'http://p1.music.126.net/yyOMHi5PfZyCOa3fOPR7aw==/109951163702028188.jpg',
        'accountStatus': 0,
        'gender': 1,
        'city': 320100,
        'birthday': 981195300755,
        'userId': 365603174,
        'userType': 0,
        'nickname': '歌图志',
        'signature': '我就是我，是颜色不一样的鬼火',
        'description': '',
        'detailDescription': '',
        'avatarImgId': 109951163702028200,
        'backgroundImgId': 109951163702028690,
        'backgroundUrl': 'http://p1.music.126.net/PsP0GC3UI3YY5tV6uPRTWg==/109951163702028685.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': null,
        'djStatus': 0,
        'vipType': 0,
        'remarkName': null,
        'backgroundImgIdStr': '109951163702028685',
        'avatarImgIdStr': '109951163702028188',
        'urlAnalyze': false,
        'avatarImgId_str': '109951163702028188',
        'followeds': 2353
      },
      'uuid': '18dd11e13a647db61997dc374a324a9e',
      'id': 6045551414,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 82,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6045551414_365603174',
          'resourceInfo': {
            'id': 6045551414,
            'userId': 365603174,
            'name': '分享单曲：「浪人琵琶」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 338,
          'likedCount': 2869,
          'shareCount': 351,
          'hotCount': 30,
          'latestLikedUsers': [
            {
              's': 279248309,
              't': 1554259250015
            },
            {
              's': 289333334,
              't': 1554258830242
            },
            {
              's': 300124753,
              't': 1554257772875
            },
            {
              's': 372816801,
              't': 1554256646945
            },
            {
              's': 39307158,
              't': 1554256563868
            },
            {
              's': 115956617,
              't': 1554256145693
            },
            {
              's': 1306468829,
              't': 1554252793839
            },
            {
              's': 1410071164,
              't': 1554252219486
            },
            {
              's': 1288883420,
              't': 1554249989340
            },
            {
              's': 1794426036,
              't': 1554248576378
            }
          ],
          'resourceId': 6045551414,
          'resourceTitle': '分享单曲：「浪人琵琶」',
          'resourceOwnerId': 365603174
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6045551414,
        'commentCount': 338,
        'likedCount': 2869,
        'threadId': 'A_EV_2_6045551414_365603174',
        'shareCount': 351
      }
    },
    {
      'actName': '音乐人动态推荐计划',
      'forwardCount': 15,
      'lotteryEventData': null,
      'rcmdInfo': {
        'reason': '为你发现生活点滴',
        'alg': 'hotEvent_t3',
        'type': 1,
        'scene': 'social',
        'userReason': '19652粉丝'
      },
      'json': '{"msg":"虽然目前做音乐，也算读过点书。只是社会经验告诉我，和虚伪低劣的人是没任何素质可言的，除以暴制暴别无选择。有些歌曲如是，现实中亦如是。#音乐人动态推荐计划# ","song":{"name":"莆莆通通","id":1341686688,"position":1,"alias":[],"status":0,"fee":8,"copyrightId":0,"disc":"","no":1,"artists":[{"name":"百川Rebellious","id":12664246,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"album":{"name":"莆莆通通","id":75296937,"type":"EP/Single","size":1,"picId":109951163813204757,"blurPicUrl":"http://p1.music.126.net/DAnm27-7tAKM05utGgiJZA==/109951163813204757.jpg","companyId":0,"pic":109951163813204757,"picUrl":"http://p1.music.126.net/DAnm27-7tAKM05utGgiJZA==/109951163813204757.jpg","publishTime":1548263957840,"description":"","tags":"","company":null,"briefDesc":"","artist":{"name":"","id":0,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0},"songs":[],"alias":[],"status":0,"copyrightId":0,"commentThreadId":"R_AL_3_75296937","artists":[{"name":"百川Rebellious","id":12664246,"picId":0,"img1v1Id":0,"briefDesc":"","picUrl":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","img1v1Url":"http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg","albumSize":0,"alias":[],"trans":"","musicSize":0}],"img80x80":"https://p1.music.126.net/DAnm27-7tAKM05utGgiJZA==/109951163813204757.jpg?param=80x80x1"},"starred":false,"popularity":0.0,"score":0,"starredNum":0,"duration":217333,"playedNum":0,"dayPlays":0,"hearTime":0,"ringtone":null,"crbt":null,"audition":null,"copyFrom":"","commentThreadId":"R_SO_4_1341686688","rtUrl":null,"ftype":0,"rtUrls":[],"copyright":0,"hMusic":{"name":null,"id":3612727274,"size":8695685,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":320000,"playTime":217333,"volumeDelta":-9800.0},"mMusic":{"name":null,"id":3612727275,"size":5217428,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":192000,"playTime":217333,"volumeDelta":-7300.0},"lMusic":{"name":null,"id":3612727276,"size":3478300,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":217333,"volumeDelta":-5700.0},"bMusic":{"name":null,"id":3612727276,"size":3478300,"extension":"mp3","sr":44100,"dfsId":0,"bitrate":128000,"playTime":217333,"volumeDelta":-5700.0},"rtype":0,"rurl":null,"mvid":0,"mp3Url":null}}',
      'pics': [
        {
          'originUrl': 'https://p2.music.126.net/8gnS1h0jFSODCj4b-BKfUg==/109951163816383712.jpg',
          'squareUrl': 'https://p2.music.126.net/c_l67LGKTqjpmudSC8w76w==/109951163816381802.jpg',
          'rectangleUrl': 'https://p2.music.126.net/Rkk0uI6yo4Tjm3fR-HqRRg==/109951163816388050.jpg',
          'pcSquareUrl': 'https://p2.music.126.net/jR3SS3cH049DeTJghs0ruw==/109951163816382280.jpg',
          'pcRectangleUrl': 'https://p2.music.126.net/XlQAnRVYvHxafddtqHiRfQ==/109951163816375995.jpg',
          'width': 692,
          'height': 383,
          'format': 'jpg'
        }
      ],
      'showTime': 1548399939808,
      'tmplId': 0,
      'actId': 22700052,
      'expireTime': 0,
      'eventTime': 1554195887862,
      'user': {
        'defaultAvatar': false,
        'province': 1000000,
        'authStatus': 1,
        'followed': false,
        'avatarUrl': 'http://p1.music.126.net/us3kgWT3WD5O6VDiYQxMdg==/109951163604441063.jpg',
        'accountStatus': 0,
        'gender': 1,
        'city': 1004400,
        'birthday': 780508800000,
        'userId': 603526942,
        'userType': 4,
        'nickname': 'MichaelHuang0',
        'signature': '制作人/歌手/Rapper 伴奏/混音工作请私信',
        'description': '',
        'detailDescription': '',
        'avatarImgId': 109951163604441060,
        'backgroundImgId': 109951163731249260,
        'backgroundUrl': 'http://p1.music.126.net/cGHu6j06uiXNG_EFiMuNbQ==/109951163731249263.jpg',
        'authority': 0,
        'mutual': false,
        'expertTags': null,
        'experts': {
          '2': '音乐图文达人'
        },
        'djStatus': 10,
        'vipType': 11,
        'remarkName': null,
        'backgroundImgIdStr': '109951163731249263',
        'avatarImgIdStr': '109951163604441063',
        'urlAnalyze': true,
        'avatarImgId_str': '109951163604441063',
        'followeds': 19652
      },
      'uuid': 'FC602977B080C9979D73239B6109B4E9',
      'id': 6302847850,
      'type': 18,
      'topEvent': false,
      'insiteForwardCount': 1,
      'info': {
        'commentThread': {
          'id': 'A_EV_2_6302847850_603526942',
          'resourceInfo': {
            'id': 6302847850,
            'userId': 603526942,
            'name': '分享单曲：「莆莆通通」',
            'imgUrl': null,
            'creator': null,
            'eventType': 18
          },
          'resourceType': 2,
          'commentCount': 289,
          'likedCount': 1993,
          'shareCount': 15,
          'hotCount': 42,
          'latestLikedUsers': [
            {
              's': 249972361,
              't': 1554258402804
            },
            {
              's': 1813420987,
              't': 1554257987768
            },
            {
              's': 1464122654,
              't': 1554257509805
            },
            {
              's': 401666335,
              't': 1554253055464
            },
            {
              's': 396244402,
              't': 1554252585579
            },
            {
              's': 1813049869,
              't': 1554250987750
            },
            {
              's': 298974297,
              't': 1554250733511
            },
            {
              's': 1809422181,
              't': 1554248194321
            },
            {
              's': 1809753687,
              't': 1554245800263
            },
            {
              's': 357298780,
              't': 1554245087676
            }
          ],
          'resourceId': 6302847850,
          'resourceTitle': '分享单曲：「莆莆通通」',
          'resourceOwnerId': 603526942
        },
        'latestLikedUsers': null,
        'liked': false,
        'comments': null,
        'resourceType': 2,
        'resourceId': 6302847850,
        'commentCount': 289,
        'likedCount': 1993,
        'threadId': 'A_EV_2_6302847850_603526942',
        'shareCount': 15
      }
    }
  ]
}

export default FriendsModel
