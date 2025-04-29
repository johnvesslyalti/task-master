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
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    }
});

export default mongoose.model('Task', taskSchema);