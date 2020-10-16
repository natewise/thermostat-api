# Pseudo Thermostat API Interface 
Description: A JavaScript and Python-based, pseudo thermostat API interface intended to model how our application might interface with the hardware of a thermostat and how it might communicate with a user.  

Testing: Inside the theromstat-api folder is thermostat.js and data_generation.js. 
Run data_generation.js first to get dummy thermostat data generating for the main api.
Run thermostat.js next, in order to connect to the data_generation.js socket to begin populating the thermostat's register.
Run client_2.py for an external connection (simulating a user connection) to the thermostat api from a python client.  
