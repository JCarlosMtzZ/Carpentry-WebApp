import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { colorSchema } from "../../schemas";

export async function GET(request, { params }) {
    try {
        const id = params.id;

        const { rows } = await sql`SELECT * FROM "Colors" WHERE id = ${id};`;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'Color not found' }, { status: 404 });
        
        return NextResponse.json(rows[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function PUT(request, { params }) {
    try {
        const body = await request.json();
        
        const { error } = colorSchema.validate(body);
        if (error)
            return NextResponse.json({ error: error.details[0].message }, { status: 400 });

        const id = params.id;
        const { rows } = await sql`SELECT * FROM "Colors" WHERE id = ${id};`;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'Color not found' }, { status: 404 });
        
        await sql`UPDATE "Colors" SET name = ${body.name}, code = ${body.code} WHERE id = ${id};`;

        return NextResponse.json({message: 'Color successfully updated'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export async function DELETE(request, { params }) {
    try {
        const id = params.id;

        const { rows } = await sql`SELECT * FROM "Colors" WHERE id = ${id};`;
        
        if (rows.length === 0)
            return NextResponse.json({ error: 'Color not found' }, { status: 404 });
        
        await sql`DELETE FROM "Colors" WHERE id = ${id};`;

        return NextResponse.json({message: 'Color successfully deleted'}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};