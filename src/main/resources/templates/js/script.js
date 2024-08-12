var app = angular.module("myApp", []);
var API_PREFIX = "http://localhost:8080/api/";

app.controller("StudentController", function ($scope, $http) {
  $scope.students = [];

  $scope.getStudents = function () {
    $http
      .get(API_PREFIX + "students")
      .then(function (response) {
        $scope.students = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.getStudents();

  $scope.createStudent = function () {
    $http
      .post(API_PREFIX + "students", $scope.newStudent,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        $scope.getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.openDeleteModal = function(studentId) {
    // Lặp qua các sinh viên để tìm key tương ứng với ID sinh viên
    for (var key in $scope.students) {
      if ($scope.students[key].id === studentId) {
        $scope.deleteKey = key;
        break;
      }
    }
    console.log($scope.deleteKey);  // Kiểm tra key đã tìm thấy
    $("#deleteProductModal").modal("show");
  };
  

  $scope.deleteStudent = function () {
    $http
      .delete(API_PREFIX + "students/" + $scope.deleteKey)
      .then(function (response) {
        $("#deleteProductModal").modal("hide");
        $scope.getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.openEditProductModal = function(studentId) {
    // Lặp qua các sinh viên để tìm key tương ứng với ID sinh viên
    for (var key in $scope.students) {
      if ($scope.students[key].id === studentId) {
        $scope.editKey = key;
        $scope.selectedProduct = angular.copy($scope.students[key]); // Sao chép thông tin sinh viên cần chỉnh sửa
        break;
      }
    }
    console.log($scope.editKey);  // Kiểm tra key đã tìm thấy
    $("#editProductModal").modal("show");
  };  

  $scope.editProduct = function() {
    $http
      .put(API_PREFIX + "students/" + $scope.editKey, $scope.selectedProduct, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function(response) {
        console.log('Product updated successfully');
        $scope.getStudents(); // Cập nhật lại danh sách sau khi chỉnh sửa
      })
      .catch(function(error) {
        console.log('Error updating product:', error);
      });
  };
  
});
