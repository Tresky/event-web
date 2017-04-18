angular.module('app')
  .factory('Rso', ($q, $http, ServerUrls, _) => {
    function baseUrl(uniId) {
        return ServerUrls.current.nodeApi + `university/${uniId}/rso`
    }

    let Rso = (initData) => {
      let rso = {}
      angular.extend(rso, initData)

      // Instance Methods
      return rso
    }

    // Class Methods
    let mRso = {

      findAll (uniId, params) {
        return $http.get(baseUrl(uniId), params)
          .then((rso) => {
            return _.map(rso.data, (i) => {
              return new Rso(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (uniId, id) {
        return $http.get(baseUrl(uniId) + '/' + id)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new Rso
      create (uniId, data) {
        return $http.post(baseUrl(uniId), data)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (uniId, params) {
        return $http.put(baseUrl(uniId) + '/' + params.id, params)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (uniId, id) {
        return $http.delete(baseUrl(uniId) + '/' + id)
          .then((rso) => {
            return new Rso(rso.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mRso
  })
