﻿
angular.module('app', []).controller('ListOrdMasterHistCSVCtrl', ['$scope', '$state', '$rootScope', 'fileUpload', 'OrdMasterHistCSVFactory', function ($scope, $state, $rootScope, fileUpload, OrdMasterHistCSVFactory) {

    // 宣告vm
    $scope.vm = {};

    // 動作
    $scope.vm.uploadOrdMasterHistCSV = function () {
        if (confirm("上傳檔案視網路速度需一至數分鐘")) {
            $("#loading").fadeIn("fast");
            var file = $scope.myFile;
            console.log('file is ' + JSON.stringify(file));
            var uploadUrl = "../../mvc/OrdMasterHistCSV";
            fileUpload.uploadFileToUrl(file, uploadUrl).success(function (data) {
                $scope.vm.getAllData();
                $("#loading").fadeOut("fast");
            }).error(function () {
                alert('上傳錯誤');
            });
        } else {
            return;
        }
        
    };


    // 取得data填充ui grid
    $scope.vm.getAllData = function () {
        OrdMasterHistCSVFactory.getAll().success(function (data) {
            $scope.gridOptions.data = data;
        }).error(function (err) {
            console.log(err);
        });
    };
    
    

    // 使用者介面基本設定
    $scope.gridOptions = {};
    $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: true };
    $scope.gridOptions.columnDefs = [
       //{ name: 'Edit', cellTemplate: '<button type="button" class="btn btn-small bg-purple btn-flat" ng-click="grid.appScope.goToUpdateForm(row.entity)" helf= >編輯</button> ', width: 100, pinnedLeft: true },
       //{ name: 'Delete', cellTemplate: '<button type="button" class="btn btn-small btn-danger btn-flat" ng-click="grid.appScope.gotToDeleteForm(row.entity)" helf= >刪除</button> ', width: 100, pinnedLeft: true },
       { name: 'DATE_SALE', width: 100 },
       { name: 'VOU_SALE', width: 100 },
       { name: 'CUST_ID', width: 100 },
       { name: 'IO_ID', width: 100 },
       { name: 'SALE_ID', width: 100 },
       { name: 'DRIVER_ID', width: 100 }
    ];
    $scope.vm.getAllData();

}]);