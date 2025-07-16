import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { log } from "console";

(async() => {
    main();
})();

async function main() {

    /**
     * * MONGO IMPLEMENTATION EXAMPLES
     */

    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });

    // const newLog = await LogModel.create({
    //     message: 'test message from Mongo',
    //     origin: 'app.ts',
    //     level: 'low'
    // });

    // await newLog.save();

    // console.log(newLog);
    // const logs = await LogModel.find();
    // console.log(logs);
    
    /**
     * * POSTGRE IMPLEMENTATION EXAMPLES
     */

    //const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'MEDIUM',
    //         message: 'Teste message postgre',
    //         origin: 'App.ts'
    //     }
    // });

    //console.log(newLog);

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'HIGH'
    //     }
    // });
    // console.log(logs);    

    Server.start();

}