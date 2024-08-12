var app = angular.module("myApp", []);
var API_PREFIX = "http://localhost:8080/api/";

app.controller("StudentController", function ($scope, $http) {
  $scope.students = [];

  $scope.getStudents = function () {
    $http
      .get(API_PREFIX + "students")
      .then(function (response) {
        $scope.students = response.data;
        console.log($scope.students);
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

  $scope.openDeleteModal = function(id) {
    $scope.deleteId = id;
    console.log($scope.deleteId);
    $("#deleteProductModal").modal("show");
  };
  
  $scope.deleteStudent = function() {
    // Đầu tiên, tìm key của sinh viên cần xóa
    firebase.database().ref('students').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key; // key ngẫu nhiên
        var student = childSnapshot.val(); // dữ liệu sinh viên
  
        // Kiểm tra nếu ID của sinh viên trùng khớp với deleteId
        if (student.id === $scope.deleteId) {
          // Xóa sinh viên từ Firebase
          firebase.database().ref('students/' + key).remove()
            .then(function() {
              console.log('Student deleted successfully');
              $scope.getProducts(); // Cập nhật lại danh sách sản phẩm sau khi xóa
            })
            .catch(function(error) {
              console.error('Error deleting student:', error);
            });
        }
      });
    });
  };
  

  $scope.openEditProductModal = function (id) {
    $scope.editId = id;
    $scope.selectedProduct = $scope.products.find((p) => p.id === id);
    $("#editProductModal").modal("show");
  };

  $scope.editProduct = function () {
    $http
      .put(API_PREFIX + "products/" + $scope.editId, $scope.selectedProduct,{
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        $scope.getProducts();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});
