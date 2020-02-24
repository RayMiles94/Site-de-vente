# mini project : site de vente 
write in javascript front end and back end:
front end : html , css (bootstrap ) , js (jquery)
back end : express js ( NodeJS )

# to start site de vente
1) first clone project<br/>
bash'''
git clone https://github.com/RayMiles94/Site-de-vente.git
'''
1) second enter directory<br/>
bash'''
cd Site-de-vente
'''
3) third remove old database<br/>
bash'''
rm -rf site_de_vente
'''
4) fourth build project<br/>
bash'''
npm install
'''
5) insert data into database<br/>
bash'''
node src/database.insert.js
'''
6) start web server<br/>
bash'''
node index.js
'''
OR<br/>
bash'''
npm start
'''


# docker

for build docker image:<br/>
bash'''
docker build -t vente .
'''

for run docker container :<br/>
bash'''
docker run --name webapp -p 4500:4500 -d vente 
'''

# Removing All Unused Objects
bash'''
docker system prune
'''