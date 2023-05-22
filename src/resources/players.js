export async function getAllPlayers() {
    const request = await fetch("http://localhost:8080/players");
    const response = await request.json();
    return response
}

export async function getOnePlayer(name, lastname){
    const request = await fetch(`http://localhost:8080/players/find?name=${name}&lastname=${lastname}`);
    const response = await request.json();
    
    return response
}

export async function postPlayer(body){
    const request = await fetch("http://localhost:8080/players",{
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const response = await request.json();

    return response;
}

export async function deletePlayer(id){
    console.log(`http://localhost:8080/players?id=${id}`)
    const request = await fetch(`http://localhost:8080/players?id=${id}`, {
        method: "DELETE"
    })  
    console.log(request)
}