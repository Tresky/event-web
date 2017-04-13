angular.module('app')
  .factory('Comment', ($q, $http, ServerUrls, _) => {
    function baseUrl(uniId, eventId) {
        return ServerUrls.current.nodeApi + `university/${uniId}/event/${eventId}`
    }

    let Comment = (initData) => {
      let comment = {}
      angular.extend(comment, initData)

      // Instance Methods
      return comment
    }

    // Class Methods
    let mComment = {

      findAll (uniId, eventId, params) {
        return $http.get(baseUrl(uniId, eventId), params)
          .then((comment) => {
            return _.map(comment.data, (i) => {
              return new Comment(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (uniId, eventId, id) {
        return $http.get(baseUrl(uniId, eventId) + '/' + id)
          .then((comment) => {
            return new Comment(comment.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new Rso
      create (uniId, eventId, data) {
        return $http.post(baseUrl(uniId, eventId), data)
          .then((comment) => {
            return new Comment(comment.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (uniId, eventId, params) {
        return $http.put(baseUrl(uniId, eventId) + '/' + params.id, params)
          .then((comment) => {
            return new Comment(comment.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (uniId, eventId, id) {
        return $http.delete(baseUrl(uniId, eventId) + '/' + id)
          .then((comment) => {
            return new Comment(comment.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mComment
  })
