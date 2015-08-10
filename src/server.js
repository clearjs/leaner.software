import koa from 'koala';
import http from 'http';
import debug from 'debug';
const log = debug('app:server');

const app = koa();

app.use(function *logger(next) {
  const start = new Date();
  yield next;
  const ms = new Date() - start;
  log(`${this.ip} ${this.method} ${this.url} - ${ms}`);
});

app.use(function *handler() {
  this.response.redirect(process.env.NEW_BASE_URL);
});

const port = process.env.PORT || 5000;
http.createServer(app.callback()).listen(port, function callback(err) {
  if (err) throw err;
  log(`Koala app listening on port ${this.address().port}`);
});
