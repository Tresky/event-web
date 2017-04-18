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
  .factory('Service', ['$log', '_', ($log, _) => {
    var S = {}

    var isJoined = false

    S.toggleJoined = () => {
      isJoined = !isJoined
    }

    S.isJoined = () => {
      return isJoined
    }

    return S
  }])
