/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions, PermissionsAndroid
} from 'react-native'
import { Header, NavigationActions } from 'react-navigation'
import { AudioRecorder, AudioUtils } from 'react-native-audio'
import RNFS from 'react-native-fs'
// import { ChatScreen } from 'react-native-easy-chat-ui'
import { ChatScreen } from '../../components/chat'
const X_WIDTH = 375
const X_HEIGHT = 812
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const PAD_WIDTH = 768
const PAD_HEIGHT = 1024
const IPADPRO11_WIDTH = 834
const IPADPRO11_HEIGHT = 1194
const IPADPRO129_HEIGHT = 1024
const IPADPRO129_WIDTH = 1366

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')
const isIPhoneX = (() => {
  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  )
})()

export default class Chat extends Component<{}> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '聊天'
    }
  }
  constructor (props) {
    super(props)
    this.state = {
      msg: {
        friend_12345678: {
          messages: [
            {
              id: `${new Date().getTime() + 1}`,
              per: {
                type: 'text',
                content: 'hello world'
              },
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../components/chat/source/image/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542006036549'
            },
            {
              id: `${new Date().getTime() + 2}`,
              per: {
                type: 'text',
                content: 'hi/{se}'
              },
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../components/chat/source/image/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542106036549'
            },
            {
              id: `${new Date().getTime() + 3}`,
              per: {
                type: 'image',
                content: {
                  uri: 'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
                  width: 100,
                  height: 80
                }
              },
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../components/chat/source/image/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: false,
              sendStatus: 0,
              time: '1542106037000'
            },
            {
              id: `${new Date().getTime() + 4}`,
              per: {
                type: 'text',
                content: '你好/{weixiao}'
              },
              targetId: '88886666',
              chatInfo: {
                avatar: require('../../components/chat/source/image/avatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: -2,
              time: '1542177036549'
            },
            {
              id: `${new Date().getTime() + 5}`,
              per: {
                type: 'voice',
                content: {
                  uri: '',
                  length: 10
                }
              },
              targetId: '12345678',
              chatInfo: {
                avatar: require('../../components/chat/source/image/defaultAvatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 1,
              time: '1542260667161'
            },
            {
              id: `${new Date().getTime() + 6}`,
              per: {
                type: 'voice',
                content: {
                  uri: '',
                  length: 30
                }
              },
              targetId: '88886666',
              chatInfo: {
                avatar: require('../../components/chat/source/image/avatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542264667161'
            },
            {
              id: `${new Date().getTime() + 7}`,
              per: {
                type: 'voice',
                content: {
                  uri: '',
                  length: 30
                }
              },
              targetId: '88886666',
              chatInfo: {
                avatar: require('../../components/chat/source/image/avatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542264667161'
            },
            {
              id: `${new Date().getTime() + 8}`,
              per: {
                type: 'voice',
                content: {
                  uri: '',
                  length: 30
                }
              },
              targetId: '88886666',
              chatInfo: {
                avatar: require('../../components/chat/source/image/avatar.png'),
                id: '12345678'
              },
              renderTime: true,
              sendStatus: 0,
              time: '1542264667161'
            }
          ],
          inverted: true // require
        }
      },
      voiceHandle: true,
      currentTime: 0,
      recording: false,
      paused: false,
      stoppedRecording: false,
      finished: false,
      audioPath: '',
      voiceLoading: false,
      voicePlaying: false
    }
    this.timer = null
  }

  componentDidMount () {
    // console.log(this.chat)
  }
  sendMessage = (type, content, isInverted) => {
    console.log(type, content, isInverted, 'msg666')
    const { msg } = this.state
    const newMsg = Object.assign({}, msg)
    newMsg['friend_12345678'].messages.push(
      {
        id: `${new Date().getTime()}`,
        per: {
          type,
          content
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../../components/chat/source/image/avatar.png'),
          id: '12345678'
        },
        renderTime: true,
        sendStatus: 1,
        time: `${new Date().getTime()}`
      })
    this.setState({ msg: newMsg })
  }

  audioProgress = () => {
    AudioRecorder.onProgress = (data) => {
      if (data.currentTime === 0) {
        this.setState((prevState) => ({ currentTime: Math.floor(prevState.currentTime + 0.25) }))
      } else {
        this.setState({ currentTime: Math.floor(data.currentTime) })
      }
      this._setVoiceHandel(false)
      this.setState({ volume: Math.floor(data.currentMetering) })
    }
  }

  audioFinish = () => {
    AudioRecorder.onFinished = (data) => this._finishRecording(data.status === 'OK', data.audioFileURL)
  }

  checkDir = async () => {
    if (!await RNFS.exists(`${AudioUtils.DocumentDirectoryPath}/voice/`)) {
      RNFS.mkdir(`${AudioUtils.DocumentDirectoryPath}/voice/`)
    }
  }

  initPath = async () => {
    await this.checkDir()
    const nowPath = `${AudioUtils.DocumentDirectoryPath}/voice/voice${Date.now()}.aac`
    this.setState({ audioPath: nowPath, currentTime: 0 })
    this.prepareRecordingPath(nowPath)
  }

  prepareRecordingPath (audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'aac',
      OutputFormat: 'aac_adts',
      AudioEncodingBitRate: 32000,
      MeteringEnabled: true
    })
  }

  _record = async () => {
    try {
      await AudioRecorder.startRecording()
    } catch (error) {
      console.log(error)
    }
  }

  _stop = async (filePath = '') => {
    try {
      await AudioRecorder.stopRecording()
      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath)
      }
    } catch (error) {
      console.log(error)
    }
  }

  _setVoiceHandel = (status) => {
    this.setState({ voiceHandle: status })
  }

  _pause = async () => {
    try {
      await AudioRecorder.pauseRecording() // Android 由于API问题无法使用此方法
    } catch (e) {
      console.log(e)
    }
  }

  _resume = async () => {
    try {
      await AudioRecorder.resumeRecording() // Android 由于API问题无法使用此方法
    } catch (e) {
      console.log(e)
    }
  }

  _finishRecording (didSucceed, filePath) {
    console.log(filePath)
    this.setState({ finished: didSucceed })
  }

  _checkAndroidPermission = async () => {
    try {
      const rationale = {
        'title': '麦克风权限',
        'message': '需要权限录制语音.'
      }
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      this.setState({ hasPermission: granted === PermissionsAndroid.RESULTS.GRANTED })
    } catch (e) {
      console.log(e)
    }
  }

  onPress = (type, index, content) => {
    if (type === 'voice') {
      this.timer && clearTimeout(this.timer)
      this.setState({ voiceLoading: true })
      this.timer = setTimeout(() => this.setState({ voiceLoading: false, voicePlaying: true }), 1000)
      this.timer = setTimeout(() => this.setState({ voicePlaying: false }), 5000)
    }
  }

  render () {
    let statusHeight = StatusBar.currentHeight || 0
    let androidHeaderHeight = statusHeight + Header.HEIGHT
    return (
      <ChatScreen
        sendMessage={this.sendMessage}
        ref={(e) => this.chat = e}
        messageList={this.state.msg}
        androidHeaderHeight={androidHeaderHeight}
        onMessagePress={this.onPress}
        audioPath={this.state.audioPath}
        audioHasPermission={this.state.hasPermission}
        checkAndroidPermission={this._checkAndroidPermission}
        audioOnProgress={this.audioProgress}
        audioOnFinish={this.audioFinish}
        audioInitPath={this.initPath}
        audioRecord={this._record}
        audioStopRecord={this._stop}
        audioPauseRecord={this._pause}
        audioResumeRecord={this._resume}
        audioCurrentTime={this.state.currentTime}
        audioHandle={this.state.voiceHandle}
        setAudioHandle={this._setVoiceHandel}
        voiceLoading={this.state.voiceLoading}
        voicePlaying={this.state.voicePlaying}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
