const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false,
    info:[{
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
  bind(e){
    console.log(this.data.chooseindex)
  },
  handleShow: function (e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      chooseindex:e.currentTarget.dataset.id
    })
    this.setData({ visible: true });
  },

  handleCancel: function () {
    this.setData({ visible: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    //获取我的小组
    let url = app.globalData.URL + '/group/collection/list';
    var data = {
      limit: '6',
      page: '1',
    }
    util.get(url, data).then(function (res) {
      that.setData({
        collect: res.data
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