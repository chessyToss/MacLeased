// pages/forRent/forRent.js

//var forRentsData = require('../../data/forRents-data.js')
var app = getApp();
Page({
  data: {
  
  },

  onLoad: function (options) {
    // this.setData({
    //   forRentsList: forRentsData.forRentDB
    // });
    var that = this;
    wx.request({
        url: 'https://macleased.com/MacLeased/public/api/v1/forRents',
        method: 'GET',
        header: {
            "Content-Type": "application/xml"
        },
        success: function (res) {
            console.log(res.data)
            for(var i=0;i<res.data.length;i++){
                var postTime = res.data[i].postTime;
                var str = postTime.substring(0, 4) + postTime.substring(5, 7) + postTime.substring(8, 10)
                //console.log(str);   
                var newUploadPaths = new Array();         
                var uploadFilePath = res.data[i].uploadFilePaths.split(",");
                for (var j = 0; j < uploadFilePath.length;j++){
                    uploadFilePath[j] = str +"/"+ uploadFilePath[j];
                    newUploadPaths.push(uploadFilePath[j]);    
                }
                res.data[i].uploadFilePaths = newUploadPaths;
                //console.log(res.data[i].uploadFilePaths);
                //console.log(res.data);
            }
            that.setData({
                forRentsList: res.data.reverse()
            });
            app.globalData.forRentsList=res.data.reverse();
        },
        fail: function (error) {
            console.log(error)
        }
    })
  },

  onForRentTap: function (event) {
    var forRentId = event.currentTarget.dataset.id;
    //console.log(forRentId);
    wx.navigateTo({
      url: "forRent-detail/forRent-detail?id=" + forRentId
    })
  },


  onPullDownRefresh: function () {
      this.onLoad();
  },
 
})