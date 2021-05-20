import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Machine = new Schema({
    macA: String,
    cpuLoad: Number,
    freeMem: Number,
    totalMem: Number,
    usedMem: Number,
    memUseage: Number,
    osType: String,
    upTime: Number,
    cpuModel: String,
    numCores: Number,
    cpuSpeed: Number,
});

export default mongoose.model('Machine',Machine);

