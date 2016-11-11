<!DOCTYPE html>
<html ng-app="learnary">

<head>
    <title>Learnary</title>


    <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:400,800,600,700,300">
    <link rel="stylesheet" type="text/css" href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- <link rel="stylesheet" type="text/css" href="/styles/normalize.css"> -->
    <link rel="stylesheet" type="text/css" href="/css/main.css">

    <meta name="viewport" content="width=device-width, initial-scale=1">

</head>

<body>

    <div class="container">
        <div class="row row-centered">
            <div class="col-xs-10 col-centered">

                <ui-view></ui-view>

            </div>
        </div>
    </div>

    <!-- APPLICATION DEPENDENCIES -->
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.2.0/ui-bootstrap-tpls.min.js"></script>

    <!-- APPLICATION SCRIPTS -->
    <script src="/js/app.js"></script>
    <script src="/js/landing/LandingCtrl.js"></script>

</body>
</html>
