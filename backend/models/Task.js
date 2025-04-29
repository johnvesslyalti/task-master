import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model('Task', taskSchema);