import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { colorSchema } from "../schemas";

export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM "Colors" ORDER BY name ASC;`;
        return NextResponse.json(rows, { status: 200});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const body = await request.json();
        
        const { error } = colorSchema.validate(body);
        if (error)
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });
        
        const id = uuidv4();
        await sql`INSERT INTO "Colors" (id, name, code) VALUES (${id}, ${body.name}, ${body.code});`;
        return NextResponse.json({ message: 'Color successfully inserted' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};