'use strict';


var customerApp = angular.module('customerApp',['ngRoute'])


  .controller('CustomerListCtrl', function($scope, $http, $route, $routeParams) {

  $scope.data;
  $scope.query = "";
  $scope.selected = null;
  $scope.letterSearchFlag = false;
  $scope.noMatchFlag = true;
  $scope.letterMatchedCustomers = [];
  $scope.apps = [];
  $scope.welcome_number = Math.ceil(Math.random() * 7);

  var req = {
    method: 'POST',
    url: 'http://asa.gausian.com',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: $.param({user_app_id:'app_id', service_app_name:'Customer', request_string: "get"})
  };

  $http(req).success(function(data) {
    // console.log('done');
    // console.log(data.response);
    $scope.customers = angular.fromJson(data.response);
    console.log($scope.customers);
    for(var i=0; i<$scope.customers.length; i++){
      var customer = $scope.customers[i];
      if(customer.id === $scope.userId){
        $scope.showInfo(customer);
      }
    }
  });

  $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
    $scope.userId = ($routeParams.userId || '');
    if($scope.customers != null){
      for(var i=0; i<$scope.customers.length; i++){
        var customer = $scope.customers[i];
        if(customer.id === $scope.userId){
          $scope.showInfo(customer);
        }
      }
    }
  });


  $scope.showInfo = function(customer) {
    $scope.letterSearchFlag = false;
    $scope.customer=customer;
    $scope.query="";
    $("#welcome").hide();
    $("#editForm").hide();
    $("#newForm").hide();
    $("#noSearchResult").hide();
    $("#noLetterResult").hide();
    $("#customerInformation").fadeIn();
    $scope.selected = customer.id;
  }

  $scope.searchLetter = function(letter) {
    $("#welcome").hide();
    $("#noSearchResult").hide();
    $("#noLetterResult").hide();
    $("#editForm").hide();
    $("#newForm").hide();
    $("#customerInformation").hide();
    $scope.selected = null;
    $scope.query = "";
    $scope.letterMatchedCustomers = [];
    var j=0;
    for(var i=0; i<$scope.customers.length; i++){
      var customer = $scope.customers[i];
      if(customer.first[0] === letter || customer.last[0] === letter ){
        $scope.letterMatchedCustomers[j++] = customer;
      }
    }
    // if no matching result, raise flag and show all customers in list
    if($scope.letterMatchedCustomers.length === 0) {
      $scope.noMatchFlag = true;
      $scope.letterMatchedCustomers = [];
      $scope.letterMatchedCustomers = $scope.customers;
      $("#noLetterResult").fadeIn();
    }
    else {
      $scope.noMatchFlag = false;
    }
    // display Letter Filted Results
    $scope.current_letter = letter;
    $scope.letterSearchFlag = true;
  }

  $scope.changeSearch = function() {
    // disable letter search when search box is input
    $scope.letterSearchFlag = false;
    // remove selected customer
    $scope.selected = null;
  }

  $scope.upDown_escape = function(keyEvent) {
    // if it is not letter filtering, up down the full customer list
    if ($scope.letterSearchFlag === false)
    {
      if (keyEvent.which === 38){
        // select the customer above
        if ($scope.selected !== null) {
          // get the number of selected customer by matching id
          for(var i=0; i<$scope.filtedCustomers.length; i++) {
            var customer = $scope.filtedCustomers[i];
            var current_number;
            if(customer.id === $scope.selected) {
              current_number = i;
            }
          }
          if(current_number > 0) {
            current_number = current_number - 1;
          }
          $scope.selected = $scope.filtedCustomers[current_number].id;
          $scope.customer = $scope.filtedCustomers[current_number];
        }
      }
      // select the customer behind
      if (keyEvent.which === 40) {
        // no customer selected before
        if ($scope.selected === null) {
          $scope.selected = $scope.filtedCustomers[0].id;
          $scope.customer = $scope.filtedCustomers[0];
          $("#welcome").hide();
          $("#editForm").hide();
          $("#newForm").hide();
          $("#noSearchResult").hide();
          $("#noLetterResult").hide();
          $("#customerInformation").show();
        }
        // there is a selected customer before
        else{
          // get the number of selected customer by matching id
          for(var i=0; i<$scope.filtedCustomers.length; i++) {
            var customer = $scope.filtedCustomers[i];
            var current_number;
            if(customer.id === $scope.selected) {
              current_number = i;
            }
          }
          if(current_number<$scope.filtedCustomers.length) {
            current_number = current_number + 1;
          }
          $scope.selected = $scope.filtedCustomers[current_number].id;
          $scope.customer = $scope.filtedCustomers[current_number];
        }
      }
      // escape from selected customer
      if (keyEvent.which === 27) {
        $scope.selected = null;
        $scope.customer = null;
        $("#welcome").show();
        $("#editForm").hide();
        $("#newForm").hide();
        $("#noSearchResult").hide();
        $("#noLetterResult").hide();
        $("#customerInformation").hide();
      }
    }
    // else if it is filtering letter, up down the full customer list
    else if ($scope.letterSearchFlag === true) {
      if (keyEvent.which === 38){
        // select the customer above
        if ($scope.selected !== null) {
          // get the number of selected customer by matching id
          for(var i=0; i<$scope.letterMatchedCustomers.length; i++) {
            var customer = $scope.letterMatchedCustomers[i];
            var current_number;
            if(customer.id === $scope.selected) {
              current_number = i;
            }
          }
          if(current_number > 0) {
            current_number = current_number - 1;
          }
          $scope.selected = $scope.letterMatchedCustomers[current_number].id;
          $scope.customer = $scope.letterMatchedCustomers[current_number];
        }
      }
      // select the customer behind
      if (keyEvent.which === 40) {
        // no customer selected before
        if ($scope.selected === null) {
          $scope.selected = $scope.letterMatchedCustomers[0].id;
          $scope.customer = $scope.letterMatchedCustomers[0];
          $("#welcome").hide();
          $("#editForm").hide();
          $("#newForm").hide();
          $("#noSearchResult").hide();
          $("#noLetterResult").hide();
          $("#customerInformation").show();
        }
        // there is a selected customer before
        else{
          // get the number of selected customer by matching id
          for(var i=0; i<$scope.letterMatchedCustomers.length; i++) {
            var customer = $scope.letterMatchedCustomers[i];
            var current_number;
            if(customer.id === $scope.selected) {
              current_number = i;
            }
          }
          if(current_number<$scope.letterMatchedCustomers.length) {
            current_number = current_number + 1;
          }
          $scope.selected = $scope.letterMatchedCustomers[current_number].id;
          $scope.customer = $scope.letterMatchedCustomers[current_number];
        }
      }
      // escape from selected customer
      if (keyEvent.which === 27) {
        $scope.letterSearchFlag = false;
        $scope.selected = null;
        $scope.customer = null;
        $("#welcome").show();
        $("#editForm").hide();
        $("#newForm").hide();
        $("#noSearchResult").hide();
        $("#noLetterResult").hide();
        $("#customerInformation").hide();
      }      
    }
  }

  $scope.selectSearch = function(keyEvent) {
    // if enter is input in search box
    if (keyEvent.which === 13){
      // hide all pages
      $("#welcome").hide();
      $("#editForm").hide();
      $("#newForm").hide();
      $("#noSearchResult").hide();
      $("#noLetterResult").hide();
      $("#customerInformation").hide();
      // highlight the first filted search result
      if($scope.filtedCustomers.length > 0) {
        $scope.selected = $scope.filtedCustomers[0].id;
        $scope.customer = $scope.filtedCustomers[0];
        $("#customerInformation").show();
        $scope.noMatchFlag = false;
      }
      // no search result
      else {
        $("#noSearchResult").show();
        $scope.noMatchFlag = true;
      }
    }
    // if escape is input in search box
    if (keyEvent.which === 27){
      $scope.query = "";
      $(".search_input").blur();
      $("#noSearchResult").hide();
      $("#noLetterResult").hide();
      if ($scope.selected === null) {
        $("#welcome").show();
      }
    }
  }

  $scope.editForm = function() {
    $("#welcome").hide();
    $("#customerInformation").hide();
    $("#editForm").show();
    $("#newForm").hide();
    $scope.customerUpdate=angular.copy($scope.customer);
  };

  $scope.newForm = function() {
    $("#welcome").hide();
    $("#customerInformation").hide();
    $("#editForm").hide();
    $("#newForm").show();
    $("#noSearchResult").hide();
    $("#noLetterResult").hide();
    $scope.customerUpdate=null;
    $scope.selected = null;
  };

  $scope.clearInfo = function(customer) {
      $scope.customer=$scope.initial;
  }

  $scope.newCustomer = function() {
      var req = {
        method: 'POST',
        url: 'http://asa.gausian.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          user_app_id:'app_id', 
          service_app_name:'Customer',
          request_string: 
          'add first='+$scope.customerUpdate.first+
          ', last='+$scope.customerUpdate.last+
          ', email='+$scope.customerUpdate.email+
          ', company_name='+$scope.customerUpdate.company_name+
          ', department_name='+$scope.customerUpdate.department_name+
          ', work_phone='+$scope.customerUpdate.work_phone+
          ', mobile_phone='+$scope.customerUpdate.mobile_phone+
          ', shipment_address='+$scope.customerUpdate.shipment_address+
          ', shipment_city='+$scope.customerUpdate.shipment_city+
          ', shipment_state='+$scope.customerUpdate.shipment_state+
          ', shipment_zip='+$scope.customerUpdate.shipment_zip+
          ', shipment_country='+$scope.customerUpdate.shipment_country
        })
      }

      $http(req).success(function(data) {
        // get new customer id so it can be selected in blue color
        $scope.newcustomer = angular.fromJson(data.response);
        $scope.selected = $scope.newcustomer.id;
        // change current page info
        $scope.customer = angular.copy($scope.customerUpdate);
        // get all customers info again from ASA to sync JSON with server
        // can be changed to only sync the updated customer later
        var req = {
          method: 'POST',
          url: 'http://asa.gausian.com',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param({user_app_id:'app_id', service_app_name:'Customer', request_string: "get"})
        };
        $http(req).success(function(data) {
          // console.log('done');
          // console.log(data.response);
          $scope.customers = angular.fromJson(data.response);
          console.log($scope.customers);
          for(var i=0; i<$scope.customers.length; i++){
            var customer = $scope.customers[i];
            if(customer.id === $scope.userId){
              $scope.showInfo(customer);
            }
          }
        });
        // close new page, open info page
        $("#editForm").hide();
        $("#newForm").hide();
        $("#noSearchResult").hide();
        $("#noLetterResult").hide();
        $("#customerInformation").show();
      });
  };

  $scope.updateCustomer = function() {
      // send update request to ASA
      var req = {
        method: 'POST',
        url: 'http://asa.gausian.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({
          user_app_id:'app_id', 
          service_app_name:'Customer',
          request_string: 
          'update email='+$scope.customerUpdate.email+
          ', company_name='+$scope.customerUpdate.company_name+
          ', department_name='+$scope.customerUpdate.department_name+
          ', work_phone='+$scope.customerUpdate.work_phone+
          ', mobile_phone='+$scope.customerUpdate.mobile_phone+
          ', shipment_address='+$scope.customerUpdate.shipment_address+
          ', shipment_city='+$scope.customerUpdate.shipment_city+
          ', shipment_state='+$scope.customerUpdate.shipment_state+
          ', shipment_zip='+$scope.customerUpdate.shipment_zip+
          ', shipment_country='+$scope.customerUpdate.shipment_country+
          ' on id='+$scope.customerUpdate.id
        })
      }
      $http(req).success(function(data) {
        // change current page info
        $scope.customer = angular.copy($scope.customerUpdate);
        // get all customers info again from ASA to sync JSON with server
        // can be changed to only sync the updated customer later
        var req = {
          method: 'POST',
          url: 'http://asa.gausian.com',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $.param({user_app_id:'app_id', service_app_name:'Customer', request_string: "get"})
        };
        $http(req).success(function(data) {
          // console.log('done');
          // console.log(data.response);
          $scope.customers = angular.fromJson(data.response);
          console.log($scope.customers);
          for(var i=0; i<$scope.customers.length; i++){
            var customer = $scope.customers[i];
            if(customer.id === $scope.userId){
              $scope.showInfo(customer);
            }
          }
        });
        // close edit page, open info page
        $("#editForm").hide();
        $("#newForm").hide();
        $("#noSearchResult").hide();
        $("#noLetterResult").hide();
        $("#customerInformation").show();
      });
      
  };

  $scope.deleteCustomer = function() {
    var req = {
      method: 'POST',
      url: 'http://asa.gausian.com',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $.param({user_app_id:'app_id', service_app_name:'Customer',
      request_string: 'delete id='+$scope.customer.id})
    }
    $http(req).success(function(data) {
      var index = $scope.customers.indexOf($scope.customer)
      $scope.customers.splice(index,1);
      $scope.customer = null;
      $("#editForm").hide();
    });
  };

  $scope.openCustomer = function(customer) {
    if(customer != null){
      var payload = {
        op: 'openApp',
        originAppId: 'customerApp',
        value: customer.id
      };
    }
    else
      var payload = {
        op: 'openApp',
        originAppId: 'customerApp',
        targetAppId: 'Quotes',
        data: {
          active: "true",
          add_colume: "testing",
          company_name: "ATT",
          email: "james@gmail.com",
          first: "James",
          id: "1",
          last: "Smith",
          mail_address: "456 Burton Drive",
          mail_city: "Santa Clara",
          mail_country: "US",
          mail_state: "CA",
          mail_zip: "95867",
          mobile_phone: "465-089-1725",
          shipment_address: "456 Burton Drive",
          shipment_city: "Santa Clara",
          shipment_country: "US",
          shipment_state: "CA",
          shipment_zip: "95867",
          work_phone: "876-564-0937"
        }
      };
    console.log(payload);
    var targetUrl = (window.location != window.parent.location) ? document.referrer: document.location;
    parent.postMessage(payload, targetUrl);
  };

  $scope.addLink = function() {
    var payload = {
      op: 'addLink',
      originAppId: 'customerApp'
    };
    var targetUrl = (window.location != window.parent.location) ? document.referrer: document.location;
    parent.postMessage(payload, targetUrl);
    // console.log(payload);
  };

  $scope.processMessage = function(data){
    console.log(data);
    if(data.op === 'bootstrap'){
      var host = data.host;
    } else if (data.op === 'openApp'){
      for(var i=0; i<$scope.customers.length; i++){
        var customer = $scope.customers[i];
        if(customer.id.toString() === data.value.id){
          $scope.showInfo(data.value);
        }
      }
    } else if (data.op === 'selectLink') {
      var targetApp = data.targetApp;
      $scope.apps.push(targetApp);
      //TBD: add icon to app list
      console.log(targetApp);
    }
  };
})

.config(function ($routeProvider){
  $routeProvider.
  when('/open/:userId',{
    action: 'open'
  })
});


function receiveMessage(event) {
  var scope = angular.element(document.getElementById('CustomerCtrl')).scope();
  scope.$apply(scope.processMessage(event.data));
}
window.addEventListener("message", receiveMessage, false);
