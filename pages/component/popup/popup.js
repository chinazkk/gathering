// popup-bottom.js
Component({
  properties: {
    myVisible: {
      type: Boolean,
      value: false,
      observer: '_visibleChange',
    },
  },

  data: {
    visible: false,
    animation: null,
    animationData: null,
  },

  ready: function () {
    const animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0,
    });
    this.setData({
      animation,
    })
  },

  methods: {
    _visibleChange: function (newVal, oldVal, changedPath) {
      if (oldVal === false && newVal === true) {
        setTimeout(function () {
          this._onShow();
        }.bind(this), 0)
      }
    },

    _onShow: function () {
      const __this = this;
      const query = wx.createSelectorQuery().in(this);
      query.select('#modal-box').boundingClientRect(function (res) {
        const { animation } = __this.data;
        animation.translateY(-res.height).step();
        __this.setData({
          visible: true,
          animationData: animation.export(),
        })
      }).exec();
    },

    _onCancel: function () {
      const { animation } = this.data;
      animation.translateY(0).step();
      this.setData({
        visible: false,
        animationData: animation.export(),
      })
      setTimeout(function () {
        this.triggerEvent('myOnCancel');
      }.bind(this), 200)
    },

  },
})
