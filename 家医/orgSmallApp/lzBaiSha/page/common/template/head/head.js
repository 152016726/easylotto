var temp = {
  //扫码
  scaneTap: function () {
    console.log(123)
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
}
export default temp