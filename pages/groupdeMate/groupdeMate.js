// pages/groupdeMate/groupdeMate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:['排序','参与人数','最新发布'],
    tagindex:0,
    visible: false,
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
  choose(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tagindex:e.currentTarget.dataset.id
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
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