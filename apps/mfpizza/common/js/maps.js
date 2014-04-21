/**
 * 	For showing directions on google map
 */


     var map,
                currentPosition,
                directionsDisplay,
                directionsService,
                destinationLatitude,
                destinationLongitude,
				map_canvas, // Id of the element where map will be shown
				info_message, // Message on the current marker
				direction_panel, // Id of the Panel element where final directions will be shown
				panel_container; //Id of panel container
				
			function mapInit(desLat,desLong,directionPanel,panelContainer,mapCanvas,message)
			{
				directionsDisplay = new google.maps.DirectionsRenderer();
                directionsService = new google.maps.DirectionsService();
				destinationLatitude = desLat;
                destinationLongitude = desLong;
				direction_panel=directionPanel;
				map_canvas=mapCanvas;
				info_message=message;
				panel_container = "#"+panelContainer;
			}

            function initializeMapAndCalculateRoute(lat, lon)
            {

                currentPosition = new google.maps.LatLng(lat, lon);

                map = new google.maps.Map(document.getElementById(map_canvas), {
                   zoom: 15,
                   center: currentPosition,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });

                directionsDisplay.setMap(map);

                 var currentPositionMarker = new google.maps.Marker({
                    position: currentPosition,
                    map: map,
                    title: "Current position"
                });

                // current position marker info
                
                var infowindow = new google.maps.InfoWindow();
                google.maps.event.addListener(currentPositionMarker, 'click', function() {
                    infowindow.setContent(info_message);
                    infowindow.open(map, currentPositionMarker);
                });
                

                // calculate Route
                calculateRoute();
            }

            function locError(error) {
               // the current position could not be located
			   alert("Some Error Occurred Connecting Google Maps");
            }

            function locSuccess(position) {
                // initialize map with current position and calculate the route
                initializeMapAndCalculateRoute(position.coords.latitude, position.coords.longitude);
            }

            function calculateRoute() {

                var targetDestination =  new google.maps.LatLng(destinationLatitude, destinationLongitude);
                if (currentPosition != '' && targetDestination != '') {

                    var request = {
                        origin: currentPosition,
                        destination: targetDestination,
                        travelMode: google.maps.DirectionsTravelMode["DRIVING"]
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setPanel(document.getElementById(direction_panel));
                            directionsDisplay.setDirections(response);
							
                            console.log(response);
                            $(panel_container).show();
                        }
                        else {
                            $(panel_container).hide();
                        }
                    });
                }
                else {
                    $(panel_container).hide();
                }
            }
