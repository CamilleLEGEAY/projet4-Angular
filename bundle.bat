Rem go to the angular project file
cd projet4-Angular
Rem creat the bundle of the project
ng build --prod

Rem copy the result in an other folder
robocopy ./dist ../bundle /e

Rem go to the bundle folder to check if it can run on a lite-serve
Rem see the result on http://localhost:3000
Rem if you don't have lite-serve install with : npm install -g
::cd ../bundle/projet4-Angular
::lite-server