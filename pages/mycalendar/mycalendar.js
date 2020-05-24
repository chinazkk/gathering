Page({
  data: {
    TabCur: 0,
    list:['全部','即将到来','已过期'],
    scrollLeft:0,
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
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  onLoad: function (options) {

  },

})