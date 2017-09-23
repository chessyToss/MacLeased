// pages/rent/rent.js
//var rentsData = require('../../data/rents-data.js')
Page({

  data: {
    array:[2,4,6,8,10]
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://macleased.com/MacLeased/public/api/v1/rents',
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      success: function (res) {
        that.setData({
          rentsList: res.data.reverse()
        });
      },
      fail: function (error) {
        console.log(error)
      }
    })
    //console.log(this.data.rentsList);
  },

  onPullDownRefresh: function () {
    this.onLoad();
  },
})