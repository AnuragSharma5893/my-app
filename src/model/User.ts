import mongoose , {Schema, Document}  from 'mongoose';

// defining data type for user
export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchemma: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: true;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchemma: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a Valid email address']
    },
    password: {
        type: String, 
        required: [true, "Password is required Sir!!"],
    },
    verifyCode:{
        type: String,
        required: [true, "Verify code is required"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify code Expiry is required']
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchemma]
})

// exporting data
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchemma)
export default UserModel;