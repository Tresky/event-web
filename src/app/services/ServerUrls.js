/**
 * File: ServerUrls.js
 * Type: ngFactory
 * Author: Tyler Petresky
 * Description: A server that allows will auto-detect
 * the current development environment and attempt to
 * set the appropriate API base URL for the node server.
 * This server should be injected into all HTTP Services.
 */

angular.module('app')
  .factory('ServerUrls', ['$log', '$location', '_', ($log, $location, _) => {
    var baseLocalUrl = 'http://localhost'
    var ServerUrls = {}

    // In the future we can add in a staging and production server
    // configuration should we see fit.
    ServerUrls.servers = [
      {
        name: 'local',
        match: ['localhost', '127.0.0.1', '192.168'],
        nodeApi: baseLocalUrl + ':3000/api/',
        selected: false
      }
    ]

    ServerUrls.current = {}

    ServerUrls.changeServer = (idx) => {
      if (angular.isDefined(ServerUrls.selectedServer)) {
        ServerUrls.servers[ServerUrls.selectedServer].selected = false
      }

      ServerUrls.selectedServer = idx

      ServerUrls.servers[idx].selected = true
      ServerUrls.current = ServerUrls.servers[idx]
    }

    ServerUrls.isRelevantServer = () => {
      return _.includes(ServerUrls.current.match, $location.host())
    }

    ServerUrls.getRelevantServer = () => {
      var hostname = $location.host()
      var idx = _.findIndex(ServerUrls.servers, (srv) => {
        return _.includes(srv.match, hostname)
      })

      if (idx >= 0) {
        return ServerUrls.servers[idx]
      } else {
        return undefined
      }
    }

    ServerUrls.setRelevantServer = () => {
      var idx = _.findIndex(ServerUrls.servers, (srv) => {
        return _.includes(srv.match, $location.host())
      })

      if (angular.isUndefined(idx) || idx < 0) {
        ServerUrls.changeServer(0)
        return 0
      } else {
        ServerUrls.changeServer(idx)
        return idx
      }
    }

    ServerUrls.setRelevantServer()

    return ServerUrls
  }])
