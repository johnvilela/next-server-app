export async function GET(request, { params }) {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)

    const data = await res.json()

    return Response.json(data)
}