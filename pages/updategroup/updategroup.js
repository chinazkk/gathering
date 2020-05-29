const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    info: null,
    id: '',
    name: '',
    area: '',
    num: 0,
    question: '',
    imgurl: app.globalData.imgurl
  },
  getname(e) {
    let t = 'info.name'
    this.setData({
      [t]: e.detail.value
    })
  },
  getnum(e) {
    let t = 'info.number'
    this.setData({
      [t]: e.detail.value
    })
  },
  getque(e) {
    let t = 'info.question'
    this.setData({
      [t]: e.detail.value
    })
  },
  textareaAInput(e) {
    let t = 'info.introduction'
    this.setData({
      [t]: e.detail.value
    })
  },

  delgroup(e) {
    wx.showModal({
      title: '删除该小组',
      content: '确定删除后不能撤回',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          console.log('delete group')
          let url = app.globalData.URL + '/group';
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
                  setTimeout(function () {
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                  }, 2000);
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
  commit(e) {
    let url = app.globalData.URL + '/group';
    var data = {
      id: this.data.groupnum,
      name: this.data.info.name,
      introduction: this.data.info.introduction,
      number: this.data.info.number,
      question: this.data.info.question,
      image: this.data.info.image
    }
    util.other(url, data, 'PUT').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '提交成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }, 2000);
          }
        })
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

  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
          console.log(res.tempFilePaths)
          let data = {
            img: res.tempFilePaths[0],
            type: 'image'
          }
          let url = app.globalData.URL + '/user/img';
          util.post(url, data).then(function (res) {
            console.log(res.data)
            if (res.data.code == 0) {
              wx.showToast({
                title: '提交成功',
                duration: 2000,
                success: function () {
                  // setTimeout(function() { 
                  //   wx.reLaunch({
                  //     url: '/pages/index/index',
                  //   }) 
                  // }, 2000); 
                }
              })
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
        }
      }
    });
  },

  uploadpic() {
    var that = this
    let data = {
      img: this.data.imgList[0],
      type: 'image'
    }
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
            console.log('upload', res)
            let t = JSON.parse(res.data)
            console.log(t)
            let tmp = 'info.image'
            that.setData({
              [tmp]: t.data.url
            })
          }
        })
      }
    })

  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '您好',
      content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.avatarUrl)
    let t = wx.getStorageSync('userInfo')
    this.setData({
      avatarUrl: t.avatarUrl
    })
    console.log(options.id)
    var that = this
    let url = app.globalData.URL + '/group';
    var data = {
      id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let t = res.data.data.image
      let tmp = that.data.imgList
      tmp.push(that.data.imgurl + t)
      that.setData({
        info: res.data.data,
        groupnum: options.id,
        imgList: tmp
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