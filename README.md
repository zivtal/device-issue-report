# User device issue report form fullstack

## Guidelines

1. Write the result code In either Python / Django framework OR in Typescript / nodejs
2. Plan and implement a simple Form page, which asks the user details about his problem, 
enter the serial number of his device and the status of the lights on his device, and 
returns a response accordingly.

### UI Form

- Simple Form page 
  - User ID 
    - Number 
  - Problem description 
    - Free text up to 300 chars 
    - Example: “My device is making weird noises” 
  - Device serial number 
    - 64 chars 
    - Example: “24-X-125447-DC” 
  - Status indicator lights x 3 
    - There are 3 indicators 
    - Each indicator can be off / on / blinking 
- Response to user -> Will be calculated on server side (see below) 

### Server side:

- A logic service will calculate the “response status” message according to the logic:
  - If serial number starts with 24-X -> “please upgrade your device”
  - If serial number stats with 36-X
    - If all indicators are off -> “turn on the device”
    - If the 2 indicators are blinking -> “Please wait”
    - If all indicators are on -> “ALL is ok”
  - If serial number starts with 51-B
    - If all indicators are off -> “turn on the device”
    - If the 1 indicator is blinking -> “Please wait”
    - If more than 1 indicator is on (and others are off) -> “ALL is ok”
  - If serial number is a number
    - Print “Bad serial number”
    - TBD (in 2nd interview)
  - Else
    - “Unknown device”
- Save the following into a data table (relational)
  - The form input data
  - The current date time
  - The response status
