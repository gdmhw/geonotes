# geonotes
- main repo for location based diary project
  created in react-native, nodejs, express, using postgresql/postgis database/server
  
  tested using expo on IOS device

- database goal: hosted postgresql (with postgis extension) on Amazon RDS

  database:
    user
    - user_id
    - username/email
    - password

    notes
    - note_id
    - user_id
    - note_text
    - lat
    - long
  
- application flow
   - login/register screen
     goes to main app screen, presented with notes screen
   
   - notes screen
     list of user's notes, add note button => goes to add note screen
   
   -  add notes screen functionality
        MVP: 
        input form to take in note text, latitude and longitude
        add note confirmation button -> goes back to notes screen

        preferred, possible if project mvp completed earlier: 
        select from list of locations given by digimap csv

        most preferred, not achievable within timeframe: 
        selection or map option => user select a pin from a map UI, or presses on screen to make own location pin
      
   - remebering user
     passport.js
     
   - secure login
     bcrypt
     
   - geolocation
     expo-location
     
- notification flow

 - client takes in user's geolocation
 - performs query to postgresql/postgis db 
   - ST_DWITHIN: if user latlong point within point with note containing their user_id, return true
   - when true, client triggers alert notification to user or server triggers notification to user
   - user clicks ok on notification, note is deleted.
 
 
 
 
    
   
      
   
 
