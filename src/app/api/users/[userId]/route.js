import { User } from "@/models/user";
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    const singleUser = await User.findById(userId).select("-password");
    return NextResponse.json(singleUser, { status: 200, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse({ message: "Single request failed", status: 500, success: false });
  }
}

export async function PUT(request, { params }) {
  const { userId } = params;
  const { name, password, about, profileURL } = await request.json();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.name = name || user.name;
    user.password = password || user.password;
    user.about = about || user.about;
    user.profileURL = profileURL || user.profileURL;

    const updatedUser = await user.save();
    return NextResponse.json({updatedUser, status: 200, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse({ message: "Error at updating user", status: 500, success: false });
  }
};

export async function DELETE(req, { params }) {
  const { userId } = params;
  try {
    await User.deleteOne({
      _id: userId
    })
    return NextResponse.json({ message: "User deleted", status: 200, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error in deleting users", status: 500, success: false });
  }
}