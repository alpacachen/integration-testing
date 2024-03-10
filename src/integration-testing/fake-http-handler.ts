import HttpRequestMock from 'http-request-mock';
import { HupuPostDb, TitleDb } from './fake-db';
const mocker = HttpRequestMock.setup()
mocker.mock({
    url: '/hupu/api/v2/bbs/walkingStreet/threads?page=1',
    method: 'GET',
    body: { data: { threadList: HupuPostDb.find() } },
});

mocker.mock({
    url: '/api/title',
    method: 'GET',
    response: () => {
        return TitleDb.findOne().title
    }
});

mocker.mock({
    url: '/api/title',
    method: 'POST',
    response(req: { body: { title: unknown; }; }) {
        const prevTitle = TitleDb.findOne().title;
        TitleDb.findAndUpdate({ title: prevTitle }, (d) => {
            d.title = req.body.title
        })
        return {};
    }
});