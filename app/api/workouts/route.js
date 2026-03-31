import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// GET - fetch all workouts
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "workouts"));
    const workouts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(workouts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - save a new workout
export async function POST(request) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "workouts"), body);
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}