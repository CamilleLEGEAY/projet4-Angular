:: creat the bundle of the project
::start /wait bundle.bat

:: copy the result in an other folder
robocopy ./Angular/dist ./bundle /e

:: go to the bundle folder to check if it can run on a lite-serve
:: if you don't have lite-serve install with : npm install -g
cd ./bundle/projet4-angular
lite-server
echo see the result on http://localhost:3000
