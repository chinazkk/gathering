const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    tag: ['排序', '参与人数', '最新发布'],
    order: '0',//	 0-参与人数 1-最新发布
    imgurl: app.globalData.imgurl,
    currentpage:1,//当前页数
    fleshlimit:'7'//每次刷新页数
  },
  choose(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      order: e.currentTarget.dataset.id,
      currentpage:1
    })
    this.flesh()
  },
  getkeyword(e){
    this.setData({
      keyword:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //小组活动
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      order:that.data.order,
      type: '0',
      limit:that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      that.setData({
        groupinfo: res.data.data,
        currentpage:that.data.currentpage+1
      })
    })
  },
  flesh(){
    var that=this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      order:that.data.order,
      type: '0',
      limit:that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      that.setData({
        groupinfo: res.data.data,
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉刷新")
    var that=this
    let url = app.globalData.URL + '/group/activity/list';
    let data = {
      order:that.data.order,
      type: '0',
      limit:that.data.fleshlimit,
      page: that.data.currentpage
    }
    util.get(url, data).then(function (res) {
      console.log('flesh',res.data)
      let tmp=that.data.groupinfo
      for(let i of res.data.data)
      tmp.push(i)
      that.setData({
        groupinfo: tmp,
        currentpage:that.data.currentpage+1
      })
    })
  },
  todetail(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/',
    })
  }
})