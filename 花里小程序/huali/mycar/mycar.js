// huali/mycar/mycar.js

const app = getApp();
Page({


gopay:function(){
  wx.switchTab({
    url: '../huali/huali'
  })
},
  gopay1: function () {
    if(this.data.xid.length>0){
      this.setData({
        hiddenmodalput: !this.data.hiddenmodalput
      })
    } else if (this.data.xid.length < 1){
      wx.showToast({

        title: '请选择商品!',
        icon: 'none',
        duration: 2000//持续的时间
      })
    }
    

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
// 删除购物车
  delete: function() {
    var that = this;
   
    if (this.data.xid.length > 0) {
      wx.showModal({
        title: "提示",
        content: "真的要删除吗?",
        confirmText: "残忍删除",
        cancelText: "我点错了",
        success: function(res) {
          if (res.confirm) {
            that.setData({
              money : 0
            })
           
            wx.request({
              url: "http://localhost:8888/deletecar.do",
              method: "get",
              data: {
                dele:that.data.xid,
              },
              header: {
                "Content-Type": "json"
              },
              success: (res) => {
                that.setData({
                  money: 0
                })
              
              }
            });
            that.setData({
              xid:[],
              checked:false
            })
            wx.showToast({

              title: '删除成功!',
              icon: 'success',
              duration: 2000//持续的时间
            })
            that.onLoad();
          }
          if (res.cancel) {

          }
        }
      })
    } else {

    }


  },
  donw: function(e) {
    
    if (e.detail.value[0] == e.currentTarget.dataset.id) {
      this.data.xid.push(e.detail.value[0])
      console.log(e.detail.value[0])
      console.log(this.data.xid)
      this.setData({
        money: this.data.money + e.currentTarget.dataset.price
      })
    } else if (e.detail.value[0] == undefined) {
      console.log(e.currentTarget.dataset.id)
      let y = (e.currentTarget.dataset.id).toString();
      this.data.xid.splice(this.data.xid.indexOf(y), 1)
      console.log(this.data.xid)

      this.setData({
        money: this.data.money - e.currentTarget.dataset.price

      })
    }

  },
  /**
   * 页面的初始数据
   */
  data: {
    cararr: [],
    num: 0,
    checked: false,
    money: 0,
    deletenow: null,
    hiddenmodalput: true,
    xid:[],
    myname: null,
    myphone: null,
    myaddress: null,
    mytime: null,
    checked: false,//删除后把所有的变为不选中

  },
  confirm: function (e) {
    if (this.data.myname != null && this.data.myaddress != null && this.data.mytime != null && this.data.myphone != null) {

      wx.showToast({

        title: '购买成功!',
        icon: 'success',
        duration: 2000//持续的时间
      })
      this.setData({
        hiddenmodalput: true
      })
    } else {
      wx.showToast({

        title: '请输入完整信息',
        icon: 'none',
        duration: 2000//持续的时间

      })
    }


  },
  name: function (e) {
    this.setData({
      myname: e.detail.value
    })
   
  },
  phone: function (e) {
    this.setData({
      myphone: e.detail.value
    })
  
  },
  address: function (e) {
    this.setData({
      myaddress: e.detail.value
    })
 
  },
  time: function (e) {
    this.setData({
      mytime: e.detail.value
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ll = app.globalData.userInfo
    if(ll!=null){
      wx.request({
        url: "http://localhost:8888/mycar.do",
        method: "get",
        data: {
          name:ll.nickName,
        },
        header: {
          "Content-Type": "json"
        },
        success: (res) => {

          this.setData({
            cararr: res.data,
          })
        }
      });
    }else{
      wx.showModal({
        title: "提示",
        content: "客官您还没登录呢!",
        confirmText: "马上登录",
        cancelText: "不买了",
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
    this.onLoad()
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