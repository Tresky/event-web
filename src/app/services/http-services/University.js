angular.module('app')
  .factory('University', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'university'

    let University = (initData) => {
      let uni = {}
      angular.extend(uni, initData)

      // Instance Methods
      return uni
    }

    // Class Methods
    let Universities = {

      findAll (params) {
        return $http.put(baseUrl, params)
          .then((uni) => {
            return _.map(uni.data, (i) => {
              return new University(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (id) {
        return $http.put(baseUrl + '/' + id)
          .then((uni) => {
            return new University(uni.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new University
      create (data) {
        return $http.post(baseUrl, data)
          .then((uni) => {
            return new University(uni.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (params) {
        return $http.put(baseUrl + '/' + params.id, params)
          .then((uni) => {
            return new University(uni.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (id) {
        return $http.delete(baseUrl + '/' + id)
          .then((uni) => {
            return new University(uni.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return Universities
  })
