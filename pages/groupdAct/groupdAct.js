const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:['排序','参与人数','最新发布'],
    tagindex:0,
    imgurl: app.globalData.imgurl,
    choosetag:false
  },
  choose(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tagindex:e.currentTarget.dataset.id
    })
  },
  tap(e){
    this.setData({
      choosetag:!this.data.choosetag
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options.id)
    this.setData({
      groupnum:options.id
    })
       //小组活动
       let url = app.globalData.URL + '/group/activity/list';
       let data = {
         group_id: options.id,
         limit: '3',
         page: '1'
       }
       util.get(url, data).then(function (res) {
         console.log(res.data)
         that.setData({
           groupinfo: res.data.data,
         })
       })
  },
  toactdetail(e)
  {
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?id='+e.currentTarget.dataset.id,
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