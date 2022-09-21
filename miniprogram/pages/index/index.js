// index.js
// const app = getApp()


Page({
  data: {
    cid: '1',
    movies: [],
    cityname:'未选择',
  },
  // 导航条切换，渲染列表
  tapNav(event) {
    let cid = event.target.dataset.id
    this.setData({
      cid
    }) 
    //查询是否已加载好数据
    wx.getStorage({
      key:cid,
      success:res=>{
        console.log('查询数据成功',res)
        this.setData({movies:res.data})
      },
      fail:err=>{
        this.loadMovies(cid, 0).then(data => {
          this.setData({
            movies: data
          })
          wx.setStorage({
            key:cid,
            data:data,
            success:suc=>{
            console.log('成功存入缓存',suc)
            }
          })
        }) 
      }
    })
  
    //渲染到页面
    
    // wx.request({
    //   url:'https://api.tedu.cn/index.php',
    //   methods:'GET',
    //   data:{cid:cid,offset:0},
    //   success:res=>{
    //   this.setData({
    //     movies:res.data
    //   })
    //   }
    // })
  },
  // 开启下拉刷新功能,再次请求数据，更新数据显示到页面
  onPullDownRefresh(){
  this.loadMovies(this.data.cid,0).then(movies=>{
    this.setData({movies})
    wx.setStorage({
      key:this.data.cid,
      data:movies
    })
    // 取消下拉刷新的动画
    wx.stopPullDownRefresh()
  })
  },
  // 实现列表的触底加载下一页
  onReachBottom(event) {
    let cid = this.data.cid
    let offset = this.data.movies.length
    this.loadMovies(cid, offset).then(data => {
      this.setData({
        movies: this.data.movies.concat(data)
      })
    })
    //  wx.request({
    //   url:'https://api.tedu.cn/index.php',
    //   methods:'GET',
    //   data:{cid:cid,offset:offset},
    //   success:res=>{
    //     this.setData({
    //       movies:this.data.movies.concat(res.data)})
    //     console.log('更新列表',res)
    //   }
    //  })
  },
  //点击左上角城市 加载位置信息
  getLocCity(){
    let QQmapWX =require('../../libs/qqmap-wx-jssdk')
    let qqmapsdk =new QQmapWX({
      key:'DY2BZ-NKTLI-6P4GC-5TJEC-5X7OF-KXB2F'
    })
    qqmapsdk.reverseGeocoder({
     success:res=>{
       console.log('获取的位置信息',res)
       let cityname =res.result.address_component.city
       this.setData({cityname})
       getApp().globalData.cityname=cityname
     } ,
     fail:err=>{
       console.log('获取位置信息失败',err)
     }
    })
  },
  //异步封装网络请求
  loadMovies(cid, offset) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://api.tedu.cn/index.php',
        data: {
          cid: cid,
          offset: offset
        },
        success: res => {
          let movies = res.data
          resolve(movies)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  onLoad() {
    this.loadMovies(1, 0).then(data => {
      this.setData({
        movies: data
      })
    }).catch(err => {
      console.log(err)
    })
    this.getLocCity()
    // wx.request({
    //   url:'https://api.tedu.cn/index.php',
    //   methods:'GET',
    //   data:{cid:1,offset:0},
    //  success:res=>{
    //    console.log('电影列表',res)
    //    this.setData({
    //       movies:res.data
    //    })
    //  }
    // })
  },
  onShow(){
    let cityname =getApp().globalData.cityname
    this.setData({cityname})
  }

});