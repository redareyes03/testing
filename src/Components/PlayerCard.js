import { Card, Col, Row, Text } from "@nextui-org/react";

export function PlayerCard({data}) {
    return (
        <Card >
            <Card.Header >
                <Row css={{ justifyContent: "space-between" }}>
                    <Col>
                        <Text size={20} weight="semibold">{data.position}</Text>
                        <Text size={18}>{`${data.name} ${data.lastname}`}</Text>
                    </Col>
                    <Col css={{ maxW: "fit-content" }}>
                        <Text size={24} weight="bold">#{data.number}</Text>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
                <Card.Image
                    src={data.image || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" }
                    width="100%"
                    height="250px"
                    objectFit="cover"
                    alt="Card example background" />

            </Card.Body>
            <Card.Footer>
                <Col>
                    <Text size={20}>Team: {data.team}</Text>
                    <Text size={20}>Age: {data.age}</Text>
                    <Text size={20}>Salary: {data.salary}</Text>
                </Col>
            </Card.Footer>
        </Card>
    )
}