import mongoose, { Schema, Document } from 'mongoose';

export interface IPet extends Document {
  name: string;
}

const PetSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IPet>('Pet', PetSchema);