// pages/userTalk/userTalk.js
const app = getApp();
var util = require("../../script/utils.js");
var time = require("../../script/time.js");
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;
Page({
  data: {
    messageinfo: [],
    currentpage: 1, //当前页数
    fleshlimit: '5', //每次刷新页数
    scrollHeight: '100vh',
    inputBottom: 0,
    input: ''
  },
  tomyinfo() {
    wx.navigateTo({
      url: '/pages/viewUserInfo/viewUserInfo?id=' + this.data.userInfo.id,
    })
  },
  toanoinfo() {
    wx.navigateTo({
      url: '/pages/viewUserInfo/viewUserInfo?id=' + this.data.anotherUser.id,
    })
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  //提交评论
  submit() {
    var that = this
    let url = app.globalData.URL + '/inform/message';
    var data = {
      content: this.data.input,
      to_id: this.data.anotherUser.id,
      from_id: this.data.userInfo.id
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '发送成功',
          duration: 2000,
        })

        var tmp={}
        tmp.status=true
        tmp.content=that.data.input
        tmp.to_id=that.data.anotherUser.id
        tmp.from_id=that.data.userInfo.id
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        var n = timestamp * 1000;
        var date = new Date(n);
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        // //秒  
        // var s = date.getSeconds();
        // console.log("当前时间：" + Y + M + D + h + ":" + m + ":" + s)
        var nowtime = M + '-' + D+' '+h+":"+m
        console.log(nowtime)
        tmp.create_time=nowtime
        tmp.formaltime=timestamp

        var info=that.data.messageinfo
        info.push(tmp)
        that.setData({
          input: '',
          messageinfo:info
        })
      }
    }).then( 
      setTimeout(function () {
        //滚动到底部
        wx.pageScrollTo({
          duration: 20,
          selector:".bottoms"
        })
       }, 100) 
      )
  },

  getinput(e) {
    this.setData({
      input: e.detail.value
    })
  },
  //页面自动滚动到底部
  pageScrollToBottom:function(){
    wx.createSelectorQuery().select('cu-item').boundingClientRect(function(rect){
        // console.log(rect.height);
        wx.pageScrollTo({
            scrollTop: rect.height,
        });
    }).exec()
  },
  flesg(){

  },
  onLoad: function (options) {
    console.log('userid', options.id)
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    // initData(this);
    this.setData({
      cusHeadIcon: wx.getStorageSync('userInfo').avatarUrl,
      userid: wx.getStorageSync('userId'),
      talkid: options.id
    });
    //对话者的信息
    let url = app.globalData.URL + '/user';
    var data = {
      user_id: options.id,
    }
    util.get(url, data).then(function (res) {
      that.setData({
        anotherUser: res.data.data
      })
    })
    //自己的身份信息
    url = app.globalData.URL + '/user';
    data = {
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      that.setData({
        userInfo: res.data.data
      })
    })
    //消息列表
    url = app.globalData.URL + '/inform/message/list';
    data = {
      page: that.data.currentpage,
      limit: that.data.fleshlimit,
      id: options.id,
    }
    util.get(url, data).then(function (res) {
      console.log('message list', res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
        item.create_time = item.create_time.substring(5, 16)
      })
      console.log(test.length)
      //按時間排序
      // for (var i = 0; i < test.length; i++) {
      //   for (var u = i + 1; u < test.length; u++) {
      //     if (test[i].create_time > test[u].create_time) {
      //       // console.log(test[i].create_time)
      //       var num = [];
      //       num = test[i];
      //       test[i] = test[u];
      //       test[u] = num;
      //     }
      //   }
      // }
      test=test.reverse()
      for (var i = 0; i < test.length; i++) {
          var repTime = test[i].create_time.replace(/-/g, '/')
          test[i].formaltime = Date.parse(repTime) / 1000
      }

      that.setData({
        messageinfo: test
      })
      wx.hideLoading()
    })
  },

  /**
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';
    this.setData({
      msgList,
      inputVal
    });
  },

  /**
   * 退回上一页
   */
  toBackClick: function () {
    wx.navigateBack({})
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
    var that=this
    //消息列表
    var url = app.globalData.URL + '/inform/message/list';
    var data = {
      page: that.data.currentpage+1,
      limit: that.data.fleshlimit,
      id:this.data.talkid,
    }
    util.get(url, data).then(function (res) {
      console.log('message list', res.data)
      let info=that.data.messageinfo
      let test = res.data.data
      test=test.reverse()
      test.forEach((item) => {
        //这里需要截取的内容
        item.create_time = item.create_time.substring(5, 16)
      })
      console.log(test.length)
      test=test.reverse()
      for (var i = 0; i < test.length; i++) {
          var repTime = test[i].create_time.replace(/-/g, '/')
          test[i].formaltime = Date.parse(repTime) / 1000
          info.unshift(test[i])
      }
      that.setData({
        messageinfo: info,
        currentpage:that.data.currentpage+1
        
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  onReachBottom: function () {
  },

})