export async function getUri(uri:string){
    return await (await fetch(`/api/${uri}`)).json()
}
