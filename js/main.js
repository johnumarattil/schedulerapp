var schedulerApp = angular.module("schedulerApp", ["ngRoute"]); 
schedulerApp.controller("myCtrl", function($rootScope) {
    $rootScope.schedulerList = [{
"schedulerName": "9 to 5.30",
"startTime": "09:00",
"endTime": "17:30",
"daysAvailable": {
    "monday":true,
    "tuesday":true,
    "wednesday":true,
    "thursday":true,
    "friday":true,
    "saturday":false,
    "sunday":false    
    }
},{
"schedulerName": "10 to 4",
"startTime": "10:00",
"endTime": "16:00",
"daysAvailable": {
    "monday":true,
    "tuesday":true,
    "wednesday":true,
    "thursday":true,
    "friday":true,
    "saturday":false,
    "sunday":false    
    }
},{
"schedulerName": "11 to 6",
"startTime": "11:00",
"endTime": "18:00",
"daysAvailable": {
    "monday":true,
    "tuesday":true,
    "wednesday":true,
    "thursday":true,
    "friday":true,
    "saturday":false,
    "sunday":false    
    }
}];
$rootScope.getTime12Format = function(time){
    debugger
    if(time) {
        time=time.split(':');
        if(+time[0]==0)
            return ("12" + ":" + time[1] + "AM");
        else if(+time[0]<=11)
            return (time[0]+":"+time[1]+"AM");
        else if(+time[0]==12)
            return (time[0]+":"+time[1]+"PM");
        else if(+time[0]>12)
            return (("0" + (+time[0]-12)).slice(-2) + ":" + time[1] + "PM");
    }
    else
        return null;
}

});

schedulerApp.directive("leftNav", function() {
    return {
        //template: "<h1>Hi</h1>",
        templateUrl : 'components/leftnav/leftnav.html'
    };
});
schedulerApp.directive("schedulerList",function(){
    return {
        templateUrl:'partials/schList/schList.html'
    };
});
schedulerApp.directive('daysSelector', function() {
   return {
        templateUrl:'partials/schList/daysSelector.html'
    };
});
schedulerApp.controller("daysSelectorController",['$scope', function($scope){

    $scope.daysSelected={
    "monday":false,
    "tuesday":false,
    "wednesday":false,
    "thursday":false,
    "friday":false,
    "saturday":false,
    "sunday":false    
    };
$scope.getTime24Format = function(dateObj){
let hrs=("0" + dateObj.getHours()).slice(-2);
let mins=("0" + dateObj.getMinutes()).slice(-2);
return hrs+":"+mins;
}

 $scope.addScheduler = function () {
        $scope.errortext = "";
        debugger
        if ($scope.validateSchedulerInputFields()) {
            $rootScope.schedulerList.push({
                "schedulerName": $scope.schedulerName,
                "startTime": $scope.getTime24Format($scope.schedulerStartTime),
                "endTime": $scope.getTime24Format($scope.schedulerEndTime),
                "daysAvailable": $scope.daysSelected
            });
            $scope.resetSchedulerFields();
        } else {
            return;
        }
    }
    $scope.removeScheduler = function (x) {
        $scope.errortext = "";    
        $rootScope.schedulerList.splice(x, 1);
    }
    $scope.validateSchedulerInputFields=function(){
        if($scope.schedulerName!="" && $scope.schedulerName!= null){
            if($scope.schedulerStartTime!="" && $scope.schedulerStartTime!= null){
                if($scope.schedulerEndTime!="" && $scope.schedulerStartTime!= null){
                    return true;
                }
            }
        }
        else return false;
    }

    $scope.resetSchedulerFields = function(){
        $scope.daysSelected={
            "monday":false,
            "tuesday":false,
            "wednesday":false,
            "thursday":false,
            "friday":false,
            "saturday":false,
            "sunday":false    
        };
        $scope.schedulerName="";
        $scope.schedulerEndTime="";
        $scope.schedulerStartTime="";
    }
    function getYesOrNo(value){
        if (value==true)
            return "    Y    ";
        else return "    N    ";
    }
    $scope.getAvailableDays = function(daysSelected){
        let availableDays="";
        availableDays= getYesOrNo(daysSelected.monday)+getYesOrNo(daysSelected.tuesday)
        +getYesOrNo(daysSelected.wednesday)+getYesOrNo(daysSelected.thursday)
        +getYesOrNo(daysSelected.friday)+getYesOrNo(daysSelected.saturday)
        +getYesOrNo(daysSelected.sunday);
        return availableDays;
    }

}]);
schedulerApp.controller("testSchedulerController",['$scope', function($scope){
    $scope.showSchDetails=false;
    $scope.selectedScheduler="";
$scope.selectScheduler = function(scheduler){
$scope.showSchDetails=true;
};
function getYesOrNo(value){
        if (value==true)
            return "    Y    ";
        else return "    N    ";
    }
$scope.getAvailableDays = function(daysSelected){
    if(typeof daysSelected!= 'undefined') {
        let availableDays="";
        availableDays= getYesOrNo(daysSelected.monday)+getYesOrNo(daysSelected.tuesday)
        +getYesOrNo(daysSelected.wednesday)+getYesOrNo(daysSelected.thursday)
        +getYesOrNo(daysSelected.friday)+getYesOrNo(daysSelected.saturday)
        +getYesOrNo(daysSelected.sunday);
        return availableDays;
    }
    else return null;
    };

$scope.testScheduler = function(){
    console.log($scope)
}



}]);
schedulerApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "partials/schList/schList.html",
    })
    .when("/test", {
        templateUrl : "partials/schTest/schTest.html",
    });
});