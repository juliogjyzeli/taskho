# taskho

This is the repo for the given task 

- "npm install" (to install the project dependencies)

In package.json you will find some commands in order to run the application: 
- "npm run serve" (to get the server running)
- "npm test" (to test the cases which are in src/tests/index.tests.ts)

To Dockerize the image:
1) Start Docker
2) "docker build -t node-app ." (to build docker image)
3) "docker run -p 3000:3000" node-app (to run container)

In the response are expected the appropriate error messages in case of an error.
If there is no error the array with the correct values and the time of execution will be returned.
