MongoDB installing manual: http://www.pronique.com/blog/installing-mongodb-on-windows-the-wamp-way

Start MongoDB `mongod --dbpath=C:/Program Files/MongoDB/bin/mongod.exe`

Show all tables:
show dbs

Switch to table:
use complaint

Show schemas:
show collections

Make db dump:
mongodump -d complaint -o d:/

Import db dump:
mongorestore -h ds145188.mlab.com:45188 -d zhaloba -u Deviant -p Zhaloba1985 d:/complaint/complaints.bson