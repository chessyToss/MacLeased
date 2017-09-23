// pages/forRent/forRent-detail/forRent-detail.js
//var ForRentData = require('../../../data/forRents-data.js')
var app = getApp();
Page({
  data: {
    ForRentsData:{},
  },

  onLoad: function (option) {
    var forRentId = option.id;
    //console.log(app.globalData.forRentsList);
    //console.log(forRentId);
    this.setData({
      currentPostId: forRentId
    })
    var allData = app.globalData.forRentsList;
    for(var i=0;i<allData.length;i++){
        if (allData[i].id==forRentId){
            var ForRentsData = allData[i];
        }
    }
    //var ForRentsData = app.globalData.forRentsList[forRentId];
    //console.log(ForRentsData);
    this.setData({
      ForRentsData: ForRentsData
    })   
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[forRentId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[forRentId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }

  },
  
  onColletionTap: function (event) {
    // this.getPostsCollectedSyc();
    this.getPostsCollectedSyc();
  },

  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    //console.log(postsCollected);
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    this.showToast(postsCollected, postCollected);
  },

  showToast: function (postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected);
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  },

  viewPostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    console.log(src)
    wx.previewImage({
      current: src, 
      urls: [src] 
    })
  },
})