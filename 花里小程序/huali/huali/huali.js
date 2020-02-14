// huali/huali.js
const app = getApp();
Page({
  // 轮播
  lunbo: function(e) {
    var d = e.currentTarget.dataset.id;
   
    wx.navigateTo({
      url: '../xiangq/xiangq?id=' + d
    })
  },
  pay: function(e) {
    var id = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    var name = e.currentTarget.dataset.name;
  },
  addgwc: function(e) {
    var ll = app.globalData.userInfo;
    let name = e.currentTarget.dataset.name;
    let src = e.currentTarget.dataset.src;
    let lei = e.currentTarget.dataset.lei;
    let price = e.currentTarget.dataset.price;
   
    
    
    if (ll != null) {
      let nickname = ll.nickName;
      wx.showModal({
        title: "提示",
        content: "是否添加进购物车?",
        confirmText: "确认添加",
        cancelText: "我点错了",
        success: function(res) {
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
        success: function(res) {
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

  newprot: function() {
    wx.navigateTo({
      url: '../prot/prot?id=' + 1
    })
  },
  meigui: function() {
    wx.navigateTo({
      url: '../prot/prot?id=' + 2
    })
  },
  home: function() {
    wx.navigateTo({
      url: '../prot/prot?id=' + 3
    })
  },
  zhufu: function() {

    wx.navigateTo({
      url: '../prot/prot?id=' + 4
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    lunbo: [],
    shengdan: null,
    hot: null,
    qizhi: null,
    showModalStatus: false,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.request({
      url: "http://localhost:8888/lunbo.do",
      method: "get",
      data: {
        id: "4"
      },
      header: {
        "Content-Type": "json"
      },
      success: (res) => {

        this.setData({
          lunbo: res.data
        })
      }
    });
    wx.request({
      url: "http://localhost:8888/qizhi.do",
      method: "get",
      data: {
        id: "2"
      },
      header: {
        "Content-Type": "json"
      },
      success: (res) => {

        this.setData({
          qizhi: res.data
        })
      }
    });
    wx.request({
      url: "http://localhost:8888/shengdan.do",
      method: "get",
      data: {
        id: "1"
      },
      header: {
        "Content-Type": "json"
      },
      success: (res) => {

        this.setData({
          shengdan: res.data
        })
      }
    });
    wx.request({
      url: "http://localhost:8888/hot.do",
      method: "get",
      data: {
        id: "3"
      },
      header: {
        "Content-Type": "json"
      },
      success: (res) => {

        this.setData({
          hot: res.data
        })
      }
    });

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