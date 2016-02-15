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

    $scope.pasteles = [];

    $scope.filtro = $stateParams.idUsuario;

    console.log($scope.filtro);

    function filtrarArray(array) {
        for (var i = 0; i < array.length; i++) {
            if ($stateParams.idUsuario == array[i].idUsuario.id) {
                console.log(array[i].idUsuario.id)
                $scope.pasteles.push(array[i]);
            }
        }
    }

    io.socket.get('http://localhost:1337/Pastel',
        function (resData, jwres) {
            console.log('Se suscribio con blueprint de Sailsjs')
            console.log(resData);
            //console.log(resData[0]);
            $scope.pastelesSinFiltrar = resData;
            filtrarArray($scope.pastelesSinFiltrar)
            $scope.$digest();
        });

    io.socket.get('http://localhost:1337/Pastel/suscribirseOPublicar',
        function (resData, jwres) {
            console.log('Se suscribio con nuestro metodo suscribirseOPublicar...');
            console.log(jwres);
            console.log('No hay datos porq es nuestro metodo...');
            console.log(resData);
        });

    io.socket.on('pastel', function (obj) {
        console.log('Respondio del Servidor');
        console.log(obj);
        console.log('Verbo');
        console.log(obj.verb);

        if (obj.verb === 'created') {
            if ($stateParams.idUsuario == obj.data.idUsuario) {
                console.log(obj.data.idUsuario)
                $scope.pasteles.push(obj.data);
            }
            $scope.$digest();
        }
        if (obj.verb === 'destroyed') {
            $scope.indice = buscarIdArray(obj.id);
            $scope.pasteles.splice($scope.indice, 1);
            $scope.$digest();
        }
        if (obj.verb === 'updated') {
            $scope.indice = buscarIdArray(obj.id);
            console.log(obj.data);
            $scope.pasteles[$scope.indice] = obj.data;
            $scope.$digest();
        }
    });

    function buscarIdArray(id) {
        for (var i = 0; i < $scope.pasteles.length; i++) {
            if ($scope.pasteles[i].id == id) {
                return i;
            }
        }
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});