'use client'

import { Button, Col, Collapse, Container, Dropdown, Grid, Input, Row, Spacer, Text } from "@nextui-org/react"
import { useState } from "react"
import { PlayerCard } from "../src/Components/PlayerCard"
import { deletePlayer, getAllPlayers, getOnePlayer, postPlayer } from "../src/resources/players";

export default function Page() {
    const [resource, setResource] = useState(null);
    const [inputMode, setInputMode] = useState("create");

    const renderObjects = {
        "player": (resource) => <PlayerCard data={resource} />
    }

    const [playerInfo, setPlayerInfo] = useState({
        "name": "",
        "lastname": "",
        "team": "",
        "position": "",
        "salary": 0,
        "age": 0,
        "number": 0,
        "image": ""
    })

    const inputModes = {
        "create": () => (
            <>
                <Col >
                    <Row justify="center">
                        <Input
                            clearable
                            labelPlaceholder="Name"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, name: target.value })} />
                        <Spacer x={1} />
                        <Input
                            clearable
                            labelPlaceholder="Lastname"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, lastname: target.value })} />
                    </Row>
                    <Spacer y={2} />
                    <Row justify="center">
                        <Input
                            clearable
                            labelPlaceholder="Team"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, team: target.value })} />
                        <Spacer x={1} />
                        <Input
                            clearable
                            labelPlaceholder="Position"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, position: target.value })} />
                    </Row>
                    <Spacer y={2} />
                    <Row justify="center">
                        <Input
                            clearable
                            labelPlaceholder="Salary"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, salary: target.value })} />
                        <Spacer x={1} />
                        <Input
                            clearable
                            labelPlaceholder="Age"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, age: target.value })} />
                    </Row>
                    <Spacer y={2} />
                    <Row justify="center">
                        <Input
                            clearable
                            labelPlaceholder="Number"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, number: target.value })} />
                        <Spacer x={1} />
                        <Input
                            clearable
                            labelPlaceholder="Age"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, age: target.value })} />
                    </Row>


                    <Button
                        css={{ mx: "auto", my: "$10" }}
                        color={"secondary"}
                        onClick={async () => {
                            let response = await postPlayer(playerInfo);
                        }
                        }>Post Player</Button>
                </Col>
            </>
        ),
        "findOne": () => (
            <>
                <Col >
                    <Row justify="center">
                        <Input
                            clearable
                            labelPlaceholder="Name"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, name: target.value })} />
                        <Spacer x={1} />
                        <Input
                            clearable
                            labelPlaceholder="Lastname"
                            onInput={({ target }) => setPlayerInfo({ ...playerInfo, lastname: target.value })} />
                    </Row>
                    <Button
                        css={{ mx: "auto", my: "$10" }}
                        color={"secondary"}
                        onClick={async () => {
                            let response = await getOnePlayer(playerInfo.name, playerInfo.lastname);
                            setResource(response)
                        }
                        }>Find Player</Button>
                </Col>
            </>
        ),
        "delete": () => {
            let id;
            return (
                <Col >
                    <Row justify="center">
                        <Input
                            clearable
                            labelPlaceholder="Id"
                            onInput={({ target }) => id = target.value} />
                        <Spacer x={1} />
                    </Row>
                    <Button
                        css={{ mx: "auto", my: "$10" }}
                        color={"error"}
                        onClick={async () => {
                           if(id){
                            let response = await deletePlayer(id);
                            console.log(response)
                           }
                        }
                        }>Delete Player</Button>
                </Col>
            )
        }
    }
    return (
        <>
            <Container>
                <h1>Testing NFL RESTful api</h1>

                <Grid.Container justify="center">
                    <Grid md={5} justify="center">
                        <Collapse.Group>
                            <Collapse title="Players" subtitle="Manage NFL Players">
                                <Button.Group >
                                    <Button onClick={() => setInputMode("create")}>Create</Button>
                                    <Dropdown>
                                        <Dropdown.Button color={"default"}>Find</Dropdown.Button>
                                        <Dropdown.Menu onAction={async (selectionFind) => {
                                            let response;
                                            setInputMode("findOne")
                                            if (selectionFind === "findAll") {
                                                response = await getAllPlayers()
                                            }
                                            setResource(response)
                                        }} aria-label="Static Actions">
                                            <Dropdown.Item key="findOne">Specified</Dropdown.Item>
                                            <Dropdown.Item key="findAll">All</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button onClick={() => setInputMode("delete")}>Delete</Button>
                                    <Button>Update</Button>
                                </Button.Group>
                            </Collapse>


                        </Collapse.Group>
                    </Grid>


                    <Grid md={5} alignItems="center">
                        {
                            inputModes[inputMode]()
                        }
                    </Grid>



                    <Grid md={10} justify="center">
                        <Grid.Container gap={4}>
                            {
                                resource && resource.map(register =>
                                    <Grid md={3}>

                                        {renderObjects["player"](register)}

                                    </Grid>
                                )
                            }
                        </Grid.Container>
                    </Grid>
                </Grid.Container>

            </Container>

        </>)

}