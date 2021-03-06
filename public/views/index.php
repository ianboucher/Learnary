<!DOCTYPE html>
<html ng-app="learnary">

<head>
    <title>Learnary</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="icon" href="../../favicon.ico">

    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:400,800,600,700,300">
    <link rel="stylesheet" type="text/css" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <link rel="stylesheet" type="text/css" href="/css/normalize.css">
    <link rel="stylesheet" type="text/css" href="/css/main.css">
    <link rel="stylesheet" type="text/css" href="/css/landing.css">
    <link rel="stylesheet" type="text/css" href="/css/nav.css">

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <!-- <link href="../../assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet"> -->

    <!-- <script src="../../assets/js/ie-emulation-modes-warning.js"></script> -->
</head>

<body>

    <!-- INJECT THE ANGULAR TEMPLATES -->
    <ui-view></ui-view>


    <!-- APPLICATION DEPENDENCIES -->
    <!-- TODO: Consider loading dependencies from 'node_modules' folder? -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min.js"></script>
    <script src="//cdn.jsdelivr.net/satellizer/0.15.5/satellizer.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/bean/1.0.15/bean.min.js"></script>


    <!-- APPLICATION SCRIPTS -->

    <!-- Bootstrapping -->
    <script src="/js/app.module.js"></script>
    <script src="/js/app.config.js"></script>

    <!-- Services -->
    <script src="/js/services/SessionService.js"></script>
    <script src="/js/services/ModalService.js"></script>
    <script src="/js/services/UserService.js"></script>
    <script src="/js/services/RoleService.js"></script>
    <script src="/js/services/PermissionService.js"></script>
    <script src="/js/services/GroupService.js"></script>
    <script src="/js/services/SchoolService.js"></script>
    <script src="/js/services/GameService.js"></script>

    <!-- Landing/Welcome Module -->
    <script src="/js/landing/landing.module.js"></script>
    <script src="/js/landing/landing.config.js"></script>
    <script src="/js/landing/LandingCtrl.js"></script>

    <!-- Authentication Module -->
    <script src="/js/auth/auth.module.js"></script>
    <script src="/js/auth/auth.config.js"></script>
    <script src="/js/auth/LoginCtrl.js"></script>
    <script src="/js/auth/SignupCtrl.js"></script>

    <!-- Admin Module -->
    <script src="/js/admin/admin.module.js"></script>
    <script src="/js/admin/admin.config.js"></script>
    <script src="/js/admin/users/UsersCtrl.js"></script>
    <script src="/js/admin/roles/RolesCtrl.js"></script>
    <script src="/js/admin/permissions/PermissionsCtrl.js"></script>
    <script src="/js/admin/schools/SchoolsCtrl.js"></script>
    <script src="/js/admin/groups/GroupsCtrl.js"></script>

    <!-- User Orientation Module -->
    <script src="/js/orientation/orientation.module.js"></script>
    <script src="/js/orientation/orientation.config.js"></script>
    <script src="/js/orientation/OrientationCtrl.js"></script>

    <!-- Game Module -->
    <script src="/js/games/games.module.js"></script>
    <script src="/js/games/games.config.js"></script>
    <script src="/js/games/GameMenuCtrl.js"></script>
    <script src="/js/games/PlayCtrl.js"></script>
    <script src="/js/games/gameSelector.js"></script>
    <script src="/js/games/pongGame.js"></script>
    <script src="/js/games/connect4Game.js"></script>


    <script src="/js/nav/NavCtrl.js"></script>
    <script src="/js/modal/FormModalCtrl.js"></script>
    <script src="/js/modal/RadioModalCtrl.js"></script>
    <script src="/js/modal/CheckboxModalCtrl.js"></script>


</body>
</html>
