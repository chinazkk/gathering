const app = getApp();
var util = require("../../script/utils.js");
Page({
  data: {
    needflesh: true,
    keyword: '',
    tag: ['排序', '参与人数', '最新发布'],
    order: '0', //	 0-参与人数 1-最新发布
    type:'0',
    currentpage: 1, //当前页数
    fleshlimit: '7', //每次刷新页数
    imgurl: app.globalData.imgurl
  },
  choose(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      order: e.currentTarget.dataset.id,
      currentpage: 1
    })
    this.flesh()
  },
  getkeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
    this.flesh()
  },
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      order: that.data.order,
      type: that.data.type,
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      that.setData({
        groupinfo: res.data.data,
        currentpage: that.data.currentpage
      })
    })
  },
  //搜索刷新 或 选择刷新
  flesh() {
    var that = this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      keyword: that.data.keyword,
      order: that.data.order,
      type: that.data.type,
      limit: that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log('flesh', res.data)
      that.setData({
        groupinfo: res.data.data,
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.needflesh) {
      console.log("上拉刷新")
      let url = app.globalData.URL + '/group/activity/list';
      let data = {
        order: that.data.order,
        type: that.data.type,
        limit: that.data.fleshlimit,
        page: that.data.currentpage + 1
      }
      util.get(url, data).then(function (res) {
        console.log('flesh', res.data)
        if (!res.data.data.length) {
          that.setData({
            needflesh: false
          })
        } else {
          let tmp = that.data.groupinfo
          for (let i of res.data.data)
            tmp.push(i)
          that.setData({
            groupinfo: tmp,
            currentpage: that.data.currentpage + 1
          })
        }
      })
    }
  },
  todetail(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id='+e.currentTarget.dataset.id,
    })
  }
})