// pages/groupdetail/groupdetail.js
Page({
  data: {
    isjoin: false,
    ans:'',
    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框  
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框  
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });

  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
    // wx.showToast({ 
    //   title: '你的申请已发送',
    //    duration: 2000,
    //    success: function() { 
    //     setTimeout(function() { 
    //     }, 2000); 
    //   }
    // })
    wx.showModal({
      title: '你的申请已发送',
      // content: '这是一个模态弹窗',
      showCancel:false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } 
      }
    })
  },
  quitgroup(e){
    wx.showModal({
      title: '退出该小组',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('quit group confirm')
 
        }
      }
    })
  },
  getans(e){
    this.setData({
      ans:e.detail.value
    })
  },
  toupdate() {
    wx.navigateTo({
      url: '/pages/updategroup/updategroup',
    })
  },

  tojoin() {
    var that=this
    wx.showModal({
      title: '申请加入该小组',
      // content: '确定要删除这张照片吗',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          console.log('first confirm')
          that.setData({
            hiddenmodalput: !this.data.hiddenmodalput
          })
        }
      }
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