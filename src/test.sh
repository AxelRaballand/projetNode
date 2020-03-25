#!/bin/sh

#Affichage des bières
echo '------------------------------------------------------------------------------'
echo "Affichage des bières"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer
echo '------------------------------------------------------------------------------'
echo "Affichage de la première bière par id"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/1
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière inexistante par id"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/1000
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière par nom"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/name/Porter
echo '------------------------------------------------------------------------------'
echo "Affichage d'une bière inexistante par nom"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/name/popo
echo '------------------------------------------------------------------------------'
echo "Affichage des bière au degrés supérieures au paramètre"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/deg/6
echo '------------------------------------------------------------------------------'
echo "Affichage des bière au degrés supérieures au paramètre"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/deg/6
echo '------------------------------------------------------------------------------'
echo "Affichage des bière au degrés supérieures au paramètre mais le paramètre est trop grand"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/beer/deg/60

#Affichage des catégorie
echo '------------------------------------------------------------------------------'
echo "Affichage des catégories"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la première catégorie"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/1
echo
echo '------------------------------------------------------------------------------'
echo "Affichage d'une catégorie inexistante"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/1234
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation de la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"Demo","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Creation d'un double la catégorie $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X POST -d $body http://localhost:3000/api/categorie/
echo
echo '------------------------------------------------------------------------------'
body='{"id":100,"catName":"DemoUpdate","lastMod":"2010-06-08T02:00:00+02:00"}'
echo "Mise à  jour de la catégorie 100 : $body"
curl --noproxy "*" -H "Content-Type: application/json"  -X PUT -d $body http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/100
echo
echo '------------------------------------------------------------------------------'
echo "Suppression de la catégoie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/100
echo
echo
echo '------------------------------------------------------------------------------'
echo "Suppression d'une catégorie inexistante 1234"
curl --noproxy "*" -H "Content-Type: application/json" -X DELETE http://localhost:3000/api/categorie/1234
echo
echo '------------------------------------------------------------------------------'
echo "Affichage de la catégorie 100"
curl --noproxy "*" -H "Content-Type: application/json" -X GET http://localhost:3000/api/categorie/100
echo
