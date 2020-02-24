# mini project : site de vente 
write in javascript front end and back end:
front end : html , css (bootstrap ) , js (jquery)
back end : express js ( NodeJS )

# to start site de vente
1) first clone project
bash '''
git clone https://github.com/RayMiles94/Site-de-vente.git
'''
1) second enter directory
bash '''
cd Site-de-vente
'''
3) third remove old database
bash '''
rm -rf site_de_vente
'''
4) fourth build project
bash '''
npm install
'''
5) insert data into database
bash '''
node src/database.insert.js
'''
6) start web server
bash '''
node index.js
'''
OR
bash '''
npm start
'''


# docker

for build docker image:
bash '''
docker build -t vente .
'''

for run docker container :
bash '''
docker run --name webapp -p 4500:4500 -d vente 
'''

# Removing All Unused Objects
bash '''
docker system prune
'''