import loki from 'lokijs'
import { FakeHupuData } from './fake-data'
const db = new loki('fake-db')
const HupuPostDb = db.addCollection('hupu-post')
HupuPostDb.insert(FakeHupuData)

const TitleDb = db.addCollection('title')
TitleDb.insert({ title: '集成测试教程' })
export { HupuPostDb, TitleDb }