import { Document, Schema, model } from 'mongoose';

export interface IProfile extends Document {
    authId: string;
    username: string;
    githubSecret: string;
}

const ProfileSchema = new Schema<IProfile>(
    {
        authId: String,
        username: String,
        githubSecret: String,
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    }
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
