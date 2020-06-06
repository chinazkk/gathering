const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    needflesh: true,
    currentpage: 1, //当前页数
    fleshlimit: '7', //每次刷新页数
    info: [],
    imgurl: app.globalData.imgurl,
    issearch:false//是否搜索
  },
  getkeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
    this.flesh()
  },
  toactivity(e){
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id='+e.currentTarget.dataset.id,
    })
  },
  //搜索刷新 或 选择刷新
  flesh() {
    var that = this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      keyword: that.data.keyword,
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log('flesh', res.data)
      that.setData({
        info: res.data.data,
        issearch:true
      })
    })
  },
  flesh2() {
    console.log('flesh2')
    var that = this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      keyword: that.data.tags[that.data.tagindex],
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log('flesh', res.data)
      that.setData({
        info: res.data.data,
        issearch:true
      })
    })
  },
  flesh3(index) {
    console.log('flesh3')
    var that = this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      keyword: that.data.tags[index],
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log('flesh', res.data)
      that.setData({
        info: res.data.data,
        issearch:true
      })
    })
  },
  onReachBottom: function () {
    var that = this
    if (that.data.needflesh) {
      console.log("上拉刷新")
      let url = app.globalData.URL + '/group/activity/list';
      let data = {
        keyword: that.data.keyword,
        limit: that.data.fleshlimit,
        page: that.data.currentpage + 1
      }
      util.get(url, data).then(function (res) {
        console.log('flesh', res.data)
        if (!res.data.data.length) {
          that.setData({
            needflesh: false,
            issearch:true
          })
        } else {
          let tmp = that.data.info
          for (let i of res.data.data)
            tmp.push(i)
          that.setData({
            info: tmp,
            currentpage: that.data.currentpage + 1,
            issearch:true
          })
        }
      })
    }
  },
  choosetag(e) {
    // console.log(e.currentTarget.dataset.id)
    if (this.data.tagindex == e.currentTarget.dataset.id) {
      this.setData({
        tagindex: '-1'
      })
    } else{
      this.setData({
        tagindex: e.currentTarget.dataset.id
      })
      this.flesh2()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/admin/tag';
    util.get(url, {}).then(function (res) {
      console.log(res.data)
      that.setData({
        tags: res.data.data.tags
      })
    })
    //获取即将到来的活动
    url = app.globalData.URL + '/group/activity/list';
    let data={
      isComing: that.data.keyword,
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log('lastactivity',res.data)
      that.setData({
        lastactivity: res.data.data
      })
    })
    wx.removeStorageSync('searchTag')
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
    let tmp = wx.getStorageSync('searchTag')
    console.log(tmp)
    if (tmp){
      this.setData({
        tagindex: tmp
      })
      this.flesh3(tmp)
    }
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