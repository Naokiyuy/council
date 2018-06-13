# council

### Development

### Deployment

Clone
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

Setup the service with ecosystem.json
```sh
$/vol/web/council/server>pm2 start ecosystem.json
```
