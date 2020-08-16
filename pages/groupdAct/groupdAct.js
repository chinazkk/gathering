const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag: ['排序', '参与人数', '最新发布'],
    tagindex: 0,
    imgurl: app.globalData.imgurl,
    keyword: '',
    choosetag: false,
    order: '0', //	 0-参与人数 1-最新发布
    currentpage: 1, //当前页数
    fleshlimit: '7', //每次刷新页数
  },
  choose(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      order: e.currentTarget.dataset.id,
      tagindex: e.currentTarget.dataset.id,
      choosetag: !this.data.choosetag,
    })
    this.flesh()
  },
  getkeyword(e) {
    this.setData({
      keyword: e.detail.value
    })
    this.flesh()
  },
  flesh() {
    var that = this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      keyword: that.data.keyword,
      order: that.data.order,
      limit: that.data.fleshlimit,
      page: that.data.currentpage,
      group_id:this.data.groupnum
    }
    util.get(url, data).then(function (res) {
      console.log('flesh', res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
        if(item.title.length>8)
        item.title=item.title.substring(0,8)+"..."
        item.time = item.time.substring(0, 10)
      })
      that.setData({
        groupinfo: test,
      })
    })
  },
  tap(e) {
    this.setData({
      choosetag: !this.data.choosetag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)
    this.setData({
      groupnum: options.id
    })
    //小组活动
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      group_id: options.id,
      limit: '7',
      page: '1'
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
        if(item.title.length>8)
        item.title=item.title.substring(0,8)+"..."
        item.time = item.time.substring(0, 10)
      })
      that.setData({
        groupinfo: test,
      })
    })
  },
  toactdetail(e) {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id=' + e.currentTarget.dataset.id,
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