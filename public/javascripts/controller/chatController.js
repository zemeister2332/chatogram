app.controller('chatController', ['$scope', 'chatFactory', 'userFactory' , ($scope, chatFactory,userFactory) => {

   /*
   * init
   * */
   function init(){
       userFactory.getUser().then(user => {
           $scope.user = user
       });
   }
    init();
   /*
   * angular variables
   * */
   $scope.activeTab = 1;
   $scope.onlineList = [];
   $scope.roomList = [];
   $scope.chatClicked = false;
   $scope.loadingMessages = false;
   $scope.chatName = "";
   $scope.roomId = "";
   $scope.message = "";
   $scope.messages = [];

   $scope.user = {};

   const socket = io.connect('http://localhost:3000');

    socket.on('onlineList', users => {
        //console.log(users)
        $scope.onlineList = users;
        //$scope.apply();
    });

    socket.on('roomList', rooms => {
        //console.log(rooms)
        $scope.roomList = rooms;
        //$scope.apply();
    });

    socket.on('receiveMessage', data => {
        $scope.messages[data.roomId].push({
            userId: data.userId,
            username: data.username,
            surname: data.surname,
            message: data.message
        });
        $scope.$apply();
    });

    $scope.newMessage = () => {
        if ($scope.message.trim() !== ''){
            socket.emit('newMessage',{
                message: $scope.message,
                roomId: $scope.roomId
            });

            $scope.messages[$scope.roomId].push({
               userId: $scope.user._id,
               username: $scope.user.name,
               surname: $scope.user.surname,
               message: $scope.message
            });

            // console.log($scope.roomId);
            // console.log($scope.message);
            $scope.message = '';
        }
    };

    $scope.switchRoom = room => {

        $scope.chatName = room.name;
        $scope.roomId = room.id;

        $scope.chatClicked = true;

        if (!$scope.messages.hasOwnProperty(room.id)){
            $scope.loadingMessages = true;

            console.log("Servis Boglanayapti");

            chatFactory.getMessages(room.id).then(data => {
                $scope.messages[room.id] = data;
                $scope.loadingMessages = false;
            });
        }

        //console.log(room)
        //$scope.$apply();


    };

    $scope.newRoom = () => {
        //let randomName = Math.random().toString(36).substring(7);

        let roomName = window.prompt("Chat Ismini Kiriting...")
        if (roomName !== "" && roomName !== null){
            //console.log(randomName);
            socket.emit('newRoom', roomName);
        }
    };

    $scope.changeTab = tab => {
       $scope.activeTab = tab;
   };


}]);