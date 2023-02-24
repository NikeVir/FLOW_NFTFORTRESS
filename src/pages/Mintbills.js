import React from "react";
import "../Styles/Mintbills.css";
import upload_img from "./upload.png";

export default function Mintbills() {
  var loadFile = function (event) {
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0]);
  };

  return (
    <div className="page-container">
      <div className="top-rectanglee">
        <h1>NFT_FORTRESS Minter</h1>
      </div>
      <div className="mint-box">
        <h2>Mint your NFT</h2>
        <div className="mint-form">
          <div className="left-form">
            <p style={{ fontSize: "40px", margin: "11px", fontWeight: "bold" }}>
              Upload
            </p>
            <div className="uploado">
              <div className="upload-box">
                <button>Design on Canva</button>

                <div className="nft-image">
                  <p className="no-margin">
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      id="file"
                      required
                      onChange={(event) => {
                        loadFile(event);
                      }}
                      style={{ display: "none" }}
                    />
                    <div>
                      <label htmlFor="file" style={{ cursor: "pointer" }}>
                        <div className="upload-box">
                          <img
                            id="output"
                            height="200vh"
                            src={upload_img}
                            alt=""
                          />
                        </div>
                      </label>
                    </div>
                  </p>
                </div>
              </div>
            </div>

            <div className="imp">
              <div className="form-input">
                <label htmlFor="productid">Product ID</label>
                <input type="text" id="productid" />
              </div>

              <div className="form-input">
                <label htmlFor="name">Minter Name</label>
                <input type="text" id="name" />
              </div>
            </div>
          </div>
          <div className="right-form">
            <div className="form-input">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" />
            </div>
            <div className="form-input">
              <label htmlFor="description">Description:</label>
              <textarea id="description"></textarea>
            </div>
            <div className="form-input">
              <p>NFT Type:</p>
              <div className="checkbox-box">
                <label>
                  <input type="checkbox" name="nft-type" value="image" /> Image
                </label>
                <label>
                  <input type="checkbox" name="nft-type" value="video" /> Video
                </label>
              </div>
            </div>
            <div className="form-input">
              <p>Warranty Period</p>
              <input type="date" />
            </div>
            <div className="form-input">
              <p>Date</p>
              <input type="date" id="date" />
            </div>
            <div className="form-input" style={{ marginBottom: "2%" }}>
              <label htmlFor="location">Location</label>
              <input type="text" id="location" />
            </div>
            <div className="form-input">
              <label className="terms">
                <input type="checkbox" name="agree" />
              </label>
              <p>I agree to the terms and conditions.</p>
            </div>
          </div>
        </div>
        <div className="concluding-text">
          <p>
            By minting this NFT, you certify that you are the rightful owner of
            the content and have the legal right to mint and sell it as an NFT.
          </p>
        </div>
        <button className="mint-button">Mint</button>
      </div>
    </div>
  );
}
