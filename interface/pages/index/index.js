<<<<<<< HEAD
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  rentOnTap: function (event) {

    wx.switchTab({
      url: "../rent/rent"
    });

  },

  forRentOnTap: function (event) {

    wx.switchTab({
      url: "../forRent/forRent"
    });

  }
})
=======
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  rentOnTap: function (event) {

    wx.switchTab({
      url: "../rent/rent"
    });

  },

  forRentOnTap: function (event) {

    wx.switchTab({
      url: "../forRent/forRent"
    });

  }
})
>>>>>>> 885fefeaf63b56670f0fecc6aed53dcf7eddc553
