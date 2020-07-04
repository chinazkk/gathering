const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotgroup:[],
    imgurl:app.globalData.imgurl,
    list:[{
      img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      name:'asd',

    },
    {
      img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      name:'asdw',
      
    },
    {
      img:'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
      name:'awdsd',
      
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/group/activity/list';
    var data = {
      limit: '10',
      page: '1',
      isHot:'1'
    }
    util.get(url, data).then(function (res) {
      console.log(res.data)
      let test = res.data.data
      test.forEach((item) => {
        //这里需要截取的内容
         item.time = item.time.substring(0, 10)
       })
      that.setData({
        hotgroup:test
      })
      wx.hideLoading()
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