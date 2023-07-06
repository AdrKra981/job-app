import mongoose from "mongoose";

export const connectDb =  () => {
    try{
        mongoose.connect(process.env.MONGO_URL!);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log('Mongo connected')
        });

        connection.on("error", (error) => {
            console.log('Mongo connection failed');
            console.log('Error', error);
        })
    }catch(err){
        console.log('err', err);
    }
}