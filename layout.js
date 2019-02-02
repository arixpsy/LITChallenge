/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
(function() {
  "use strict";

  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    queryInput.addEventListener("keydown", queryInputKeyDown);
    setAccessToken();
    intialchat();
  }

  function intialchat(){

    var value = "hello";

    var responseNode = createResponseNode();

    sendText(value)
      .then(function(response) {
        var result;
        try {
          result = response.result.fulfillment.speech
        } catch(error) {
          result = "";
        }
        setResponseOnNode(result, responseNode);
        document.getElementById("result").scrollTop = document.getElementById("result").scrollHeight;
      })
      .catch(function(err) {
        setResponseOnNode("Something goes wrong", responseNode);
        document.getElementById("result").scrollTop = document.getElementById("result").scrollHeight;
      });

  }
  function setAccessToken() {
    window.init("e94874882f4b4eaeaf064bbd7769b77c");
    //window.init(accessTokenInput.value);
  }

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }

    var value = queryInput.value;
    queryInput.value = "";

    createQueryNode(value);
    document.getElementById("result").scrollTop = document.getElementById("result").scrollHeight;
    var responseNode = createResponseNode();

    sendText(value)
      .then(function(response) {
        var result;
        try {
          result = response.result.fulfillment.speech
        } catch(error) {
          result = "";
        }
        setResponseJSON(response);
        setResponseOnNode(result, responseNode);
        document.getElementById("result").scrollTop = document.getElementById("result").scrollHeight;
      })
      .catch(function(err) {
        setResponseJSON(err);
        setResponseOnNode("Something goes wrong", responseNode);
        document.getElementById("result").scrollTop = document.getElementById("result").scrollHeight;
      });
  }

  function createQueryNode(query) {
    var node = document.createElement('div');
    node.className = "own-text";
    node.innerHTML = query;
    resultDiv.appendChild(node);
  }

  function createResponseNode() {
    var node = document.createElement('div');
    node.className = "reply-text";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;

  }

  function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);

  }

  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

  function sendRequest() {

  }

})();
