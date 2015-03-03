'use strict';


var customerApp = angular.module('customerApp',['ngRoute'])
.controller('CustomerListCtrl', function($scope, $http, $route, $routeParams) {

  $scope.data;
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
      $scope.customer=customer;
      console.log($scope.customer);
      $("#editForm").hide();
      $("#informationForm").hide();
      $("#customerInformation").show();
      $scope.expand_shipment_addr=false;
      $scope.expand_mail_addr=false;
      $scope.selected = customer.id;
  }
  $scope.orderProp = 'customer_id';

  $scope.showForm = function(flag) {
    $("#customerInformation").hide();
    if(flag === false){
      $scope.customerUpdate=null;
      $("#informationForm").show();
    }
    //$scope.customerUpdate = $scope.selectedCustomer;
    else{
      $scope.customerUpdate = angular.copy($scope.customer);
      $("#editForm").show();
    }
  };

  $scope.clearInfo = function(customer) {
      $scope.customer=$scope.initial;
      $scope.expand_shipment_addr=false;
      $scope.expand_mail_addr=false;
  }


  $scope.save = function(flag) {

    console.log(flag);

    if (flag === false){
      var req = {
        method: 'POST',
        url: 'http://asa.gausian.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({user_app_id:'app_id', service_app_name:'Customer',
        request_string: 'update first='+$scope.customerUpdate.first+',last='+$scope.customerUpdate.last+
        ',email='+$scope.customerUpdate.email+',company_name='+$scope.customerUpdate.company_name+
        ',department_name='+$scope.customerUpdate.department_name+',work_phone='+$scope.customerUpdate.work_phone+
        ',mobile_phone='+$scope.customerUpdate.mobile_phone+',shipment_address='+$scope.customerUpdate.shipment_address+
        ',shipment_city='+$scope.customerUpdate.shipment_city+',shipment_state='+$scope.customerUpdate.shipment_state+
        ',shipment_zip='+$scope.customerUpdate.shipment_zip+',shipment_country='+$scope.customerUpdate.shipment_country+';'})
      }
      $http(req).success(function(data) {
        //console.log(data.response);
        $scope.customers.push($scope.customerUpdate);
        $scope.customer = angular.copy($scope.customerUpdate);
        $("#editForm").hide();
        $("#informationForm").hide();
        $scope.selected = null;
      });
    }
    else{
      var req = {
        method: 'POST',
        url: 'http://asa.gausian.com',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param({user_app_id:'app_id', service_app_name:'Customer',
        request_string: 'add first='+$scope.customerUpdate.first+',last='+$scope.customerUpdate.last+
        ',email='+$scope.customerUpdate.email+',company_name='+$scope.customerUpdate.company_name+
        ',department_name='+$scope.customerUpdate.department_name+',work_phone='+$scope.customerUpdate.work_phone+
        ',mobile_phone='+$scope.customerUpdate.mobile_phone+',shipment_address='+$scope.customerUpdate.shipment_address+
        ',shipment_city='+$scope.customerUpdate.shipment_city+',shipment_state='+$scope.customerUpdate.shipment_state+
        ',shipment_zip='+$scope.customerUpdate.shipment_zip+',shipment_country='+$scope.customerUpdate.shipment_country+';ON:id==['+$scope.customerUpdate.id+'];'})
      }
      $http(req).success(function(data) {
        $scope.customer = angular.copy($scope.customerUpdate);
        $("#editForm").hide();
        $("#informationForm").hide();
        $("#customerInformation").show();
      });
    };
  };

  $scope.deleteCustomer = function() {
    var req = {
      method: 'POST',
      url: 'http://asa.gausian.com',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: $.param({user_app_id:'app_id', service_app_name:'Customer',
      request_string: 'delete on id==['+$scope.customer.id+'];'})
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
      };
    console.log(payload);
    parent.postMessage(payload, "http://localhost/test.html");
  };

  $scope.addLink = function() {
    var payload = {
      op: 'addLink',
      originAppId: 'customerApp'
    };
    parent.postMessage(payload, "http://localhost/test.html");
    // console.log(payload);
  };

  $scope.processMessage = function(data){
    console.log(data);
    if(data.op === 'openApp'){
      for(var i=0; i<$scope.customers.length; i++){
        var customer = $scope.customers[i];
        if(customer.id === data.value){
          $scope.showInfo(customer);
        }
      }
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
