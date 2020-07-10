const app = getApp();
var util = require("../../script/utils.js");
Page({
  data: {
    hiddenmodalput2: true,
    isjoin: false,
    ans: '',
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
    id: '',
    info: [], //小组信息
    groupnum: '', //小组编号
    activityinfo: [], //活动
    talkinfo: [], //讨论
    imgurl: app.globalData.imgurl,
    test: [{
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ervn5p4iczibJjA5ZVRLibE4VwU7IMK9pkuP068LaAcjj7dHJVpuicppFeudLAs3Sj78cgHKUp92lJjaA/132'
      },
      {
        avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ervn5p4iczibJjA5ZVRLibE4VwU7IMK9pkuP068LaAcjj7dHJVpuicppFeudLAs3Sj78cgHKUp92lJjaA/132'
      }
    ]
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput2: function () {
    this.setData({
      hiddenmodalput2: !this.data.hiddenmodalput2
    })
  },
  //取消按钮  
  cancel2: function () {
    this.setData({
      hiddenmodalput2: true
    });

  },
  //确认  加入小组
  confirm2: function () {
    var that = this
    this.setData({
      hiddenmodalput: true
    })
    let url = app.globalData.URL + '/group/join';
    var data = {
      answer: this.data.ans,
      group_id: this.data.groupnum
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        that.setData({
          isjoin: true
        })
        console.log('join success')
      }
    })
    wx.showModal({
      title: '发送成功',
      // content: '这是一个模态弹窗',
      showCancel: false,
      success(res) {
        that.setData({
          hiddenmodalput2: !that.data.hiddenmodalput2,
          message: ''
        })
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  test() {
    console.log('test')
  },
  getmessage(e) {
    this.setData({
      message: e.detail.value
    })
  },
  quitgroup(e) {
    wx.showModal({
      title: '退出该小组',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('quit group confirm')
          let url = app.globalData.URL + '/group/join';
          let data = {
            id: this.data.groupnum
          }
          util.other(url, data, 'DELETE').then(function (res) {
            console.log(res.data)
            if (res.data.code == 200) {
              wx.showToast({
                title: '删除',
                duration: 2000,
                success: function () {
                  // setTimeout(function () {
                  //   wx.switchTab({
                  //     url: '/pages/index/index',
                  //   })
                  // }, 2000);
                  console.log('quit group success')
                }
              })
            } else {
              wx.showToast({
                title: '失败',
                image: '/images/fail.png',
                icon: 'success',
                duration: 2000
              })
            }
          }).catch(function (res) {
            console.log(res)
            wx.showToast({
              title: '提交失败！',
              icon: 'success',
              duration: 2000
            })
          })
        }
      }
    })
  },
  getans(e) {
    this.setData({
      ans: e.detail.value
    })
  },
  toupdate() {
    wx.navigateTo({
      url: '/pages/updategroup/updategroup',
    })
  },

  tojoin() {
    var that = this
    if (app.globalData.nickName) {
      wx.showModal({
        title: '申请加入该小组',
        // content: '确定要删除这张照片吗',
        cancelText: '取消',
        confirmText: '确认',
        success: res => {
          if (res.confirm) {
            console.log('first confirm')
            that.setData({
              hiddenmodalput: !this.data.hiddenmodalput
            })
          }
        }
      })
    } else {
      wx.switchTab({
        url: '/pages/my/my',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */

  //点击按钮弹窗指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });

  },
  //确认  
  confirm: function () {
    var that = this
    this.setData({
      hiddenmodalput2: true
    })
    let url = app.globalData.URL + '/inform/message';
    var data = {
      content: this.data.message,
      to_id: this.data.info.user.id,
      from_id: wx.getStorageSync('userId')
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '私信成功',
          duration: 2000,
        })
      }
    })
  },
  toupdate() {
    wx.navigateTo({
      url: '/pages/updategroup/updategroup?id=' + this.data.groupnum,
    })
  },
  tocreate() {
    wx.navigateTo({
      url: '/pages/createactivity/createactivity?id=' + this.data.groupnum,
    })
  },
  tojoindetail(e) {
    wx.navigateTo({
      url: '/pages/groupdeMate/groupdeMate?id=' + this.data.groupnum + '&userid=' + e.currentTarget.dataset.userid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('detail', options.id)
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    wx.setStorageSync('groupid', options.id)
    var that = this
    //小组信息
    let url = app.globalData.URL + '/group';
    var data = {
      id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        info: res.data.data,
        groupnum: options.id
      })
    })
    //小组活动
    url = app.globalData.URL + '/group/activity/list';
    data = {
      group_id: options.id,
      limit: '2',
      page: '1'
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        activityinfo: res.data.data,
      })
    })
    //小组讨论
    url = app.globalData.URL + '/group/topic/list';
    data = {
      group_id: options.id,
      limit: '3',
      page: '1'
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        talkinfo: res.data.data,
      })
    })
    //小组参与者
    url = app.globalData.URL + '/group/join/user/list';
    data = {
      group_id: options.id,
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
        joinnum: res.data.data.length
      })
    })
    //获取参加小组
    url = app.globalData.URL + '/group/join/list';
    data = {
      audit_status: 0,
      limit: 6,
      page: 1,
      user_id: wx.getStorageSync('userId')
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
      })
      wx.hideLoading()
    })
  },

  toactdetail(e) {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  toallact(e) {
    wx.navigateTo({
      url: '/pages/groupdAct/groupdAct?id=' + this.data.groupnum,
    })
  },
  toalltalk(e) {
    wx.navigateTo({
      url: '/pages/groupdDiscuss/groupdDiscuss?id=' + this.data.groupnum,
    })
  },
  onPullDownRefresh() {
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let t = wx.getStorageSync('groupid')
    console.log('other page group id', t)
    let tmp = {}
    tmp.id = t
    this.onLoad(tmp)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (wx.getStorageSync('isCreateGroup')) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
    wx.removeStorageSync('groupid')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})