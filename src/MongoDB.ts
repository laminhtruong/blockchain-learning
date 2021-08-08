import { MongoClient } from 'mongodb';

class MongoDB
{
    mongoClient: MongoClient;

    /**
     * @brief Connect to the database
     * @param {*} callback
     */
    Connect()
    {
        let url = process.env.MONGODB_URL;
        MongoClient.connect(url)
            .then((client: MongoClient) =>
            {
                this.mongoClient = client;
                console.log("Database is connected");
            })
            .catch((error: any) =>
            {
                console.log("Database connect failed " + error);
            });
    }

    /**
     * @brief Disconnect to the database
     */
    Disconnect()
    {
        this.mongoClient.close();
    }

    /**
     * @param name collection name we wish to access.
     * @returns the new Collection instance
     */
    GetCollection(name: string)
    {
        return this.mongoClient.db('blockchain').collection(name);
    }
}
export default new MongoDB;