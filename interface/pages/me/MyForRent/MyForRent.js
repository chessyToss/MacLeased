var app = getApp()
Page({
    data: {
        tempFilePaths: [],
        houseType: ['house单间', 'house单间(地下室)', 'apartment一室一厅', 'apartment两室一厅', 'apartment三室一厅'],
        houseTypeIndex: 0,
        housePeriod: ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月', '12个月'],
        housePeriodIndex: 11,
        date: '2016-09-01',
        items: [
            { name: 'water', value: '包水' },
            { name: 'electricity', value: '包电' },
            { name: 'internet', value: '包网' },
            { name: 'heat', value: '包暖气' },
            { name: 'pets', value: '可养宠物' },
            { name: 'workout', value: '有健身房' },
            { name: 'parking', value: '有停车位' },
            { name: 'swimmingPool', value: '有游泳池' }
        ],
        uploadFilePaths:[]
    },

    onLoad: function () {
        var that = this;
        app.getUserInfo(function (userInfo) {
            that.setData({
                userInfo: userInfo
            })
            //console.log(that.data.userInfo);
        })
        this.setData({
            water: 0, electricity: 0, internet: 0, heat: 0, pets: 0, workout: 0, parking: 0, swimmingPool: 0
        })
    },

    chooseimage: function () {
        var that = this;
        wx.chooseImage({
            count: 6,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                console.log(res.tempFilePaths);
                that.setData({
                    tempFilePaths: res.tempFilePaths
                })
            }
        })
    },

    bindPickerHouseType: function (e) {
        //console.log(e.detail.value);
        this.setData({
            houseTypeIndex: e.detail.value
        })
    },

    bindPickerPeriod: function (e) {
        this.setData({
            housePeriodIndex: e.detail.value
        })
    },

    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    checkboxChange: function (e) {
        this.setData({
            utilities: e.detail.value
        })
    },

    formSubmit: function (e) {
        e.detail.value.pictures = this.data.tempFilePaths;
        var houseTitle = e.detail.value.houseTitle;
        var textarea = e.detail.value.textarea;
        var address = e.detail.value.address;
        var price = e.detail.value.price;
        var wechat = e.detail.value.wechat;
        var phone = e.detail.value.phone;
        var email = e.detail.value.email;
        var pictures = e.detail.value.pictures;
        var date = this.data.date;
        var housePeriodIndex = this.data.housePeriod[this.data.housePeriodIndex];
        var houseTypeIndex = this.data.houseType[this.data.houseTypeIndex];
        var utilities = this.data.utilities;
        var that = this;
        //console.log(utilities);
        wx.showModal({
            title: '提示',
            content: '确定上传以上房源信息吗？',
            success: function (res) {
                if (res.confirm) {
                    if (houseTitle.length == 0) {
                        wx.showToast({
                            title: '请填写房源标题',
                            duration: 1000,
                        })
                    }
                    else if (houseTitle.length > 15) {
                        wx.showToast({
                            title: '房源标题太长啦',
                            duration: 1000,
                        })
                    }
                    else if (pictures.length == 0) {
                        wx.showToast({
                            title: '请添加至少一张房源图片',
                            duration: 1000,
                        })
                    }
                    else if (textarea.length == 0) {
                        wx.showToast({
                            title: '请填写房源简介',
                            duration: 1000
                        })
                    }
                    else if (textarea.length > 100) {
                        wx.showToast({
                            title: '房源简介太长啦',
                            duration: 1000
                        })
                    }
                    else if (address.length == 0 | address.length > 20) {
                        wx.showToast({
                            title: '房源地址不合法',
                            duration: 1000
                        })
                    }
                    else if (price.length == 0 | price <= 0 | isNaN(price)) {
                        wx.showToast({
                            title: '租金不合法',
                            duration: 1000
                        })
                    }
                    else if (wechat.length == 0 & email.length == 0 & phone.length == 0) {
                        wx.showToast({
                            title: '请填写一种联系方式',
                            duration: 1000
                        })
                    }
                    else if (email.length != 0 & !that.checkEmail(email)) {
                        wx.showToast({
                            title: '邮箱格式错误',
                            duration: 1000
                        })
                    }
                    else if (phone.length > 11) {
                        wx.showToast({
                            title: '手机号格式错误',
                            duration: 1000
                        })
                    }
                    else {
                        wx.showToast({
                            title: '提交成功',
                            duration: 1500,
                        })
                        setTimeout(function () {
                            wx.switchTab({
                                url: "/pages/me/me",
                            })
                        }, 1500);
                        if (utilities) {
                            for (var i = 0; i < utilities.length; i++) {
                                switch (utilities[i]) {
                                    case "water":
                                        that.setData({
                                            water: 1
                                        })
                                        break;
                                    case "pets":
                                        that.setData({
                                            pets: 1
                                        })
                                        break;
                                    case "swimmingPool":
                                        that.setData({
                                            swimmingPool: 1
                                        })
                                        break;
                                    case "electricity":
                                        that.setData({
                                            electricity: 1
                                        })
                                        break;
                                    case "internet":
                                        that.setData({
                                            internet: 1
                                        })
                                        break;
                                    case "heat":
                                        that.setData({
                                            heat: 1
                                        })
                                        break;
                                    case "parking":
                                        that.setData({
                                            parking: 1
                                        })
                                        break;
                                    case "workout":
                                        that.setData({
                                            workout: 1
                                        })
                                        break;
                                    default:
                                }
                            }
                        }
                        //console.log(that.data.uploadFilePaths);
                        for (var i = 0; i < that.data.tempFilePaths.length; i++) {
                            wx.uploadFile({
                                url: 'https://macleased.com/MacLeased/public/api/v1/postPictures', //仅为示例，非真实的接口地址
                                filePath: that.data.tempFilePaths[i],
                                name: 'file',
                                formData: {
                                    'user': 'test'
                                },
                                success: function (res) {
                                    var data = res.data
                                    //console.log(data);
                                    that.data.uploadFilePaths.push(data);
                                    console.log(that.data.uploadFilePaths);
                                    if(that.data.uploadFilePaths.length == that.data.tempFilePaths.length){
                                        var str  = "";
                                        for (var i = 0; i < that.data.uploadFilePaths.length-1;i++){
                                            str += that.data.uploadFilePaths[i];
                                            str += ",";
                                        }
                                        str += that.data.uploadFilePaths[that.data.tempFilePaths.length-1];
                                        // console.log(that.data.uploadFilePaths);
                                        // console.log(str);
                                        wx.request({
                                            url: 'https://macleased.com/MacLeased/public/api/v1/postForRents',
                                            data: {
                                                uploadFilePaths: str,
                                                title: houseTitle,
                                                homeType: houseTypeIndex,
                                                address: address,
                                                price: price,
                                                period: housePeriodIndex,
                                                weChatNickName: that.data.userInfo.nickName,
                                                weChatId: wechat,
                                                phone: phone,
                                                email: email,
                                                weChatAvater: that.data.userInfo.avatarUrl,
                                                rentTime: date,
                                                remarks: textarea,
                                                water: that.data.water,
                                                electricity: that.data.electricity,
                                                Internet: that.data.internet,
                                                heat: that.data.heat,
                                                pets: that.data.pets,
                                                workout: that.data.workout,
                                                parking: that.data.parking,
                                                swimmingPool: that.data.swimmingPool
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
                                    //do something
                                }
                            })
                        }

                    }
                }
            }
        })
    },

    checkEmail: function (str) {
        var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },

    uploadimage: function () {
        var that = this;
        //console.log(that.data.uploadFilePaths);
       
    },
})  