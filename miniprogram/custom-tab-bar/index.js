Component({
  data: {
    selected: 0,
    color: "#242424",
    selectedColor: "#D2691E",
    list: [{
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/tabbar/index-0.png",
        selectedIconPath: "/images/tabbar/index-1.png"
      },
      {
        pagePath: "/pages/square/square",
        text: "广场",
        iconPath: "/images/tabbar/square-0.png",
        selectedIconPath: "/images/tabbar/square-1.png"
      },
      {
        pagePath: "/pages/publish/publish",
        text: "发布",
        iconPath: "/images/tabbar/add-0.png",
        selectedIconPath: "/images/tabbar/add-1.png"
      },
      {
        pagePath: "/pages/my/my",
        text: "我的",
        iconPath: "/images/tabbar/my-0.png",
        selectedIconPath: "/images/tabbar/my-1.png"
      }]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({
        url
      })
    }
  }
})