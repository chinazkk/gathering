const app = getApp();
var util = require("../../script/utils.js");
Page({
  data: {
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
    var that=this
    this.setData({
      hiddenmodalput: true
    })
    let url = app.globalData.URL + '/group/join';
    var data = {
      answer:this.data.ans,
      group_id:this.data.groupnum
    }
    util.post(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        that.setData({
          isjoin:true
        })
        console.log('join success')
      } 
    })
    wx.showModal({
      title: '你的申请已发送',
      // content: '这是一个模态弹窗',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
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
  },
  /**
   * 生命周期函数--监听页面加载
   */

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
  tojoindetail() {
    wx.navigateTo({
      url: '/pages/groupdeMate/groupdeMate?id=' + this.data.groupnum,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
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
    url = app.globalData.URL + '/groupjoin/user/list';
    data = {
      group_id: options.id,
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
      })
    })
    //判断用户是否加入小组
    url = app.globalData.URL + '/group/join/list';
    data = {
      audit_status:0,
      limit:6,
      page:1,
      user_id:wx.getStorageSync('userId')
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        joininfo: res.data.data,
      })
    })
  },
  toactdetail(e)
  {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id='+e.currentTarget.dataset.id,
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