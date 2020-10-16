# Pseudo Thermostat API Interface 
**Description:** A JavaScript and Python-based, pseudo thermostat API interface intended to model how a real application might interface with the hardware of a thermostat and how it might communicate with a user.  

**How to run/test it:** Inside the theromstat-api folder is _thermostat.js_ and _data_generation.js_. 
Run _data_generation.js_ first to get dummy thermostat data generating for the main api.
Run _thermostat.js_ next, in order to connect to the _data_generation.js_ socket to begin populating the thermostat's register.
Run _client_2.py_ for an external connection (simulating a user connection) to the thermostat api.  
