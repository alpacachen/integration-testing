import fs from 'fs'
import { Session } from 'inspector'
import path from 'path'

let session: Session

export async function startProfiling() {
    session = new Session()
    session.connect()
    await new Promise((f) => {
        session.post('Profiler.enable', () => {
            session.post('Profiler.start', f)
        })
    })
}

export async function stopProfiling(profileName = 'integration-test') {
    await new Promise((f) =>
        session.post('Profiler.stop', (err, res) => {
            if (!err) {
                const targetPath = path.join(__dirname, profileName + '.json')
                
                fs.writeFileSync(targetPath, JSON.stringify(res.profile))
            }
            f(1)
        })
    )
}
