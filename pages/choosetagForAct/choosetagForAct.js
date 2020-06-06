const app = getApp();
var util = require("../../script/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [],
    riderCommentList: [{
      value: '衣着整洁',
      selected: false,
      title: '衣着整洁'
    }, {
      value: '准时送达',
      selected: false,
      title: '准时送达'
    }, {
      value: '餐品完善',
      selected: false,
      title: '餐品完善'
    }, {
      value: '服务专业',
      selected: false,
      title: '服务专业'
    }, {
      value: '微笑服务',
      selected: false,
      title: '微笑服务'
    }, {
      value: '穿着专业',
      selected: false,
      title: '穿着专业'
    }, {
      value: '文字评价',
      selected: false,
      title: '文字评价'
    }],
    detailValue:[]
  },
  checkboxChange(e) {
    // console.log('checkboxChange e:', e);
    let string = "tags[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.tags[e.target.dataset.index].selected
    })
    let detailValue = this.data.tags.filter(it => it.selected).map(it => it.value)
    console.log('所有选中的值为：', detailValue)
    this.setData({
      detailValue:detailValue
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let url = app.globalData.URL + '/admin/tag';
    util.get(url, {}).then(function (res) {
      console.log(res.data)
      let tmp=res.data.data.tags
      let entity=[]
      for(let i of tmp)
      {
        let obj={}
        obj.value=i
        obj.selected=false,
        obj.title=i
        entity.push(obj)
      }
      that.setData({
        tags: entity
      })
    })
  },
  finish(){
    wx.setStorageSync('tag', this.data.detailValue)
    wx.navigateBack({
      delta:1
    })
  },
  choosetag(e) {
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      tagindex: e.currentTarget.dataset.id
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