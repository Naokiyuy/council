# council

### Development

### Deployment

Install nginx

Please refer to https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04

Install nodejs

Please refer to https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

Install pm2

Please refer to http://pm2.keymetrics.io/docs/usage/quick-start/

Install mysql

Please refer to https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04

Install phpmyadmin

Please refer to https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-16-04

Clone source code
```sh
$git clone
```
Build with webpack by gulp
```sh
$council/app>gulp
```
Copy zip file in dist folder to server and unzip it.

For now, it should be located at /vol/web/council.

To prevent removing uploaded files at everytime we deploy.

Create upload folder and link it with service.

```sh
$/vol/web> mkdir uplaod
$/vol/web/council/public> ln -s /vol/web/upload ./upload
```

If copied from Windows OS, remember to correct mode of folder.

```sh
$chmod -R 755 /vol/web/council
```

Install pm2 for manage process and restart service if failed.

And make sure nodejs installed.

```sh
$npm install -g pm2
```
install babel-node,

```sh
$npm install -g babel-cli
```

Setup the service with ecosystem.json
```sh
$/vol/web/council/server>pm2 start ecosystem.json
```
