// huali/prot/prot.js
const app = getApp();
Page({



gwc:function(){
  wx.switchTab({
    url: '../mycar/mycar'
  })
},
  addcar: function (e) {
    var ll = app.globalData.userInfo;
    let name = e.currentTarget.dataset.name;
    let src = e.currentTarget.dataset.src;
    let lei = e.currentTarget.dataset.lei;
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
                lei: lei,
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
  
  /**
   * 页面的初始数据
   */
  data: {
    protarr: null,
    list:"2222"
  },

asd:function (){
  console.log(this)
},
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad:function (options) {
    wx.request({
      url: "http://localhost:8888/protarr.do",
      method: "get",
      data: {
        id: options.id
      },
      header: {
        "Content-Type": "json"
      },
      success: (res) => {
     
        this.setData({
          list:"1111",
          protarr:res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})