const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    check1: false,
    check2: false,
    name: '',
    loc: '',
    info: '',
    tag: '',
    globalimg: app.globalData.imgurl
  },
  getname(e) {
    let t = 'userinfo.nick'
    this.setData({
      [t]: e.detail.value
    })
  },
  getloc(e) {
    let t = 'userinfo.location'
    this.setData({
      [t]: e.detail.value
    })
  },
  getinfo(e) {
    let t = 'userinfo.introduction'
    this.setData({
      [t]: e.detail.value
    })
  },
  gettag(e) {
    let t = 'userinfo.tags'
    this.setData({
      [t]: e.detail.value
    })
  },
  check1(e) {
    this.setData({
      check1: !this.data.check1
    })
  },
  check2(e) {
    this.setData({
      check2: !this.data.check2
    })
  },
  handleShow: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      chooseindex: e.currentTarget.dataset.id
    })
    this.setData({
      visible: true
    });
  },

  handleCancel: function () {
    this.setData({
      visible: false
    });
  },
  saveinfo(e) {
    let url = app.globalData.URL + '/user';
    var data = {
      id: this.data.groupnum,
      nick: this.data.userinfo.name,
      introduction: this.data.userinfo.introduction,
      number: this.data.userinfo.number,
      location: this.data.userinfo.location,
      question: this.data.userinfo.question,
      image: this.data.userinfo.image
    }
    util.other(url, data, 'PUT').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showModal({
          title: '你的修改已保存',
          confirmText: '确认',
          showCancel: false, //是否显示取消按钮-----》false去掉取消按钮
          success: res => {
            if (res.confirm) {
              console.log('finish update')
            }
          }
        })
        // wx.showToast({
        //   title: '提交成功',
        //   duration: 2000,
        //   success: function () {
        //     setTimeout(function () {
        //       wx.reLaunch({
        //         url: '/pages/index/index',
        //       })
        //     }, 2000);
        //   }
        // })
      } else {
        wx.showToast({
          title: res.data.msg,
          image: '/img/fail.png',
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
  },
  ViewImage(e) {
    let url
    if (this.data.userinfo.avatar.length < 40)
      url = this.data.globalimg + this.data.userinfo.avatar
    else
      url = this.data.userinfo.avatar
    let tmp = []
    tmp.push(url)
    wx.previewImage({
      urls: tmp,
      current: this.data.userinfo.avatar
    });
  },
  uploadpic() {
    var that = this
    let url = app.globalData.URL + '/user/img';
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        that.setData({
          imgList: res.tempFilePaths
        })
        wx.showLoading({
          title: '上传中...',
          mask: true //显示触摸蒙层  防止事件穿透触发
        });
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            "content-type": "application/json"
          },
          formData: {
            type: 'image'
          },
          success(res) {
            wx.hideLoading()
            let tmp = 'userinfo.avatar'
            let t = JSON.parse(res.data)
            that.setData({
              [tmp]: t.data.url,
              imgurl: t.data.url
            })
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/user';
    let data = {
      user_id: wx.getStorageSync('userId'),
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        userinfo: res.data.data
      })
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