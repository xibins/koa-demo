const Koa = require('koa')
const morgan = require('koa-morgan')
const static = require('koa-static')
const fs = require('fs')
const path = require('path');
const PORT = process.env.PORT || 9000;
const app = new Koa();

// logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// static assets
app.use(static(path.resolve(__dirname,  './dest')));

//异步读取文件的形式
app.use(async (ctx,next) =>{
    ctx.type = 'html';
    ctx.body = await fs.createReadStream(path.resolve(__dirname, './dest', 'index.html'));

})


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});