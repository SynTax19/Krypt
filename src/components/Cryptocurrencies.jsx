import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@mui/material/Divider";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // console.log(cryptos);
  //console.log(isFetching);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filterData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return "Loading . . . . . . . .";
  return (
    <>
      {!simplified && (
        <div
          className="search-crypto"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <SearchIcon
            fontSize="large"
            color="primary"
            style={{
              marginTop: "12px",
              marginRight: "5px",
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Search"
            placeholder="Search CryptoCurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row
        gutter={[32, 32]}
        className="crypto-card-container"
        style={{ fontStyle: "-moz-initial", fontWeight: "bold" }}
      >
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                style={{ backgroundColor: "#d6fffe" }}
                title={<b>{`${currency.rank}. ${currency.name}`} </b>}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <Divider
                  variant="middle"
                  style={{ marginTop: "-25px", marginBottom: "15px" }}
                />
                <p>
                  Price: <b>$ {millify(currency.price)}</b>{" "}
                </p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
