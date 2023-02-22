import React from 'react'
import '../Styles/Nftcard.css'

export default function Nftcard() {
  return (
    
    <div className="card">
      <div className="card-header">
        <div className="header-left">
          <img src="https://via.placeholder.com/60" alt="" />
        </div>
        <div className="header-right">
          <p className="congrats">Congratulations,</p>
          <p className="text-d">
            Nio-kill for registring with the Jk Tyres. You have successfully
            availed your warranty card.
          </p>
        </div>
      </div>

      <div className="after-header">
        <p className="text-here">Here is your warranty card:</p>
      </div>
      <div className="card-body">
        <div className="details-box">
          <div className="left-details">
            <img src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" alt="qr-code" />
          </div>
          <div className="right-details">
            <div className="warranty-no">
              <p style={{color: 'grey',fontWeight:'bold'}}> Warranty No.</p> <p style={{fontWeight: "bold"}}>123456</p>
            </div>
            <div className="valid-until">
              <p style={{color: 'grey',fontWeight:'bold'}}>You warranty will be applicable till</p> <p style={{fontWeight: "bold"}}>08 june, 2022</p>
            </div>
          </div>
        </div>
        <div className="vehicle-details">
          <p className="headingg">Vehicle Details</p>
          <div className="type-regno">
            <div className="label-value">
              <p className="label">Vehicle Type</p>
              <p className="value">Car</p>
            </div>

            <div className="label-value">
              <p className="label">Reg No.</p>
              <p className="value" >ABC 1234</p>
            </div>

            <div className="label-value">
              <p className="label">Make and Model:</p>
              <p className="value">Honda City</p>
            </div>
          </div>

          <p className="headingg">Tyre Details</p>
          <div className="type-regno">
            <div className="label-value">
              <p className="label">No. of Tyre</p>
              <p className="value">1</p>
            </div>

            <div className="label-value">
              <p className="label">Batch ID</p>
              <p className="value">3219 C</p>
            </div>

            <div className="label-value">
              <p className="label">Tyre Description</p>
              <p className="value">Ultima/Blazze</p>
            </div>
          </div>
          </div>
          <div className="follow"><p>
            Follow Below steps to request your warranty claim.</p></div>
        </div>
        
        <div className="points">
          <ol>

            <li>Go to My Account.</li>
            <li>Tap on Request Claim</li>
            <li>Enter information and Send Claim Request</li>
          </ol>
        </div>
      
      <div className="continue-button">Continue</div>
    </div>
  )
}
