angular.module('app')
  .factory('RssToJson', ($q, $http, ServerUrls, _) => {
    let baseUrl = 'https://api.rss2json.com/v1/api.json'

    let RssToJson = (initData) => {
      let rss = {}
      angular.extend(rss, initData)

      // Instance Methods
      return rss
    }

    // Class Methods
    let mRss = {
      // Convert rss to json
      convert (url) {
        let payload = {
          params: {
            rss_url: url
          }
        }
        return $http.get(baseUrl, payload)
          .then((res) => {
            return new RssToJson(res.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mRss
  })
