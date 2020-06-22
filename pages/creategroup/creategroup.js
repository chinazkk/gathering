const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    imgurl: '',
    id: '',
    name: '',
    area: '',
    num: 0,
    question: ''
  },
  getname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getnum(e) {
    this.setData({
      num: e.detail.value
    })
  },
  getque(e) {
    this.setData({
      question: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      area: e.detail.value
    })
  },
  commit(e) {
    // console.log(this.data.imgurl.data.url)
    if (!this.data.imgurl) {
      wx.showToast({
        title: '请上传小组封面图',
      })
    } else if (!this.data.name || !this.data.num || !this.data.area || !this.data.question) {
      wx.showToast({
        title: '请完善小组信息',
      })
    } else {
      let url = app.globalData.URL + '/group';
      var data = {
        name: this.data.name,
        introduction: this.data.area,
        number: this.data.num,
        question: this.data.question,
        image: this.data.imgurl
      }
      util.post(url, data).then(function (res) {
        console.log(res.data)
        if (res.data.code == 200) {
          wx.setStorageSync('isCreateGroup', 1)
          wx.showToast({
            title: '提交成功',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/groupdetail/groupdetail?id=' + res.data.data,
                })
              }, 2000);
            }
          })
        } else {
          wx.showToast({
            title: '提交失败',
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
            that.setData({
              imgurl: t.data.url
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
      title: '删除图片',
      content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          // this.data.imgurl.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgurl: '',
            imgList: []
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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