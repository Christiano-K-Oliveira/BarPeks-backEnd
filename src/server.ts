import app from './app'
import { AppDataSource } from './data-source'

const PORT = process.env.PORT || 3000;
const runningMsg: string = `Server running on https://localhost:${PORT}`

AppDataSource.initialize().then(() => {
    console.log('Database connected.')

    app.listen(PORT, async () => {
        console.log(runningMsg)
    })
}).catch(err => {
    console.log(err)
})