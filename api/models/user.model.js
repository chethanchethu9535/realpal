import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqQMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUH/8QAKxABAAICAAUCBQQDAAAAAAAAAAECAxEEEiExQVFhIjJxgZETUqGxFEJi/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAibRHeVLZPFfyzBpOX0hXnsqAnnt6p57eqoDSMnrC0Wie0sQHQMq38T2agAAAAAAAAAAMr33OvC2S2ukMgAAARa0VjdpiPqCRn+vj/d/C1b1t8sxILAALUtyz7KgOgZ47eJaAAAAAAAEiuSfhBlM7naAAABnmyfp1/68OK0zad2ncr57c2WfadQzATEzE7idSgVHZw+bnjlt80fy2efS3LeJ9JegigAG9TtvHWGDTHPTQNAAAAAAGeXtDRnl8AzAAPIA8/J89vrKrTiK8uWfeds1AAQejHaHBjrzXiPV6CKAAL4u8qL4/m+wNQAAAAAFMkfCui0brMAwAAABTLjjJXXmO0uK9LUnVo07rZKV72iPupOfFMam2/sDiTWs2nVYmXVz8P7fhaM2GvSLREemgMOKMcbn5p7tWcZsdu14aAAANMXmWbakaqCwAAAAAAAMckan2lVvaNxpjManQKz0jbkzZ5vMxWZiv9tOLvqsUjz3coACoAANMWa2Oeu5r5hmA9GtotG6zuEuXhL6maevZ1d+kIqaV5rR7N1aRqFgAAAAAAAAFbV5vqsA8zjImMvWOmmD18mOuSvLaNw4svB2r1xzzR6eQcom1ZrOrRMT7oVAAATWJtOqxMz7OjFwd79b/BHp5Blw25z1iImXp0rpGLFTFXVY+7RFAAAAAAAAAAAAAARMRPeIllbhsVu+OPt0bAOf/Dw/tn8pjhcMf6fnq3AVrWK9KxER7LAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//2Q=="
    },
}, { timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;