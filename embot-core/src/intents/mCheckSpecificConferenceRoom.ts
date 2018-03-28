import * as HTTP from 'http'
import { json } from 'micro'

module.exports = async (req: HTTP.IncomingMessage, res: HTTP.ServerResponse) => {
    let body = await json(req)

    res.end('hello world!')
    return
}