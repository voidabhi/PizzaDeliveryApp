YUI({
    combine: false,
    filter: "raw",
    debug: false,
    modules: {

        'Twitter': {
           fullpath: 'js/social/twitter.js'
        },
        'myYQL': {
            fullpath: 'js/social/yql.js',
            requires: ['jsonp', 'jsonp-url']
        }
    }
}).use('Twitter', 'gallery-storage-lite', 'myYQL', 'node', "event", function (Y) {

    "use strict";

    var twtBtn = Y.one('#twitter');

    twtBtn.on('click', function (e) {
        Y.Twitter.call({ type: "request_token" }, function (tokens) {
            Y.log("step 1");
            Y.log(tokens);
            Y.StorageLite.setItem('oauth_token', tokens.oauth_token);
            Y.StorageLite.setItem('oauth_token_secret', tokens.oauth_token_secret);
            window.setTimeout(function () {
                window.location = "https://twitter.com/oauth/authenticate?oauth_token=" + tokens.oauth_token + "&oauth_token_secret=" + tokens.oauth_token_secret;
            }, 10);
        });
    });



    if (getQueryStringParameter('oauth_token')) {



        Y.StorageLite.setItem('oauth_token', getQueryStringParameter('oauth_token'));
        Y.StorageLite.setItem('oauth_verifier', getQueryStringParameter('oauth_verifier'));

        Y.Twitter.config({
            oauth_token: getQueryStringParameter('oauth_token'),
            oauth_token_secret: getQueryStringParameter('oauth_token_secret')
        });

        Y.Twitter.call({ type: "access_token" }, function (tokens) {
           // Y.StorageLite.setItem('oauth_token', tokens.oauth_token);
           // Y.StorageLite.setItem('oauth_token_secret', tokens.oauth_token_secret);

            Y.Twitter.config({
                oauth_token: tokens.oauth_token,
                oauth_token_secret: tokens.oauth_token_secret
            });

            Y.Twitter.call({ type: "credentials" }, function (user) {
                Y.Twitter.config({
                    screen_name: user.screen_name,
                    user_id: user.id
                });

             //Do Stuff
            //You have access to user id, name, screenname, description, etc.
            //For more info visit https://dev.twitter.com/docs/api/1.1/get/account/verify_credentials

            });
        });
    }


});

function getHashStringParameter(parameter) {
    var i, parameters, pos, paramname, paramval, queryString;

    queryString = {};
    parameters = window.location.hash.substring(1).split('&');

    for (i in parameters) {
        if (parameters.hasOwnProperty(i)) {
            pos = parameters[i].indexOf('=');
            if (pos > 0) {
                paramname = parameters[i].substring(0, pos);
                paramval = parameters[i].substring(pos + 1);
                queryString[paramname] = unescape(paramval.replace(/\+/g, ' '));
            }
            else {
                queryString[parameters[i]] = "";
            }
        }
    }

    if (queryString[parameter]) {
        return queryString[parameter];
    }
    else {
        return false;
    }
}

// Fetching parameters from url
function getQueryStringParameter(key, queryString) {
    //TODO: Cleanup
    var queryString = queryString || window.location.href;
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(queryString);
    if (qs)
        return qs[1];
    else
        return false;
}
