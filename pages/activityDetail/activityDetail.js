const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscreater: false,
    imgurl: app.globalData.imgurl,
    groupinfo: [],
    actinfo: [],
    isjoin: false,
    iscollect: false,
  },

  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    console.log(options.id)
    //获取活动情况
    let url = app.globalData.URL + '/group/activity';
    var data = {
      id: options.id
    }
    util.get(url, data).then(function (res) {
      that.setData({
        actinfo: res.data.data
      })
      let userid = wx.getStorageSync('userId')
      if (res.data.data.user.id == userid) {
        that.setData({
          iscreater: true
        })
      }
      //获取小组情况
      url = app.globalData.URL + '/group'
      data = {
        id: res.data.data.group_id
      }
      util.get(url, data).then(function (res) {
        that.setData({
          groupinfo: res.data.data
        })
      })
      //获取加入小组人数
      url = app.globalData.URL + '/group/join/user/list'
      data = {
        group_id: res.data.data.group_id
      }
      util.get(url, data).then(function (res) {
        console.log('joinnum', res.data.data.length)
        that.setData({
          joinnum: res.data.data.length
        })
      })
      //获取小组其他活动
      url = app.globalData.URL + '/group/activity/list'
      data = {
        group_id: res.data.data.group_id,
        limit: 5,
        page: 1
      }
      util.get(url, data).then(function (res) {
        console.log('groupOtherActivity', res.data.data)
        that.setData({
          groupOtherActivity: res.data.data
        })
      })
    })
    //获取用户是否收藏了活动
    url = app.globalData.URL + '/group/collection'
    data = {
      activity_id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log('iscollect', res.data.data)
      that.setData({
        iscollect: res.data.data
      })
    })
    //获取用户是否加入了活动
    url = app.globalData.URL + '/group/activity/join'
    data = {
      activity_id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log('isjoin', res.data.data)
      that.setData({
        isjoin: res.data.data
      })
    })
    //获取活动用户列表
    url = app.globalData.URL + '/group/activity/join/list'
    data = {
      limit: 10,
      page: 1,
      activity_id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log('joinlist', res.data.data)
      that.setData({
        joinlist: res.data.data
      })
      wx.hideLoading()
    })
    
  },
  toOtherAct(e) {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  editact(e) {
    wx.navigateTo({
      url: '/pages/updateActivity/updateActivity?id=' + this.data.actinfo.id,
    })
  },
  tojoin(e) {
    var that = this
    let url = app.globalData.URL + '/group/activity/join';
    var data = {
      activity_id: this.data.actinfo.id
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '参加成功',
          duration: 2000,
          success: function () {
            console.log('join success')
            that.setData({
              isjoin: true
            })
          }
        })
      }
    })
  },
  tocollect(e) {
    var that = this
    let url = app.globalData.URL + '/group/collection';
    var data = {
      activity_id: this.data.actinfo.id
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '收藏成功',
          duration: 2000,
          success: function () {
            console.log('join success')
            that.setData({
              iscollect: true
            })
          }
        })
      }
    })
  },
  cancelcollect() {
    var that = this
    let url = app.globalData.URL + '/group/collection';
    var data = {
      id: this.data.actinfo.id
    }
    util.other(url, data, 'DELETE').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '取消收藏',
          duration: 2000,
          success: function () {
            console.log('cancel collection success')
            that.setData({
              iscollect: false
            })
          }
        })
      }
    })
  },
  quitact() {
    var that = this

    wx.showModal({
      title: '退出该小组',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('quit act confirm')
          let url = app.globalData.URL + '/group/activity/join';
          var data = {
            id: this.data.actinfo.id
          }
          util.other(url, data, 'DELETE').then(function (res) {
            console.log(res.data)
            if (res.data.code == 200) {
              wx.showToast({
                title: '退出成功',
                duration: 2000,
                success: function () {
                  console.log('quit act success')
                  that.setData({
                    isjoin: false
                  })
                }
              })
            }
          })
        }
      }
    })

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