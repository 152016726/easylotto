const app = getApp()
function selectAddress(that,e) {
  //选择地址
  var _this = that;
  var region = _this.data.region;
  var cityRegion = _this.data.cityRegion;
  var areaRegion = _this.data.areaRegion;
  var addressIndex = _this.data.addressIndex;
  var province = {
    name: _this.data.addressArray[0][e.detail.value]
  };
  var city = {
    name: _this.data.addressArray[1][e.detail.value]
  };
  var area = {
    name: _this.data.addressArray[2][e.detail.value]
  };
  if (e.detail.column == 0) {
    addressIndex = [e.detail.value, 0, 0];
    if (e.detail.value !== 0) {
      for (var i = 0, len = region.length; i < len; i++) {
        if (province.name == region[i]['Name']) {
          province.id = region[i]['Id'];
          _this.setData({
            province: province
          })
          var cities = ['--市--'];
          cityRegion = checkCity(region[i]['Id'], region);
          for (var i = 0, len = cityRegion.length; i < len; i++) {
            cities.push(cityRegion[i].Name);
          }
          if (cityRegion.length > 0) {
            _this.setData({
              city: {
                name: '--市--',
                id: ''
              },
              area: {
                name: '--区--',
                id: ''
              }
            })
          } else {
            _this.setData({
              city: {},
              area: {}
            })
          }
          _this.setData({
            cities: cities,
            addressArray: [_this.data.provinces, cities, ['--区--']],
            cityRegion: cityRegion
          })
        }
      }
    } else {
      _this.setData({
        province: {
          name: '--省--',
          id: ''
        },
        city: {
          name: '--市--',
          id: ''
        },
        area: {
          name: '--区--',
          id: ''
        }
      })
    }
  } else if (e.detail.column == 1) {
    addressIndex[1] = e.detail.value;
    addressIndex[2] = 0;
    if (e.detail.value !== 0) {
      for (var i = 0, len = cityRegion.length; i < len; i++) {
        if (city.name == cityRegion[i]['Name']) {
          city.id = cityRegion[i]['Id'];
          _this.setData({
            city: city
          })
          var areas = ['--区--'];
          areaRegion = checkArea(cityRegion[i]['Id'], cityRegion);
          for (var i = 0, len = areaRegion.length; i < len; i++) {
            areas.push(areaRegion[i].Name);
          }
          _this.setData({
            areas: areas,
            addressArray: [_this.data.provinces, _this.data.cities, areas],
            areaRegion: areaRegion,
            area: {
              name: '--区--',
              id: ''
            }
          })
        }
      }
    } else {
      _this.setData({
        city: {
          name: '--市--',
          id: ''
        },
        area: {
          name: '--区--',
          id: ''
        }
      })
    }
  } else {
    addressIndex[2] = e.detail.value;
    if (e.detail.value !== 0) {
      for (var i = 0, len = areaRegion.length; i < len; i++) {
        if (area.name == areaRegion[i]['Name']) {
          area.id = areaRegion[i]['Id'];
          _this.setData({
            area: area
          })
        }
      }
    } else {
      _this.setData({
        area: {
          name: '--区--',
          id: ''
        }
      })
    }
  }
  _this.setData({
    addressIndex: addressIndex,
  })
}
//获取省市区
function getRegion(that,obj) {
  var _this = that;
  app.request({
    url: '/address/getCityTree',
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {
      if (res.code == 1) {
        var region = res.data;
        var provinces = ['--省--'];
        for (var i = 0, len = region.length; i < len; i++) {
          provinces.push(region[i].Name);
        }
        _this.setData({
          provinces: provinces,
          addressArray: [provinces, ['--市--'], ['--区--']],
          region: region
        })
        //初始化
        if (_this.data.userInfo.id) {
          var cityregion, arearegion;
          var provinId = obj.provinceId;
          var cityId = obj.cityId;
          var areaId = obj.districtId;
          var cities = ['--市--'];
          var areas = ['--区--'];
          var addressIndex = [0, 0, 0];
          for (var i = 0, len = region.length; i < len; i++) {
            if (provinId == region[i].Id) {
              cityregion = region[i].cities;
              addressIndex[0] = i + 1;
              _this.setData({
                province: {
                  name: region[i].Name,
                  id: region[i].Id
                },
                cityRegion: cityregion
              })
              for (var i = 0, len = cityregion.length; i < len; i++) {
                cities.push(cityregion[i].Name);
                if (cityId == cityregion[i].Id) {
                  arearegion = cityregion[i].areas;
                  addressIndex[1] = i + 1;
                  _this.setData({
                    city: {
                      name: cityregion[i].Name,
                      id: cityregion[i].Id
                    },
                    areaRegion: arearegion
                  })
                  for (var i = 0, len = arearegion.length; i < len; i++) {
                    areas.push(arearegion[i].Name);
                    if (areaId == arearegion[i].Id) {
                      addressIndex[2] = i + 1;
                      _this.setData({
                        area: {
                          name: arearegion[i].Name,
                          id: arearegion[i].Id
                        }
                      })
                    }
                  }
                }
              }
            }
          }
          _this.setData({
            addressIndex: addressIndex,
            cities: cities,
            areas: areas,
            addressArray: [provinces, cities, areas],
          })
          if (cityId == '-1') {
            _this.setData({
              city: {}
            })
          }
          if (areaId == '-1') {
            _this.setData({
              area: {}
            })
          }
        }

      }
    }
  })
}
//查询城市
function checkCity(provinceId, provinceArr) {
  for (var i = 0, len = provinceArr.length; i < len; i++) {
    if (provinceId == provinceArr[i]['Id']) {
      return provinceArr[i]['cities']
    }
  }
}
//查询区域
function checkArea(cityId, cityArr) {
  for (var i = 0, len = cityArr.length; i < len; i++) {
    if (cityId == cityArr[i]['Id']) {
      return cityArr[i]['areas']
    }
  }
}
module.exports = {
  selectAddress: selectAddress,
  getRegion: getRegion
}