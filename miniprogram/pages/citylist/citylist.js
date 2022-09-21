// pages/citylist/citylist.js
const map =require('../../libs/map')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  cityname:'未选择',
  map:map,
  letter:''
  },
  tapLetter(event){
  let i =event.target.dataset.i
  this.setData({
    letter:i
  })
  },
  tapCity(event){
    let c = event.target.dataset.c
   getApp().globalData.cityname =c
   console.log('c',c)
  wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let QQmapWX =require('../../libs/qqmap-wx-jssdk')
    let qqmapsdk =new QQmapWX({
      key:'DY2BZ-NKTLI-6P4GC-5TJEC-5X7OF-KXB2F'
    })
    qqmapsdk.reverseGeocoder({
      success:res=>{
        console.log('获取的位置信息',res)
        let cityname =res.result.address_component.city
        this.setData({cityname})
      } ,
    })
    console.log('map',map)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})