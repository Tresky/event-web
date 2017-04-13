angular.module('app')
  .factory('Subscription', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'subscription'

    let Subscription = (initData) => {
      let sub = {}
      angular.extend(sub, initData)

      // Instance Methods
      return sub
    }

    // Class Methods
    let mSubscription = {

      findAll (params) {
        return $http.get(baseUrl, params)
          .then((sub) => {
            return _.map(sub.data, (i) => {
              return new Subscription(i)
            })
          }, (response) => {
            return $q.reject(response)
          })
      },

      findById (id) {
        return $http.get(baseUrl + '/' + id)
          .then((sub) => {
            return new Subscription(sub.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      // Creates a new Membership
      create (data) {
        return $http.post(baseUrl, data)
          .then((sub) => {
            return new Subscription(sub.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      update (params) {
        return $http.put(baseUrl + '/' + params.id, params)
          .then((sub) => {
            return new Subscription(sub.data)
          }, (response) => {
            return $q.reject(response)
          })
      },

      destroy (id) {
        return $http.delete(baseUrl + '/' + id)
          .then((sub) => {
            return new Subscription(sub.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mSubscription
  })
