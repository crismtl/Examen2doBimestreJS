angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('AddUserCtrl', function ($scope, $stateParams, UsuarioFactory) {
    console.log('ingreso a add user ctrl');
    $scope.nuevoUsuario = {
        nombre: '',
        apellido: '',
        edad: '',
        correo: '',
        ciudad: ''
    }

    $scope.agregarUsuario = function () {
        UsuarioFactory.save({
            nombre: $scope.nuevoUsuario.nombre,
            apellido: $scope.nuevoUsuario.apellido,
            edad: $scope.nuevoUsuario.edad,
            correo: $scope.nuevoUsuario.correo,
            ciudad: $scope.nuevoUsuario.ciudad
        }).$promise.then(
            function success(respuesta) {
                //toastr.success('Éxito!', 'Se ingresó el Nuevo Usuario');
                console.log(respuesta);
            },
            function error(error) {
                //toastr.error('Error!', 'No se ingresó el Nuevo Usuario');
                console.log(error);
            });
    }

})

.controller('UsersCtrl', function ($scope, $stateParams, UsuarioFactory) {
    console.log('ingreso a users ctrl');
    UsuarioFactory.query().$promise.then(
        function success(respuesta) {
            //toastr.success('Éxito!', 'Se obtuvieron los Usuarios');
            console.log(respuesta);
            $scope.usuarios = respuesta;
        },
        function error(error) {
            //toastr.error('Error!', 'No se obtuvieron los Usuarios');
            console.log(error);
        });
})

.controller('PastelsCtrl', function ($scope, $stateParams) {
    console.log('ingreso a pastels ctrl');

})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});