import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NftCard from "../common/NftCard";

const ExploreItems = () => {
  const [nftArray, setNftArray] = useState([]);
  const [nftsToShow, setNftsToShow] = useState(8);

  const loadMoreNfts = () => {
    setNftsToShow(nftsToShow + 4);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setNftArray(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {nftArray.slice(0, nftsToShow).map((nft) => (
        <div
          key={nft?.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <NftCard nft={nft} />
        </div>
      ))}
      <div className="col-md-12 text-center">
        {nftsToShow < 16 && (
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMoreNfts}
          >
            Load more
          </Link>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
