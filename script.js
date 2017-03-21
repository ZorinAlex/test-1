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
        var screenWidth = $window.innerWidth;
        var w = angular.element($window);
        w.bind('resize', function () {
            if ($window.innerWidth < 768){
                $scope.itemsPerPage = 1;
                $scope.currentItems = $scope.items.slice(0,$scope.itemsPerPage);
            }else{
                $scope.itemsPerPage = 3;
                $scope.currentItems = $scope.items.slice(0,$scope.itemsPerPage);
            }

        });
        if (screenWidth < 768){
            $scope.itemsPerPage = 1;
        }else{
            $scope.itemsPerPage = 3;
        }
        refindItems = function(){
            $scope.currentItems = $scope.items.slice(0,$scope.itemsPerPage);
        }


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
        }
        $scope.isActive = function (index) {
            indexCount = 0;
            var j=0;
            for(var i=0;i<$scope.capItems;i++){
                if($scope.currentItem==i){
                    break;
                }
                if(j==$scope.itemsPerPage-1){
                    indexCount++;
                    j=0;
                }
                j++;
            }


            if(index == indexCount){
                return 'dot-active';
            }

        }
        $scope.right = function(){
            if($scope.capItems>=$scope.currentItem*$scope.itemsPerPage){
                $scope.currentItem++;
                $scope.currentItems = $scope.items.slice($scope.currentItem,$scope.currentItem+$scope.itemsPerPage);
            }

        }
        $scope.left = function(){
            if($scope.currentItem>0){
                $scope.currentItem--;
                $scope.currentItems = $scope.items.slice($scope.currentItem,$scope.currentItem+$scope.itemsPerPage);
            }

        }
    }]);

