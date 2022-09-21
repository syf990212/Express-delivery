// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id:'1',
   movie:[],
   isOpen:false,
   comcom:[]
  },
  // 点击展开电影简介
  tapline(){
    this.setData({
      isOpen: !this.data.isOpen
    })
  },
  // 点击剧照图片，可用全屏预览
  tapImage(event){
    let i =event.target.dataset.i
    let thumb =this.data.movie.thumb
    let urls=[]
    if(i==undefined){
      return
    }
    thumb.forEach(item=>{
      urls.push(item.split('@')[0])
      // console.log(urls)
    })
    wx.previewImage({
      urls,
      current:urls[i]
    })
  },
  // 点击评论，添加isOpen属性
  tapComment(event){
   let i =event.target.dataset.i
  this.data.comcom[i].isOpen =!this.data.comcom[i].isOpen
  this.setData({comcom:this.data.comcom})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id =options.id
   wx.request({
     url: `https://api.tedu.cn/detail.php?id=${id}`,
     method:'GET',
     data:{id:id},
     success:res=>{
       console.log('电影信息',res)
       this.setData({movie:res.data})
     }
   })
   let db=wx.cloud.database()
   db.collection('comcom').limit(4).get().then(res=>{
     console.log('查询结果',res)
     this.setData({
       comcom:res.data
     })
     }).catch(err=>{
      console.warn('查询评论失败',err)
   }
    )
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