// huali/xiangq/xiangq.js


var app = getApp()
Page({




  addcar: function (e) {
    var ll = app.globalData.userInfo;
    let name = e.currentTarget.dataset.name;
    let src = e.currentTarget.dataset.src;
    let price = e.currentTarget.dataset.price;
    let nickname = ll.nickName;
    if (ll != null) {
      console.log(ll.nickName)
      wx.showModal({
        title: "提示",
        content: "是否添加进购物车?",
        confirmText: "确认添加",
        cancelText: "我点错了",
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: "http://localhost:8888/addcar.do",
              method: "get",
              data: {
                name: name,
                src: src,
                price: price,
                nickname: nickname,
              },
              header: {
                "Content-Type": "json"
              },
              success: (res) => {

              }
            });
            wx.showToast({

              title: '添加成功!',
              icon: 'success',
              duration: 2000//持续的时间
            })
          }
          if (res.cancel) {

          }
        }
      })
    } else {
      wx.showModal({
        title: "提示",
        content: "客官,您还没登录呢!?",
        confirmText: "马上登录",
        cancelText: "就不登录",
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../../pages/index/index'
            })
          }
          if (res.cancel) {

          }
        }
      })
    }

  },

  gopay:function () {

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
  confirm: function (e) {
    
    this.setData({

      hiddenmodalput: true

    })

  },
 

  /**
   * 页面的初始数据
   */
  data: {
    xiangq:null,

    hiddenmodalput: true,

    myname:null,
    myphone:null,
    myaddress:null,
    mytime:null,
  },

  //确认
  confirm: function (e) {
    if (this.data.myname != null && this.data.myaddress != null && this.data.mytime != null && this.data.myphone != null ){

      wx.showToast({

        title: '购买成功!',
        icon: 'success',
        duration: 2000//持续的时间
      })
      this.setData({
        hiddenmodalput: true
      })
    }else{
      wx.showToast({

        title: '请输入完整信息',
        icon: 'none',
        duration: 2000//持续的时间

      })
    }
   

  },
  name:function(e){
    this.setData({
      myname:e.detail.value
    })
    console.log(this.data.myname)
  },
  phone: function (e) {
    this.setData({
      myphone: e.detail.value
    })
    console.log(this.data.myphone)
  },
  address: function (e) {
    this.setData({
      myaddress: e.detail.value
    })
    console.log(this.data.myaddress)
  },
  time: function (e) {
    this.setData({
      mytime: e.detail.value
    })
    console.log(this.data.mytime)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var x=options.id
    console.log(x)
    wx.request({
      url: "http://localhost:8888/xiangq.do",
      method: "get",
      data: {
        id:x,
      },
      header: {
        "Content-Type": "json"
      },
      success: (res) => {
        this.setData({
          xiangq: res.data
        })
      }
    });
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