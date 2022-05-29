import Head from "next/head";
import { useState, useEffect } from "react";
import { Container, Row, Col, Image, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "use-shopping-cart";
import { CartDetail } from "../components/cart";

export default function Home({ products }) {
  const { addItem } = useShoppingCart();
  return (
    <main className="mgt">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <Stack gap={3}>
              {products.map((product) => {
                return (
                  <Row key={product.id}>
                    <Col xs={4}>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        style={{ maxWidth: "100%" }}
                      />
                    </Col>
                    <Col>
                      <Stack gap={3}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                      </Stack>
                      <Stack direction="horizontal">
                        {product.prices.map((price) => {
                          return (
                            <dl key={price.id}>
                              <dt>価格</dt>
                              <dd>
                                <span>
                                  {price.unit_amount.toLocaleString()}{" "}
                                  {price.currency.toLocaleUpperCase()}
                                </span>
                                {price.transform_quantity ? (
                                  <small>
                                    ({price.transform_quantity.divide_by}
                                    アイテム毎)
                                  </small>
                                ) : null}
                              </dd>
                              <dd>
                                <form
                                  action="/api/checkout_session"
                                  method="POST"
                                >
                                  <input
                                    type="hidden"
                                    name="price"
                                    value={price.id}
                                  />
                                  <input
                                    type="hidden"
                                    name="quantity"
                                    value={1}
                                  />
                                  <Button type="submit">
                                    いますぐ注文する
                                  </Button>
                                </form>
                              </dd>
                              <dd>
                                <Button
                                  onClick={() =>
                                    addItem({
                                      id: price.id,
                                      name: product.name,
                                      price: price.unit_amount,
                                      currency: price.currency,
                                      image: product.images[0],
                                    })
                                  }
                                >
                                  カートに追加する
                                </Button>
                              </dd>
                            </dl>
                          );
                        })}
                      </Stack>
                    </Col>
                  </Row>
                );
              })}
            </Stack>
          </Col>
          <Col md={4}>
            <CartDetail />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetch("http://localhost:3000/api/products").then(
    (response) => response.json()
  );
  return {
    props: {
      products,
    },
    revalidate: 1 * 60, // 1分
  };
}
