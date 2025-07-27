const path =require("path")
const {v4:uuid} =require("uuid")
const fs=require("fs")
const fspromises=require("fs").promises
const {format}=require("date-fns")

const LogEvent = async (message,file)=>{
    const date =format(new Date(),'yyyyMMdd\tHH:mm:ss');
    const LogItem=`${date}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname,"..","logs")))
        {
            await fspromises.mkdir(path.join(__dirname,"..","logs"))
        }
      await fspromises.appendFile(path.join(__dirname,"..","logs",file),LogItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req,res,next) =>{
    LogEvent(`${req.method}\t${req.url}\t${req.headers.origin}`,"reqlog.log")
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = {LogEvent,logger};

