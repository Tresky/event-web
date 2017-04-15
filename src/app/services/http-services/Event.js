angular.module('app')
  .factory('Event', ($q, $http, ServerUrls, _) => {
    function baseUrl(uniId) {
        return ServerUrls.current.nodeApi + `university/${uniId}/event`
    }

    let Event = (initData) => {
      let event = {}
      angular.extend(event, initData)

      // Instance Methods
      return event
    }

    // Class Methods
    let mEvent = {

      findAll (uniId, params) {
        let payload = {
          params: params
        }

        return $http.get(baseUrl(uniId), payload)
          .then((event) => {
            return _.map(event.data, (i) => {
              return new Event(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (uniId, id) {
        return $http.get(baseUrl(uniId) + '/' + id)
          .then((event) => {
            return new Event(event.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new Rso
      create (uniId, data) {
        return $http.post(baseUrl(uniId), data)
          .then((event) => {
            return new Event(event.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (uniId, params) {
        return $http.put(baseUrl(uniId) + '/' + params.id, params)
          .then((event) => {
            return new Event(event.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (uniId, id) {
        return $http.delete(baseUrl(uniId) + '/' + id)
          .then((event) => {
            return new Event(event.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mEvent
  })
