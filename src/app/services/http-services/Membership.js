angular.module('app')
  .factory('Membership', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'membership'

    let Membership = (initData) => {
      let mem = {}
      angular.extend(mem, initData)

      // Instance Methods
      return mem
    }

    // Class Methods
    let Memberships = {

      findAll (params) {
        return $http.get(baseUrl, params)
          .then((mem) => {
            return _.map(mem.data, (i) => {
              return new Membership(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (id) {
        return $http.get(baseUrl + '/' + id)
          .then((mem) => {
            return new Membership(mem.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new Membership
      create (data) {
        return $http.post(baseUrl, data)
          .then((mem) => {
            return new Membership(mem.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (params) {
        return $http.put(baseUrl + '/' + params.id, params)
          .then((mem) => {
            return new Membership(mem.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (id) {
        return $http.delete(baseUrl + '/' + id)
          .then((mem) => {
            return new Membership(mem.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return Memberships
  })
