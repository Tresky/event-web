angular.module('app')
  .factory('Rso', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'rso'

    let Rso = (initData) => {
      let rso = {}
      angular.extend(rso, initData)

      // Instance Methods
      return rso
    }

    // Class Methods
    let mRso = {

      findAll (params) {
        return $http.get(baseUrl, params)
          .then((rso) => {
            return _.map(rso.data, (i) => {
              return new Rso(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (id) {
        return $http.get(baseUrl + '/' + id)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new Rso
      create (data) {
        return $http.post(baseUrl, data)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (params) {
        return $http.put(baseUrl + '/' + params.id, params)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (id) {
        return $http.delete(baseUrl + '/' + id)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mRso
  })
