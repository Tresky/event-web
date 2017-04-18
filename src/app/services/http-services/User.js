angular.module('app')
  .factory('User', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'user'

    let User = (initData) => {
      let user = {}
      angular.extend(user, initData)

      // Instance Methods
      return user
    }

    // Class Methods
    let Users = {

      findAll (params) {
        return $http.get(baseUrl, params)
          .then((user) => {
            return _.map(user.data, (i) => {
              return new User(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (id) {
        return $http.get(baseUrl + '/' + id)
          .then((user) => {
            return new User(user.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new User
      create (data) {
        return $http.post(baseUrl, data)
          .then((user) => {
            return new User(user.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (params) {
        return $http.put(baseUrl + '/' + params.id, params)
          .then((user) => {
            return new User(user.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (id) {
        return $http.delete(baseUrl + '/' + id)
          .then((user) => {
            return new User(user.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return Users
  })
