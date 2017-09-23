// pages/me/me.js
//var forRentsData = require('../../data/forRents-data.js')
var app = getApp()
Page({
    data: {
        userInfo: {},
        postsCollected: {},
        showAbout: false,
        showCollect: false,
        showRent: false,
        noCollection: true
    },

    onLoad: function (options) {
        //console.log(app.globalData.forRentsList)
        this.setData({
            forRentsList: app.globalData.forRentsList,
            noCollection: true
        });
        var that = this;
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
            console.log(that.data.userInfo);
        })
    },

    about: function (event) {
        var showabout = this.data.showAbout;
        showabout = !showabout;
        this.setData({
            showAbout: showabout
        }
        )
    },

    Rent: function (event) {
        var showrent = this.data.showRent;
        showrent = !showrent;
        this.setData({
            showRent: showrent
        }
        )
    },

    Collection: function (event) {
        var showcollect = this.data.showCollect;
        showcollect = !showcollect;
        this.setData({
            showCollect: showcollect
        }
        )
        this.showCollection();
    },

    onForRentTap: function (event) {
        var forRentId = event.currentTarget.dataset.id;
        // console.log(forRentId);
        wx.navigateTo({
            url: "../forRent/forRent-detail/forRent-detail?id=" + forRentId
        })
    },

    showCollection: function () {
        this.setData({ noCollection: true })
        var postsCollected = wx.getStorageSync('posts_collected');
        //console.log(postsCollected);
        for (var i in postsCollected) {
            //console.log(postsCollected[i])
            if (postsCollected[i]) {
                this.setData({ noCollection: false })
            }
        }
        this.setData({
            postsCollected: postsCollected
        })
    },

    onPullDownRefresh: function () {
        this.onLoad();
    },

    hello: function () {
        console.log("hello world");
    },

    bindFormSubmit: function (event) {
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定提交以上找房信息吗？',
            success: function (res) {
                if (res.confirm) {
                    var str = event.detail.value.textarea;
                    if (str.length == 0) {
                        wx.showToast({
                            title: '不可为空',
                            duration: 1000
                        })
                    }
                    else if (str.length > 100) {
                        wx.showToast({
                            title: '字数太多啦',
                            duration: 1000
                        })
                    }
                    else {
                        wx.showToast({
                            title: '提交成功',
                            duration: 1000,
                        })
                        that.setData({ showRent: false })
                        //console.log(str);
                        wx.request({
                            url: 'https://macleased.com/MacLeased/public/api/v1/postRent',
                            data: {
                                title: str,
                                wechat_nickname: that.data.userInfo.nickName,
                                wechat_avater: that.data.userInfo.avatarUrl
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (res) {
                                console.log(res.data)
                            }
                        });
                    }
                }
            }
        })
    },

    MyForRentTap: function (event) {
        wx.navigateTo({
            url: 'MyForRent/MyForRent',
        })

    },

})