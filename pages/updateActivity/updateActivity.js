const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    type: 0,
    imgurl: '',
    id: '',
    name: '',
    select: false,
    tihuoWay: '未选择类别',
    area: '',
    num: 0,
    location: '',
    time: '',
    taglist: ['#xxxx', '#xxxx', '#xxxx', '#xxxx', '#xxxx', '#xxxx', '#xxxx', '#xxxx', '#xxxx', '#xxxx', ],
    check: false,
    timenow: '',
    index: null,
    picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
    imgurl: app.globalData.imgurl
  },
  totag() {
    wx.navigateTo({
      url: '/pages/choosetagForAct/choosetagForAct',
    })
  },
  getname(e) {
    let t = 'info.title'
    this.setData({
      [t]: e.detail.value
    })
  },
  gettime(e) {
    let t = 'info.time'
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
  getlocation(e) {
    let t = 'info.location'
    this.setData({
      [t]: e.detail.value
    })
  },
  textareaAInput(e) {
    let t = 'info.summarize'
    this.setData({
      [t]: e.detail.value
    })
  },
  //下拉框
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    let t = 'info.type'
    var name = e.currentTarget.dataset.name
    this.setData({
      [t]: e.currentTarget.dataset.id,
      tihuoWay: name,
      select: false
    })
  },

  commit(e) {
    // console.log(this.data.imgurl.data.url)
    var that = this.data.info
    let url = app.globalData.URL + '/group/activity';
    var data = {
      id: that.id,
      type: that.type,
      group_id: that.group_id,
      title: that.title,
      time: that.time,
      location: that.location,
      summarize: that.summarize,
      number: that.num,
      image: that.image,
      tags: that.tags,
      notice_status:this.data.check
    }
    util.other(url, data, 'PUT').then(function (res) {
      console.log(res.data)
      if (res.data.code == 200) {
        wx.showToast({
          title: '修改成功',
          duration: 2000,
          success: function () {
            setTimeout(function () {
              // wx.navigateTo({
              //   url: '/pages/groupdetail/groupdetail?id=' + that.data.groupnum,
              // })
              wx.navigateBack({
                delta: 2,
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
  },
  delactivity() {
    var that = this
    wx.showModal({
      title: '删除该活动',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          let url = app.globalData.URL + '/group/activity';
          var data = {
            id:that.data.info.id
          }
          console.log('delete act confirm')
          util.other(url, data, 'DELETE').then(function (res) {
            console.log(res.data)
            if (res.data.code == 200) {
              wx.showToast({
                title: '删除成功',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    // wx.navigateTo({
                    //   url: '/pages/groupdetail/groupdetail?id=' + that.data.groupnum,
                    // })
                    wx.navigateBack({
                      delta: 2,
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
      }
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
            let t = JSON.parse(res.data)
            let u = 'info.image'
            that.setData({
              [u]: t.data.url
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
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  check(e) {
    this.setData({
      check: !this.data.check
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    var that = this
    that.setData({
      actid: options.id
    })
    var that = this
    let url = app.globalData.URL + '/group/activity';
    var data = {
      id: options.id
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let t = res.data.data.image
      let tmp = that.data.imgList
      tmp.push(that.data.imgurl + t)
      let _type = res.data.data.type
      if (_type == '0')
        that.setData({
          tihuoWay: '线上游戏'
        })
      else if (_type == '1')
        that.setData({
          tihuoWay: '经验分享'
        })
      else if (_type == '2')
        that.setData({
          tihuoWay: '影视鉴赏'
        })
      else if (_type == '3')
        that.setData({
          tihuoWay: '美食探店'
        })
      that.setData({
        info: res.data.data,
        type: _type,
        imgList: tmp,
        check:res.data.data.notice_status
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
    let t=wx.getStorageSync('tag')
    let n='info.tags'
    console.log(t)
    this.setData({
      [n]:t
    })
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