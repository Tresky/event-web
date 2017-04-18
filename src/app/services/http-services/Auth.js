angular.module('app')
  .factory('Auth', ($q, $http, ServerUrls, _) => {
    let baseUrl = ServerUrls.current.nodeApi + 'auth'

    let Auth = (initData) => {
      let auth = {}
      angular.extend(auth, initData)

      // Instance Methods
      return auth
    }

    // Class Methods
    let mAuth = {
      // Creates a new Rso
      signup (data) {
        return $http.post(baseUrl + '/signup', data)
          .then((res) => {
            return new Auth(res.data)
          }, (response) => {
            return $q.reject(response)
          })
      }
    }

    return mAuth
  })
