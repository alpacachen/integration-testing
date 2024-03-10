const Koa = require('koa');
const Router = require('koa-router');
const Notion = require("@notionhq/client");
const notionAuth = require('./notion')
const nc = new Notion.Client({
  auth: notionAuth.auth,
})
//koa实例化
const app = new Koa();
const router = new Router();
router.prefix('/api')
router.get('/title',async ctx=>{
  const data = await nc.pages.retrieve({
    page_id: notionAuth.page_id,
  });
  const res = data.properties.title.title[0].plain_text
  ctx.body=res;
})

router.post('/title',async ctx=>{
  const title = ctx.body.title
  const data = await nc.pages.update({
    page_id: notionAuth.database_id,
    properties: {title: { title: [{text: {content: title}}] }}
  });
  ctx.body=data;
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('服务启动了')
})
