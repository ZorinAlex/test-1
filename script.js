var app = angular.module('test',['ngSanitize'])
    .controller('testCtrl',['$scope', '$window','$http', function($scope, $window,$http) {
        $http({
            method : "GET",
            url : "items.json"
        }).then(function mySucces(response) {
            $scope.items = response.data;
            $scope.capItems = $scope.items.length;
            refindItems();
        }, function myError(response) {
            $scope.items = response.statusText;
        });

        var w = angular.element($window);
        w.bind('resize', function () {
            if ($window.innerWidth < 768){
                if( $scope.display=='desktop'){
                    $scope.itemsPerPage = 1;
                    $scope.currentItem = 0;
                    $scope.currentItems = $scope.items.slice(0,$scope.itemsPerPage);
                    $scope.$apply();
                    $scope.display='mobile';
                }
            }else{
                if( $scope.display=='mobile') {
                    $scope.itemsPerPage = 3;
                    $scope.currentItem = 0;
                    $scope.currentItems = $scope.items.slice(0, $scope.itemsPerPage);
                    $scope.$apply();
                    $scope.display='desktop';
                }
            }
        });
        if ($window.innerWidth < 768){
            $scope.itemsPerPage = 1;
            $scope.display='mobile';
        }else{
            $scope.itemsPerPage = 3;
            $scope.display='desktop';
        }
        refindItems = function(){
            $scope.currentItems = $scope.items.slice(0,$scope.itemsPerPage);
        };

        $scope.currentItem = 0;
        var indexCount=0;
        var maxStars = 5;

        $scope.getStars = function(index){
            return new Array($scope.currentItems[index].stars)
        };
        $scope.getEmptyStars = function(index){
            return new Array(maxStars - $scope.currentItems[index].stars)
        };
        $scope.getDots = function(){
            if(Math.ceil($scope.capItems/$scope.itemsPerPage)){
                return new Array(Math.ceil($scope.capItems/$scope.itemsPerPage));
            }
        };
        $scope.isActive = function (index) {
            indexCount = Math.floor($scope.currentItem/$scope.itemsPerPage + 1/3);
            if(index == indexCount){
                return 'dot-active';
            }
        };
        $scope.right = function(){
            if($scope.capItems>$scope.currentItem+$scope.itemsPerPage){
                $scope.currentItem++;
                $scope.currentItems = $scope.items.slice($scope.currentItem,$scope.currentItem+$scope.itemsPerPage);
            }
        };
        $scope.left = function(){
            if($scope.currentItem>0){
                $scope.currentItem--;
                $scope.currentItems = $scope.items.slice($scope.currentItem,$scope.currentItem+$scope.itemsPerPage);
            }

        }
    }]);

